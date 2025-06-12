"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/logout";
import { toast } from "sonner";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            toast.success("Logged out successfully");
            router.push("/login");
        } else {
            toast.error("Failed to log out. Try again.");
        }
    };

    return (
        <Button
            variant="ghost"
            className="font-bold bg-backgroundPrimary text-neutral1"
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
}
