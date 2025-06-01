"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RestartOnboardingPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRestart = async () => {
        setLoading(true);
        try {
            const res = await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/auth/restart-onboarding",
                {
                    email,
                }
            );

            toast.success(res.data.message);
            router.push("/verify");
        } catch (err) {
            const error = err as AxiosError<{ error?: string }>;
            const message =
                error.response?.data?.error || "Something went wrong";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen  flex flex-col bg-neutral-100 text-center px-4 pt-20 sm:pt-44 overflow-x-hidden">
            <div className="mx-auto w-full max-w-md">
                <h2 className="text-3xl sm:text-4xl text-backgroundSecondary font-bold text-center mx-auto mb-4">
                    Restart Onboarding
                </h2>
                <p className="text-xs sm:text-sm text-accent4 mx-auto sm:mt-4 mb-4">
                    Enter your email to request a new verification OTP.
                </p>
                <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full pr-10 pl-4 py-6 text-xs border border-gray-300 mt-1 overflow-hidden rounded-lg mx-auto mb-4"
                />
                <Button
                    className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-lg mx-auto"
                    onClick={handleRestart}
                    disabled={loading || !email}
                >
                    {loading ? "Requesting..." : "Continue"}
                </Button>
            </div>
        </section>
    );
}
