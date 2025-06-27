"use client";

import Link from "next/link";
import { Plus, Package, CircleDot } from "lucide-react";
// import { Button } from "@/components/ui/button";

type Delivery = {
    id: string;
    description: string;
    pickup: string;
    dropoff: string;
    status: string;
};

const currentDelivery: Delivery = {
    id: "DLV-0001",
    description: "Phone accessories",
    pickup: "Lagos",
    dropoff: "Enugu",
    status: "In Progress",
};

export default function MobileDeliveries() {
    return (
        <div className="px-4 pt-4 pb-2 mt-7">
            {/* Create Delivery Button */}
            <Link href="/shipper/create-delivery">
                <div className="w-full bg-neutral3 py-5 rounded-lg border border-accent5  mb-7">
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
            <div className="bg-neutral3 rounded-2xl border border-accent1 shadow-[0px_3px_12px_rgba(0,0,0,0.08)] p-4 ">
                {/* Top: Icon + Title + ID */}
                <div className="flex items-center justify-between mb-3 pt-2">
                    <div className="flex items-center gap-6">
                        <div className="bg-neutral1 p-2 rounded-full">
                            <Package className="text-accent3 w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm leading-tight text-backgroundSecondary">
                                {currentDelivery.description}
                            </p>
                            <p className="text-[10px] text-accent4/60">
                                Delivery ID: {currentDelivery.id}
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
                            Pickup:{" "}
                            <span className="text-backgroundSecondary font-semibold pl-3">
                                {currentDelivery.pickup}
                            </span>
                        </p>
                    </div>

                    {/* vertical line */}
                    <div className="ml-[3px] h-12 border-l border-dashed border-accent5" />

                    <div className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-1 border border-accent1 rounded-full" />
                        <p className="text-sm text-accent4/50">
                            Drop-off:{" "}
                            <span className="text-backgroundSecondary font-semibold pl-3">
                                {currentDelivery.dropoff}
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
                        {currentDelivery.status}
                    </span>
                </div>
            </div>
        </div>
    );
}
