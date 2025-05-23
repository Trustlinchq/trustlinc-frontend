"use client";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

export function ProductDropdown() {
    return (
        <HoverCard openDelay={100} closeDelay={200}>
            <HoverCardTrigger className="text-[#303E4B] text-sm font-bold hover:text-[#544ddca8] cursor-pointer">
                Product
            </HoverCardTrigger>
            <HoverCardContent className="w-64 rounded-xl bg-[#F9FAFB] border border-[#303e4b49] shadow-lg p-6 space-y-4  mt-2">
                <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-4">
                        Core Features
                    </h4>
                    <div className="space-y-4">
                        <Link href="/shippers" className="block">
                            <p className="text-backgroundPrimary font-bold text-sm hover:text-[#544DDC]">
                                Shippers
                            </p>
                            <p className="text-xs text-gray-500 md:max-w-[80%]">
                                Send packages securely with trusted travelers.
                            </p>
                        </Link>
                        <Link href="/couriers" className="block">
                            <p className="text-backgroundPrimary font-bold text-sm hover:text-[#544DDC]">
                                Couriers
                            </p>
                            <p className="text-xs text-gray-500 md:max-w-[80%]">
                                Earn by delivering packages on your route.
                            </p>
                        </Link>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
