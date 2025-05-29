"use client";

import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import MinimalHeader from "@/components/MinimalHeader";

export default function VerifyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-neutral1">
                <MinimalHeader />
                <PageTransitionWrapper>{children}</PageTransitionWrapper>
            </body>
        </html>
    );
}
