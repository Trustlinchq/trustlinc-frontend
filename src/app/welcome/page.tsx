"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";

export default function WelcomePage() {
    const router = useRouter();
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Retrieve user from localStorage
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        // Check if user and role exist
        if (!user || !user.role) {
            toast.error(
                "User data not found. Please log in or complete onboarding."
            );
            router.push("/login");
            return;
        }

        // Start exit animation after initial animation (2s), then redirect
        const animationTimeout = setTimeout(() => {
            setIsExiting(true);
        }, 2000); // Matches initial animation duration

        // Redirect after exit animation (1s)
        const redirectTimeout = setTimeout(() => {
            if (user.role === "COURIER") {
                router.push("/courier/dashboard");
            } else if (user.role === "SHIPPER") {
                router.push("/shipper/dashboard");
            } else {
                toast.error("Invalid user role. Please contact support.");
                router.push("/login");
            }
        }, 3000); // Initial (2s) + exit (1s)

        // Cleanup timeouts on unmount
        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(redirectTimeout);
        };
    }, [router]);

    return (
        <div className="flex h-screen items-center justify-center bg-white">
            <AnimatePresence>
                {!isExiting && (
                    <motion.div
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                            opacity: {
                                duration: isExiting ? 1 : 2,
                                ease: isExiting ? "easeOut" : "easeInOut",
                            },
                            scale: {
                                duration: isExiting ? 1 : 2,
                                ease: isExiting ? "easeOut" : "easeInOut",
                            },
                        }}
                    >
                        <Image
                            src="/logo-icon.svg"
                            alt="TrustLinc Logo"
                            width={100}
                            height={50}
                            className="object-contain"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
