"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StatsCards from "@/components/StatsCards";
import MonthlyDeliveriesChart from "@/components/MonthlyDeliveriesChart";
import ShipperDeliveries from "@/components/ShipperDeliveries";

export default function DashboardPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

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
            return;
        }
    }, [router, mounted]);

    return (
        <section className=" flex flex-col gap-5 mt-10">
            {/* Stat cards and delivery chart here */}
            <StatsCards />
            <MonthlyDeliveriesChart />
            <ShipperDeliveries />
        </section>
    );
}
