"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    ArrowUpRight,
    ArrowDownRight,
    Package,
    CheckCircle,
    Truck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";

type Stat = {
    current: number;
    previous: number;
    percentageChange: string;
    trend: "up" | "down";
};

type StatsResponse = {
    timeframe: string;
    totalDeliveries: Stat;
    delivered: Stat;
    inProgress: Stat;
};

export default function StatsCards() {
    const [stats, setStats] = useState<StatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Mark as mounted on client
    }, []);

    useEffect(() => {
        if (!mounted) return; //Skip until client-side

        const token = localStorage.getItem("token");
        console.log("StatsCards: Retrieved token from localStorage:", token); // Debugging

        if (!token) {
            setError("Please log in to view stats");
            setLoading(false);
            toast.error("No authentication token found. Please log in.");
            return;
        }

        axios
            .get(
                "https://trustlinc-backend.onrender.com/api/v1/shipper/dashboard/stats",

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                setStats(res.data);
                setLoading(false);
                console.log(
                    "StatsCards: Fetched stats successfully:",
                    res.data
                ); // Debugging
            })
            .catch((err) => {
                const status = err.response?.status;
                let errorMsg = "Could not load dashboard stats.";
                if (status === 401) {
                    errorMsg =
                        "Session expired or invalid token. Please log in again.";
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
                setError(errorMsg);
                setLoading(false);
                toast.error(errorMsg);
                console.error(
                    "StatsCards: Fetch error:",
                    err.response?.data || err
                );
            });
    }, [mounted]);

    if (!mounted || loading) {
        return (
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, index) => (
                        <Card key={index} className="rounded-sm shadow-sm">
                            <CardContent className="p-4 flex flex-col gap-8">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                </div>
                                <Skeleton className="h-8 w-16" />
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="text-red-500 text-sm">
                Could not load dashboard stats. Please try again.
            </div>
        );
    }

    const cards = [
        {
            title: "Total Deliveries",
            icon: <Package className="w-5 h-5 text-backgroundPrimary" />,
            data: stats.totalDeliveries,
            description: "Past 1 months total",
        },
        {
            title: "Delivered",
            icon: <CheckCircle className="w-5 h-5 text-accent3" />,
            data: stats.delivered,
            description: "Delivered in past 1 months total",
        },
        {
            title: "In Progress",
            icon: <Truck className="w-5 h-5 text-accent2" />,
            data: stats.inProgress,
            description: "Ongoing deliveries now",
        },
    ];

    const renderTrend = (
        trend: "up" | "down",
        percent: string,
        description: string
    ) => {
        const isUp = trend === "up";
        return (
            <div className="flex items-center gap-3 ">
                <div
                    className={cn(
                        "flex items-center text-sm font-medium",
                        isUp ? "text-green-600" : "text-red-600"
                    )}
                >
                    {isUp ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                    {percent}%
                </div>
                <span className="text-xs text-muted-foreground">
                    {description}
                </span>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cards.map((card) => (
                <Card key={card.title} className="rounded-sm shadow-sm">
                    <CardContent className="p-4 flex flex-col gap-8">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-muted-foreground">
                                {card.title}
                            </span>
                            {card.icon}
                        </div>
                        <div className="text-2xl font-bold">
                            {card.data.current}
                        </div>
                        {renderTrend(
                            card.data.trend,
                            card.data.percentageChange,
                            card.description
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
