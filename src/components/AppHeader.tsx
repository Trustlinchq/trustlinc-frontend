"use client";

import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function AppHeader() {
    const pathname = usePathname();

    const isAuthRoute =
        pathname.startsWith("/register") ||
        pathname.startsWith("/verify") ||
        pathname.startsWith("/verified") ||
        pathname.startsWith("/onboarding") ||
        pathname.startsWith("/restart-onboarding") ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/login-otp") ||
        pathname.startsWith("/welcome") ||
        pathname.startsWith("/dashboard");

    if (isAuthRoute) return null;

    return <Header />;
}
