"use client";

import apiClient from "@/lib/api";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserAvatar from "./UserAvatar";
import NotificationBell from "./NotificationBell";

type CommunityUpdate = {
    id: string;
    message: string;
    createdAt: string;
};

type User = {
    username: string;
    full_name: string;
    role: "SHIPPER" | "COURIER";
    image?: string | null;
};

export default function TopBar() {
    const pathname = usePathname();
    const [communityUpdate, setCommunityUpdate] =
        useState<CommunityUpdate | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const pageTitle =
        pathname.split("/").pop()?.replace(/-/g, " ") ?? "Dashboard";

    useEffect(() => {
        apiClient
            .get("/shipper/dashboard/community-update")
            .then((res) => setCommunityUpdate(res.data))
            .catch(() => setCommunityUpdate(null));

        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            // Fallback to "SHIPPER" if role is missing
            if (!parsedUser.role) {
                parsedUser.role = "SHIPPER";
            }
            setUser(parsedUser);
        }
    }, []);

    return (
        <div className="w-full px-4 sm:px-14 py-3 flex flex-row items-center justify-between bg-white">
            <div className="mb-2 sm:mb-0">
                <h1 className="text-xl sm:text-2xl font-bold capitalize">
                    {pageTitle}
                </h1>
                <p className="sm:text-sm text-xs text-muted-foreground mt-1">
                    {communityUpdate
                        ? `📢 ${communityUpdate.message}`
                        : "📢 Community update unavailable"}
                </p>
            </div>

            <div className="flex items-center justify-center gap-5">
                <NotificationBell />
                {user && (
                    <div className="flex items-center">
                        <UserAvatar user={user} />
                    </div>
                )}
            </div>
        </div>
    );
}
