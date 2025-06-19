"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mobileNavItems } from "@/lib/mobile-nav-items";

export default function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-backgroundPrimary p-2 pt-4 shadow-md  md:hidden">
            {mobileNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link key={item.name} href={item.href}>
                        <div
                            className={cn(
                                "flex flex-col items-center text-xs text-neutral-400 hover:text-accent1",
                                isActive && "text-primary"
                            )}
                        >
                            <Icon className="h-5 w-5 mb-3 text-neutral-400 hover:text-accent1" />
                            {item.name}
                        </div>
                    </Link>
                );
            })}
        </nav>
    );
}
