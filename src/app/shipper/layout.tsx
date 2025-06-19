import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import MobileBottomNav from "@/components/MobileBottomNav";
import TopBar from "@/components/TopBar";
import "@/app/globals.css";

export const metadata: Metadata = {
    title: "TrustLinc | Shipper's Dashboard",
    description:
        "Manage your deliveries with ease on TrustLinc. Create, track, and monitor all your shipment activities in one place.",
};

export default function ShipperLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <MobileBottomNav />

            <div className="flex flex-col flex-1 min-h-screen ml-0 md:ml-64 mt-4">
                <TopBar />
                <main className="flex-1 sm:px-14 p-4">{children}</main>
            </div>
        </div>
    );
}
