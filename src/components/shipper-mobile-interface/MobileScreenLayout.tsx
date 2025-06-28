"use client";

import { usePathname } from "next/navigation";
import MobileBottomNav from "./MobileBottomNav";
import MobileTopBar from "./MobileTopBar";
import MobileStatsCarousel from "./MobileStatsCarousel";
import MobileDeliveries from "./MobileDeliveries";
import MobileCustomerSupport from "./MobileCustomerSupport";

export default function MobileScreenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const hideLayout = pathname === "/shipper/notifications";

    return (
        <div className="flex flex-col w-full bg-background text-foreground">
            <div className="flex-1 overflow-y-auto">
                {!hideLayout && <MobileTopBar />}
                {!hideLayout && <MobileStatsCarousel />}
                {!hideLayout && <MobileDeliveries />}
                {!hideLayout && <MobileCustomerSupport />}
                <div className="p4 pb-20">{children}</div>
            </div>
            {!hideLayout && <MobileBottomNav />}
        </div>
    );
}
