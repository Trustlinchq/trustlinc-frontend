"use client";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

export function ResourcesDropdown() {
    return (
        <HoverCard openDelay={100} closeDelay={200}>
            <HoverCardTrigger className="text-[#303E4B] text-sm font-semibold hover:text-[#544ddca8] cursor-pointer">
                Resources
            </HoverCardTrigger>

            <HoverCardContent className="w-[450px] rounded-xl bg-[#F9FAFB] border border-[#303e4b49] shadow-xl p-6 grid grid-cols-2 gap-8 mt-2">
                {/* Column 1: Company */}
                <div className="space-y-4">
                    <h4 className="text-xs text-gray-500 font-medium">
                        Company
                    </h4>
                    <div className="space-y-3">
                        <Link href="/about" className="block group">
                            <p className="text-[#111827] font-semibold text-sm group-hover:text-[#544DDC]">
                                About
                            </p>
                            <p className="text-xs text-gray-500">
                                Meet the team
                            </p>
                        </Link>
                        <Link href="/careers" className="block group">
                            <p className="text-[#111827] font-semibold text-sm group-hover:text-[#544DDC]">
                                Careers
                            </p>
                            <p className="text-xs text-gray-500">
                                We’re hiring
                            </p>
                        </Link>
                    </div>
                </div>

                {/* Column 2: Explore */}
                <div className="space-y-4">
                    <h4 className="text-xs text-gray-500 font-medium">
                        Explore
                    </h4>
                    <div className="space-y-3">
                        <Link href="/docs" className="block group">
                            <p className="text-[#111827] font-semibold text-sm group-hover:text-[#544DDC]">
                                Docs
                            </p>
                            <p className="text-xs text-gray-500">
                                How to use TrustLinc
                            </p>
                        </Link>
                        <Link href="/security" className="block group">
                            <p className="text-[#111827] font-semibold text-sm group-hover:text-[#544DDC]">
                                Security
                            </p>
                            <p className="text-xs text-gray-500">
                                How we ensure secure and reliable deliveries.
                            </p>
                        </Link>
                        <Link href="/newsroom" className="block group">
                            <p className="text-[#111827] font-semibold text-sm group-hover:text-[#544DDC]">
                                Newsroom
                            </p>
                            <p className="text-xs text-gray-500">
                                Latest updates, stories & announcements
                            </p>
                        </Link>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
