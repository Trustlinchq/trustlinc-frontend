"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import { navItems } from "@/lib/nav-items";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:fixed md:flex flex-col top-0 left-0 h-screen w-64 bg-backgroundPrimary border-r justify-between px-4 pt-14 pb-5 z-50 ">
            <div className="space-y-20">
                <div className="h-10 px-4">
                    <Image
                        src="/logo-white.svg"
                        alt="TrustLinc Logo"
                        width={150}
                        height={50}
                        className="object-contain"
                    />
                </div>

                <nav className="flex flex-col space-y-12">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link key={item.name} href={item.href}>
                                <Button
                                    variant={isActive ? "default" : "ghost"}
                                    className={cn(
                                        "w-full justify-start text-neutral-300 text-base hover:bg-primary/90 hover:text-accent1",
                                        isActive && "text-accent1"
                                    )}
                                >
                                    <Icon className="mr-5 h-4 w-4" />
                                    {item.name}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto ">
                <LogoutButton />
            </div>
        </aside>
    );
}
