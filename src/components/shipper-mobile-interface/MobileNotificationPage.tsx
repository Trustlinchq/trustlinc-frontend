"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, CheckCheck, AlertTriangle, Info } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";

type Notification = {
    id: string;
    message: string;
    type: "success" | "alert" | "info";
    createdAt: string;
    read: boolean;
};

const typeIcons = {
    success: <CheckCheck className="h-4 w-4 text-green-500" />,
    alert: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    info: <Info className="h-4 w-4 text-blue-500" />,
};

export default function MobileNotificationPage() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(
                "https://trustlinc-backend.onrender.com/api/v1/shipper/dashboard/notifications"
            )
            .then((res) => {
                setNotifications(res.data.data);
            })
            .catch(() => {
                setNotifications([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 pb-4 pt-10 border-b border-gray-50 shadow-sm bg-white sticky top-0 z-10">
                <div className="w-8 flex items-center justify-start">
                    <button
                        onClick={() => router.back()}
                        className="text-accent3 cursor-pointer"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                </div>
                <h1 className="text-xl text-backgroundPrimary font-bold text-center flex-1">
                    Notifications
                </h1>
                <div className="w-8" />{" "}
                {/* balances the left icon width for centering */}
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
                {loading ? (
                    <p className="text-base text-accent4 text-center mt-9">
                        Loading notifications...
                    </p>
                ) : notifications.length === 0 ? (
                    <p className="text-sm text-accent4 text-center mt-9">
                        No notifications for now.
                    </p>
                ) : (
                    notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={cn(
                                "flex items-start gap-3 border-b py-3 text-sm",
                                !notif.read && "bg-gray-50 font-medium"
                            )}
                        >
                            {typeIcons[notif.type] ?? (
                                <Bell className="w-4 h-4 text-gray-400" />
                            )}
                            <div className="flex-1">
                                <p>{notif.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(notif.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
