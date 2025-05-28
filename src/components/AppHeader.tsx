"use client";

import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function AppHeader() {
    const pathname = usePathname();

    const isAuthRoute =
        pathname.startsWith("/register") ||
        pathname.startsWith("/verify-otp") ||
        pathname.startsWith("/email-verified") ||
        pathname.startsWith("/onboarding");

    if (isAuthRoute) return null;

    return <Header />;
}
