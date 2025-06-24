"use client";

import MobileBottomNav from "./MobileBottomNav";

export default function MobileScreenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col w-full bg-background text-foreground">
            <div className="flex-1 overflow-y-auto p4">{children}</div>
            <MobileBottomNav />
        </div>
    );
}
