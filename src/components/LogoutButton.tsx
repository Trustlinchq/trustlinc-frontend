"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/logout";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

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
            className="bg-backgroundPrimary text-neutral-300 text-base hover:text-red-400 w-full justify-start shadow-none"
            onClick={handleLogout}
        >
            <LogOut className="mr-4" />
            Logout
        </Button>
    );
}
