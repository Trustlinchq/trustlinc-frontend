"use client";

import MobileBottomNav from "./MobileBottomNav";
import MobileTopBar from "./MobileTopBar";

export default function MobileScreenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col w-full bg-background text-foreground">
            <MobileTopBar />
            <div className="flex-1 overflow-y-auto p4">{children}</div>
            <MobileBottomNav />
        </div>
    );
}
