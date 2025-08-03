"use client";

import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import MinimalHeader from "@/components/MinimalHeader";

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <MinimalHeader />
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </>
    );
}
