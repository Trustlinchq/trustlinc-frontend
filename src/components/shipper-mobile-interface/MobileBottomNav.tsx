"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mobileNavItems } from "@/lib/mobile-nav-items";
import { useEffect, useState } from "react";
import UserAvatar from "../UserAvatar";

type User = {
    username: string;
    full_name: string;
    role: "SHIPPER" | "COURIER";
    image?: string | null;
};

export default function MobileBottomNav() {
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            if (!parsedUser.role) parsedUser.role = "shipper";
            setUser(parsedUser);
        }
    }, []);

    const isProfile = pathname === "/profile";

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-neutral2 p-2 py-5 shadow-md md:hidden">
            {mobileNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link key={item.name} href={item.href}>
                        <div
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 text-xs text-neutral-400",
                                isActive && "font-bold text-backgroundPrimary"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "h-6 w-6",
                                    isActive
                                        ? "text-backgroundPrimary fill-backgroundPrimary"
                                        : "text-neutral-400"
                                )}
                            />
                            <span>{item.name}</span>
                        </div>
                    </Link>
                );
            })}

            <Link href="/profile">
                <div
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 text-xs text-neutral-400",
                        isProfile && "font-bold text-backgroundPrimary"
                    )}
                >
                    {user ? (
                        <UserAvatar
                            user={user}
                            className={cn(
                                "h-6 w-6 border-2 border-white rounded-full",
                                isProfile && "ring-2 ring-backgroundPrimary"
                            )}
                        />
                    ) : (
                        <div className="h-6 w-6 rounded-full bg-muted border-2 border-white" />
                    )}
                    <span>Me</span>
                </div>
            </Link>
        </nav>
    );
}
