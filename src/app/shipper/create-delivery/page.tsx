"use client";

import { useEffect, useState } from "react";
import VerifyOverlay from "@/components/create-delivery/VerifyOverlay";
import CreatePackageStepper from "@/components/create-delivery/CreatePackageStepper";
import axios from "axios";

export default function DeliveriesPage() {
    const [showVerifyOverlay, setShowVerifyOverlay] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkVerification = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setShowVerifyOverlay(true); // or redirect to login
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    "https://trustlinc-backend.onrender.com/api/v1/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (res.data?.user?.phone_verified) {
                    setIsVerified(true);
                } else {
                    setShowVerifyOverlay(true);
                }
            } catch (err) {
                console.error("Failed to check verification status", err);
                setShowVerifyOverlay(true);
            } finally {
                setLoading(false);
            }
        };

        checkVerification();
    }, []);

    if (loading)
        return (
            <div className="mt-20 text-center text-sm text-accent4 ">
                Checking verification...
            </div>
        );

    return (
        <>
            {showVerifyOverlay && (
                <VerifyOverlay
                    onComplete={() => {
                        setIsVerified(true);
                        setShowVerifyOverlay(false);
                    }}
                    onClose={() => {
                        window.location.href = "/shipper/dashboard";
                    }}
                />
            )}

            {isVerified && <CreatePackageStepper />}
        </>
    );
}
