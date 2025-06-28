"use client";

import { MessageSquareText } from "lucide-react";
import Link from "next/link";

export default function MobileCustomerSupport() {
    return (
        <div className="px-4 pt-4 pb-2 mt-7">
            {/* Section Tile */}
            <div>
                <h3 className="text-[15px]  text-accent4">Community Support</h3>
            </div>

            <div className="border-t border-border my-4" />
            <Link href="/shipper/support">
                <div className="flex items-center justify-between mb-3 pt-2">
                    <div className="flex items-center gap-4">
                        <div className="bg-neutral1 p-2 rounded-full">
                            <MessageSquareText className="text-accent3 w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm leading-tight text-backgroundSecondary/80">
                                Talk to us
                            </p>
                            <p className="text-[10px] text-accent4/60 max-w-[85%]">
                                Chat with someone from the TrustLinc community
                                team,we’re happy to help.
                            </p>
                        </div>
                    </div>
                    <div className="text-accent3 text-3xl">›</div>
                </div>
            </Link>

            <Link href="https://www.youtube.com/@TrustLinc">
                <div className="flex items-center justify-between mb-3 pt-2">
                    <div className="flex items-center gap-4">
                        <div className="bg-neutral1 p-2 rounded-full">
                            <MessageSquareText className="text-accent3 w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm leading-tight text-backgroundSecondary/80">
                                Start Your Journey
                            </p>
                            <p className="text-[10px] text-accent4/60 max-w-[85%]">
                                Watch short videos to see how TrustLinc makes
                                sending and delivering easy.
                            </p>
                        </div>
                    </div>
                    <div className="text-accent3 text-3xl">›</div>
                </div>
            </Link>
        </div>
    );
}
