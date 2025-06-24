"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import MobileScreenLayout from "@/components/shipper-mobile-interface/MobileScreenLayout";

export default function ShipperLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = useMediaQuery("(max-width: 768px)");

    if (isMobile) {
        return <MobileScreenLayout>{children}</MobileScreenLayout>;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 min-h-screen ml-0 md:ml-64 mt-4">
                <TopBar />
                <main className="flex-1 sm:px-14 p-4">{children}</main>
            </div>
        </div>
    );
}
