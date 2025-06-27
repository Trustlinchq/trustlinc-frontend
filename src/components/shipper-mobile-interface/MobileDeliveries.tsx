"use client";

import { useEffect, useState } from "react";
import { Plus, Package, CircleDot } from "lucide-react";
import Link from "next/link";
import apiClient from "@/lib/api";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

type CurrentDelivery = {
    id: string;
    description: string;
    pickup: string;
    dropoff: string;
    status: string;
};

export default function MobileDeliveries() {
    const [currentDelivery, setCurrentDelivery] =
        useState<CurrentDelivery | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch current delivery data
        apiClient
            .get("/shipper/current-delivery")
            .then((res) => {
                setCurrentDelivery(res.data.delivery || null);
            })
            .catch(() => {
                setCurrentDelivery(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const dummyDelivery: CurrentDelivery = {
        id: "DLV-0000",
        description: "Your delivery",
        pickup: "Pickup location",
        dropoff: "Drop-off location",
        status: "In Progress",
    };

    const delivery = currentDelivery || dummyDelivery;
    const isDummy = !currentDelivery;

    if (loading) return null;

    return (
        <div className="px-4 pt-4 pb-2 mt-7">
            {/* Create Delivery Button */}
            <Link href="/shipper/create-delivery">
                <div className="w-full bg-neutral3 py-5 rounded-lg border border-accent5 shadow-none mb-7">
                    <span className="text-backgroundPrimary text-sm flex items-center justify-center gap-2">
                        <Plus className="w-5 h-5 text-accent3" />
                        Create a delivery
                    </span>
                </div>
            </Link>

            {/* Section Tile */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[15px]  text-accent4">
                    Your current delivery
                </h3>
                <Link
                    href="/MyDeliveries"
                    className="text-xs font-bold text-accent3 flex items-center gap-1"
                >
                    View all delivery <span className="text-[20px]">›</span>
                </Link>
            </div>

            {/* Delivery Card */}
            {/* Skeleton while loading */}
            {loading ? (
                <div className="space-y-4 bg-neutral3 p-4 rounded-2xl border border-accent1 shadow-[0px_6px_20px_rgba(0,0,0,0.08)]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-32" />
                                <Skeleton className="h-2 w-24" />
                            </div>
                        </div>
                        <Skeleton className="w-4 h-4" />
                    </div>
                    <Skeleton className="h-px bg-border my-5" />
                    <Skeleton className="h-3 w-3/5 mb-2" />
                    <Skeleton className="h-3 w-2/3 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-px bg-border my-5" />
                    <Skeleton className="h-3 w-24" />
                </div>
            ) : (
                <div className="relative">
                    {/* Actual Card (or dummy fallback) */}
                    <div
                        className={cn(
                            "bg-neutral3 rounded-2xl border border-accent1 shadow-[0px_6px_20px_rgba(0,0,0,0.08)] p-4 transition",
                            isDummy && "opacity-40 blur-sm pointer-events-none"
                        )}
                    >
                        {/* Top: Icon + Title + ID */}
                        <div className="flex items-center justify-between mb-3 pt-2">
                            <div className="flex items-center gap-6">
                                <div className="bg-neutral1 p-2 rounded-full">
                                    <Package className="text-accent3 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm leading-tight text-backgroundSecondary">
                                        {delivery.description}
                                    </p>
                                    <p className="text-[10px] text-accent4/60">
                                        Delivery ID: {delivery.id}
                                    </p>
                                </div>
                            </div>
                            <div className="text-accent3 text-3xl">›</div>
                        </div>

                        <div className="border-t border-border my-7" />

                        {/* Pickup → Dropoff */}
                        <div className="flex flex-col gap-4 mb-4 pl-4">
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 mt-1 bg-accent3 rounded-full" />
                                <p className="text-sm text-accent4/50">
                                    Pickup:
                                    <span className="text-backgroundSecondary font-semibold pl-3">
                                        {delivery.pickup}
                                    </span>
                                </p>
                            </div>

                            <div className="ml-[3px] h-12 border-l border-dashed border-accent5" />

                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 mt-1 border border-accent3 rounded-full" />
                                <p className="text-sm text-accent4/50">
                                    Drop-off:
                                    <span className="text-backgroundSecondary font-semibold pl-3">
                                        {delivery.dropoff}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-border my-7" />

                        {/* Status */}
                        <div className="flex items-center gap-2 text-sm pl-4">
                            <span className="text-accent4/50">Status:</span>
                            <span className="flex items-center gap-1 text-yellow-600 font-medium">
                                <CircleDot className="w-3 h-3 fill-yellow-600 text-yellow-600" />
                                {delivery.status}
                            </span>
                        </div>
                    </div>

                    {/* Dummy Message */}
                    {isDummy && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <p className="text-sm font-medium text-accent4 bg-white/80 px-4 py-2 rounded-md shadow-sm border border-dashed border-accent4">
                                You have no current delivery right now.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
