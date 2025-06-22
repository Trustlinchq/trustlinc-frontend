// utils/session.ts
import { logout } from "@/lib/logout";
import { toast } from "sonner";

export const setupSessionSync = (
    onLogout: () => void,
    onTokenUpdate: () => void
) => {
    window.addEventListener("storage", (event) => {
        if (event.key === "token") {
            if (!event.newValue) {
                // Token was removed (logout or 401 error)
                console.log("Token removed in another tab, logging out...");
                onLogout();
            } else {
                // Token was updated (e.g., refresh or new login)
                console.log("Token updated in another tab, refreshing...");
                onTokenUpdate();
            }
        }
    });
};

export const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
        toast.success("Logged out successfully.");
        window.location.href = "/login";
    } else {
        toast.error("Failed to log out. Please try again.");
    }
};
