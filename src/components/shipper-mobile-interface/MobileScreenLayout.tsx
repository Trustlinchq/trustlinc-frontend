"use client";

import { usePathname } from "next/navigation";
import MobileBottomNav from "./MobileBottomNav";
import MobileTopBar from "./MobileTopBar";
import MobileStatsCarousel from "./MobileStatsCarousel";

export default function MobileScreenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const hideLayout = pathname === "/shipper/notifications";

    return (
        <div className="flex flex-col w-full bg-background text-foreground">
            {!hideLayout && <MobileTopBar />}
            <MobileStatsCarousel />
            <div className="flex-1 overflow-y-auto p4">{children}</div>
            {!hideLayout && <MobileBottomNav />}
        </div>
    );
}
