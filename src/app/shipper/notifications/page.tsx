"use client";

import dynamic from "next/dynamic";

// Dynamically import to avoid hydration mismatch
const MobileNotificationPage = dynamic(
    () =>
        import("@/components/shipper-mobile-interface/MobileNotificationPage"),
    { ssr: false }
);

export default function Page() {
    return <MobileNotificationPage />;
}
