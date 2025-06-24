"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { toast } from "sonner";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { setupSessionSync, handleLogout } from "@/lib/session";
import apiClient from "@/lib/api";

type MonthlyDelivery = {
    month: string;
    year: number;
    delivered: number;
    inProgress: number;
};

const chartConfig = {
    delivered: {
        label: "Delivered",
        color: "#544DDC",
    },
    inProgress: {
        label: "In Progress",
        color: "#71D0FF",
    },
} satisfies ChartConfig;

const getCurrentYearEmptyData = (): MonthlyDelivery[] => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const currentMonthIndex = new Date().getMonth();
    return months.slice(0, currentMonthIndex + 1).map((month) => ({
        month,
        year: new Date().getFullYear(),
        delivered: 0,
        inProgress: 0,
    }));
};

export default function MonthlyDeliveriesChart() {
    const [monthlyDeliveries, setMonthlyDeliveries] = useState<
        MonthlyDelivery[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;

        setupSessionSync(
            () => {
                // Handle logout in other tabs
                toast.error("Logged out in another tabs");
                handleLogout();
            },
            () => {
                // Handle token update (refresh)
                apiClient
                    .get("/shipper/dashboard/monthly-deliveries")
                    .then((res) => {
                        const data = res.data || [];
                        const isEmpty = data.every(
                            (d: MonthlyDelivery) =>
                                d.delivered === 0 && d.inProgress === 0
                        );
                        setMonthlyDeliveries(
                            isEmpty ? getCurrentYearEmptyData() : data
                        );
                    })
                    .catch(() => {
                        setMonthlyDeliveries(getCurrentYearEmptyData());
                    });
            }
        );

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.role !== "SHIPPER") {
            setError("Access denied. Shipper role required.");
            setLoading(false);
            toast.error("Access denied. Shipper role required.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in to view monthly deliveries.");
            setLoading(false);
            toast.error("No authentication token found. Please log in.");
            return;
        }

        apiClient
            .get("/shipper/dashboard/monthly-deliveries") // Use apiClient
            .then((res) => {
                const data = res.data || [];
                const isEmpty = data.every(
                    (d: MonthlyDelivery) =>
                        d.delivered === 0 && d.inProgress === 0
                );
                setMonthlyDeliveries(
                    isEmpty ? getCurrentYearEmptyData() : data
                );
                setLoading(false);
            })
            .catch(() => {
                // Errors handled by apiClient interceptor
                setMonthlyDeliveries(getCurrentYearEmptyData());
                setLoading(false);
            });
    }, [mounted]);

    if (!mounted || loading) {
        return (
            <div className="bg-white p-4 rounded-lg shadow mb-8">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 md:px-8 py-4 rounded-sm shadow-sm border mb-1.3">
            <h2 className="text-base font-bold text-backgroundSecondary mb-4">
                Monthly Deliveries
            </h2>

            <div className="w-full">
                <ChartContainer
                    config={chartConfig}
                    className="h-[250px] sm:h-[300px] md:h-[350px] w-full"
                >
                    <BarChart data={monthlyDeliveries}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis hide />
                        <Tooltip />
                        <Bar
                            dataKey="delivered"
                            fill="var(--color-delivered)"
                            radius={4}
                        />
                        <Bar
                            dataKey="inProgress"
                            fill="var(--color-inProgress)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </div>

            {error && <p className="text-sm text-red-500 text-center mt-4"></p>}

            {monthlyDeliveries.every(
                (d) => d.delivered === 0 && d.inProgress === 0
            ) && (
                <p className="text-center text-xs sm:text-sm max-w-[95%] mx-auto text-muted-foreground mt-4">
                    You don&#39;t have any delivery data yet. Start sending
                    packages to see your stats here.
                </p>
            )}
        </div>
    );
}
