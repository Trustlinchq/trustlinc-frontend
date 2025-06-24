// app/(dashboard)/shipper/layout.tsx
import type { Metadata } from "next";
import ShipperLayoutClient from "./dashboard/ShipperLayoutClient";

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
    return <ShipperLayoutClient>{children}</ShipperLayoutClient>;
}
