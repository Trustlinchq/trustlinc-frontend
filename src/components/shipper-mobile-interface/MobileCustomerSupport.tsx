"use client";

import { MessageSquareText, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MobileCustomerSupport() {
    return (
        <div className="px-4 pt-4 pb-2 mt-7">
            {/* Section Tile */}
            <div>
                <h3 className="text-[15px] text-accent4">Community Support</h3>
            </div>

            <div className="border-t border-border my-4" />

            {/* Support Links */}
            <div className="flex flex-col gap-3">
                <Link
                    href="https://api.whatsapp.com/send/?phone=2348061463767&text=Hi%20TrustLinc%20Support%2C%20I%20need%20some%20help%20and%20I%E2%80%99m%20reaching%20out%20from%20your%20page.&type=phone_number&app_absent=0
"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="flex items-center justify-between mb-3 pt-2">
                        <div className="flex items-center gap-4">
                            <div className="bg-neutral1 p-2 rounded-full">
                                <MessageSquareText className="text-accent3 w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm leading-tight text-backgroundSecondary/80">
                                    Talk to us
                                </p>
                                <p className="text-xs text-accent4/55 max-w-[85%]">
                                    Chat with someone from the TrustLinc
                                    community team,we’re happy to help.
                                </p>
                            </div>
                        </div>
                        <div className="text-accent3 text-3xl">›</div>
                    </div>
                </Link>

                <Link
                    href="https://www.youtube.com/@TrustLinc"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="flex items-center justify-between mb-3 pt-2">
                        <div className="flex items-center gap-4">
                            <div className="bg-neutral1 p-2 rounded-full">
                                <Play className="text-accent3 w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm leading-tight text-backgroundSecondary/80">
                                    Start Your Journey
                                </p>
                                <p className="text-xs text-accent4/55 max-w-[85%]">
                                    Watch short videos to see how TrustLinc
                                    makes sending and delivering easy.
                                </p>
                            </div>
                        </div>
                        <div className="text-accent3 text-3xl">›</div>
                    </div>
                </Link>
            </div>

            <div className="border-t border-border my-4" />

            <div className="mx-auto flex justify-center items-center mt-10 px-8">
                <Image
                    src="/logo-white1.svg"
                    alt="TrustLinc Logo"
                    width={100}
                    height={50}
                    className="w-full max-w-[140px] sm:max-w-[160px]"
                />
            </div>
        </div>
    );
}
