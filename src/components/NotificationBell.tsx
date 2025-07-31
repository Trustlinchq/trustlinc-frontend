import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck, AlertTriangle, Info } from "lucide-react";
import axios from "axios";
import apiClient from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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

export default function NotificationBell() {
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = () => {
        apiClient
            .get("/shipper/dashboard/notifications")
            .then((res) => {
                setNotifications(res.data.data);
                const unread = res.data.data.filter(
                    (n: Notification) => !n.read
                ).length;
                setUnreadCount(unread);
            })
            .catch(() => {
                setNotifications([]);
                setUnreadCount(0);
            });
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClick = () => {
        if (isMobile) {
            router.push("/shipper/notifications");
        } else {
            setIsOpen((prev) => !prev);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await axios.patch(
                "https://trustlinc-backend.onrender.com/api/v1/shipper/dashboard/notifications/mark-all-read"
            );
            toast.success("All notifications marked as read");
            fetchNotifications();
        } catch {
            toast.error("Failed to mark notifications as read");
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                onClick={handleClick}
                className="cursor-pointer  sm:bg-accent3 p-2 rounded-full relative"
            >
                <Bell className="w-6 h-6  text-backgroundPrimary fill-backgroundPrimary sm:text-neutral2 sm:fill-none" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                        {unreadCount}
                    </span>
                )}
            </div>

            {!isMobile && isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="flex justify-between items-center p-3 border-b font-semibold text-sm text-gray-700">
                        <span>Notifications</span>
                        {notifications.length > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-sm text-gray-500 text-center">
                                No notifications for now.
                            </div>
                        ) : (
                            notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={cn(
                                        "px-4 py-2 text-sm border-b flex items-start gap-2",
                                        !notif.read && "bg-gray-50 font-medium"
                                    )}
                                >
                                    {typeIcons[notif.type] ?? (
                                        <Info className="w-4 h-4 text-gray-400" />
                                    )}
                                    <div className="flex-1">
                                        <div>{notif.message}</div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {new Date(
                                                notif.createdAt
                                            ).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
