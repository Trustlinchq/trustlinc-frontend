"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";

export default function MobileDeliveries() {
    return (
        <div className="px-4 pt-4 pb-2 mt-9">
            {/* Create Delivery Button */}
            <Link href="/shipper/create-delivery">
                <div className="w-full bg-neutral3 py-4 rounded-lg border border-accent5  mb-10">
                    <span className="text-backgroundPrimary text-sm flex items-center justify-center gap-2">
                        <Plus className="w-5 h-5 text-accent3" />
                        Create a delivery
                    </span>
                </div>
            </Link>

            {/* Section Tile */}
            <div className="flex justify-between items-center mb2">
                <h3 className="text-sm font-bold text-accent4">
                    Your current delivery
                </h3>
                <Link
                    href="/MyDeliveries"
                    className="text-xs font-medium text-accent3 flex items-center gap-1"
                >
                    View all delivery <span className="text-[18px]">›</span>
                </Link>
            </div>
        </div>
    );
}
