"use client";

import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import MinimalHeader from "@/components/MinimalHeader";
import { Toaster } from "sonner";

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-neutral1">
                <MinimalHeader />
                <PageTransitionWrapper>
                    {children}
                    <Toaster richColors />
                </PageTransitionWrapper>
            </body>
        </html>
    );
}
