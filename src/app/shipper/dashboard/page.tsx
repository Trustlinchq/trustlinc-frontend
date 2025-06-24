"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StatsCards from "@/components/StatsCards";
import MonthlyDeliveriesChart from "@/components/MonthlyDeliveriesChart";
import ShipperDeliveries from "@/components/ShipperDeliveries";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function DashboardPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        let user;
        try {
            const userData = localStorage.getItem("user");
            console.log("ShipperDashboard: Retrieved user:", userData);
            user = userData ? JSON.parse(userData) : {};
        } catch (err) {
            console.error("ShipperDashboard: Failed to parse user:", err);
            toast.error("Invalid session data. Please log in again.");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            router.push("/login");
            return;
        }

        if (!user || user.role !== "SHIPPER") {
            toast.error("Access denied. Please log in as a Shipper.");
            router.push("/login");
        }
    }, [router, mounted]);

    if (!mounted) return null; // Prevent hydration issues

    return (
        <section className=" flex flex-col gap-5 mt-10">
            {!isMobile && (
                <>
                    <StatsCards />
                    <MonthlyDeliveriesChart />
                    <ShipperDeliveries />
                </>
            )}
        </section>
    );
}
