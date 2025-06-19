"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { toast } from "sonner";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

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

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in to view monthly deliveries.");
            setLoading(false);
            toast.error("No authentication token found. Please log in.");
            return;
        }

        axios
            .get(
                "https://trustlinc-backend.onrender.com/api/v1/shipper/dashboard/monthly-deliveries",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
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
            .catch((err) => {
                const status = err.response?.status;
                let errorMsg = "Could not load monthly deliveries.";
                if (status === 401) {
                    errorMsg = "Session expired. Please log in again.";
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                } else if (status === 403) {
                    errorMsg = "Access denied. Shipper role required.";
                } else {
                    errorMsg =
                        err.response?.data?.error ||
                        err.response?.data?.details ||
                        errorMsg;
                }
                setMonthlyDeliveries(getCurrentYearEmptyData());
                setError(errorMsg);
                setLoading(false);
                toast.error(errorMsg);
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
        <div className="p-4 rounded-sm shadow-sm border mb-1">
            <h2 className="text-base font-bold text-backgroundSecondary mb-4">
                Monthly Deliveries
            </h2>

            <ChartContainer
                config={chartConfig}
                className="min-h-[300px] h-[100px] w-full"
            >
                <BarChart data={monthlyDeliveries}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
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

            {error && <p className="text-sm text-red-500 text-center mt-4"></p>}

            {monthlyDeliveries.every(
                (d) => d.delivered === 0 && d.inProgress === 0
            ) && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                    You don&#39;t have any delivery data yet. Start sending
                    packages to see your stats here.
                </p>
            )}
        </div>
    );
}
