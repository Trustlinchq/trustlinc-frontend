"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NotificationBell from "../NotificationBell";

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

function getGreeting() {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
}

export default function MobileTopBar() {
    const [user, setUser] = useState<User | null>(null);
    const [communityUpdate, setCommunityUpdate] =
        useState<CommunityUpdate | null>(null);

    useEffect(() => {
        axios
            .get(
                "https://trustlinc-backend.onrender.com/api/v1/shipper/dashboard/community-update"
            )
            .then((res) => setCommunityUpdate(res.data))
            .catch(() => setCommunityUpdate(null));

        // Get user from localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            if (!parsedUser.role) {
                parsedUser.role = "SHIPPER";
            }
            setUser(parsedUser);
        }
    }, []);

    return (
        <div className="w-full px-4 py-10 flex flex-col gap-6 bg-white md:hidden">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-base font-bold text-accent3">
                        Hello, {user?.username || "there"}!
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {getGreeting()}
                    </span>
                </div>
                <NotificationBell />
            </div>

            <div className="text-center text-sm text-muted-foreground bg-neutral3 border py-2 rounded-xl border-accent2">
                {communityUpdate ? (
                    <p>📢 {communityUpdate.message}</p>
                ) : (
                    <p>📢 No community updates yet — check back soon.</p>
                )}
            </div>
        </div>
    );
}
