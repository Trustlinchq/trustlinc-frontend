"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function MinimalHeader() {
    return (
        <header className=" py-4 bg-neutral2">
            <div className="max-w-5xl mx-auto">
                <nav className="px-6 flex items-center justify-between gap-4">
                    {/* Left: Logo */}
                    <Link href="/">
                        <div className="h-10 w-[120px] flex items-center">
                            <Image
                                src="/logo.svg"
                                alt="TrustLinc Logo"
                                width={100}
                                height={50}
                                className="object-contain cursor-pointer"
                            />
                        </div>
                    </Link>

                    {/* Right: Contact Us */}
                    <div>
                        <Button
                            asChild
                            size="sm"
                            className="bg-[#544DDC] hover:bg-[#001028]/90  px-5 h-9"
                        >
                            <Link
                                href="/contact"
                                className="text-white text-sm"
                            >
                                Contact
                            </Link>
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
