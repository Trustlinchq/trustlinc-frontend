"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function OnboardingPhase1() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState<"SHIPPER" | "COURIER" | "">("");
    const [loading, setLoading] = useState(false);
    const [onboardingToken, setOnboardingToken] = useState<string | null>(null);

    const handleRestartOnboarding = useCallback(async () => {
        try {
            const email = localStorage.getItem("email");
            if (!email) throw new Error("Missing email for restart");

            await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/auth/restart-onboarding",
                { email }
            );

            toast.success("Restarted. Check your email for a new OTP.");
            router.push("/verify");
        } catch (error: unknown) {
            const err = error as AxiosError<{ error?: string }>;
            const message =
                err.response?.data?.error || err.message || "Unknown error";
            toast.error("Restart failed: " + message);
        }
    }, [router]);

    useEffect(() => {
        const token = localStorage.getItem("onboarding_token");
        if (!token) {
            toast.error("No onboarding token found. Restarting onboarding...");
            handleRestartOnboarding();
        } else {
            setOnboardingToken(token);
        }
    }, [handleRestartOnboarding]);

    const handleSubmit = async () => {
        if (!role || !fullName) {
            toast.error("Please enter your full name and select a role");
            return;
        }

        if (!onboardingToken) {
            toast.error("Missing onboarding token. Restarting onboarding...");
            handleRestartOnboarding();
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/auth/onboard/phase1",
                {
                    onboarding_token: onboardingToken,
                    role,
                    full_name: fullName,
                }
            );

            toast.success("Successfully submitted onboarding phase 1");
            localStorage.setItem("onboarding_token", res.data.onboarding_token);
            router.push("/onboarding/phase-2");
        } catch (error: unknown) {
            const err = error as AxiosError<{ message?: string }>;
            const message =
                err.response?.data?.message ||
                err.message ||
                "An error occurred";

            if (message === "Invalid or expired onboarding token") {
                toast.error("Token expired. Refreshing...");
                await refreshTokenAndRetry();
            } else {
                toast.error("Error: " + message);
            }
        } finally {
            setLoading(false);
        }
    };

    const refreshTokenAndRetry = async () => {
        try {
            const email = localStorage.getItem("email");
            if (!email) throw new Error("Missing email for token refresh");

            const res = await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/auth/refresh-onboarding-token",
                { email }
            );

            localStorage.setItem("onboarding_token", res.data.onboarding_token);
            setOnboardingToken(res.data.onboarding_token);
            toast.success("Token refreshed. Please try again.");
        } catch (error: unknown) {
            const err = error as AxiosError<{ error?: string }>;
            const message =
                err.response?.data?.error || err.message || "Unknown error";
            toast.error("Refresh failed: " + message);
            handleRestartOnboarding();
        }
    };

    return (
        <section className="min-h-screen flex flex-col bg-white px-4 pt-24 sm:pt-40 overflow-x-hidden">
            <div className="mx-auto max-w-md mb-3">
                <h2 className="text-3xl sm:text-4xl text-backgroundSecondary font-bold text-center max-w-[80%] sm:max-w-[70%] mx-auto mb-11">
                    Join The <span className="text-accent3">TrustLinc</span>{" "}
                    Community
                </h2>

                <div>
                    <p className="text-sm text-accent4 font-normal">
                        How do you want to be part of TrustLinc?
                    </p>
                </div>
            </div>

            <div className="flex-grow flex flex-col w-full space-y-4 max-h-full max-w-md mx-auto">
                <Label
                    className={`flex justify-between items-center rounded-lg border p-4 cursor-pointer ${
                        role === "SHIPPER"
                            ? "bg-neutral1 dark:border-b-gray-500 dark:bg-blue-950"
                            : ""
                    }`}
                >
                    <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-semibold text-backgroundPrimary">
                            Shipper
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Connect your package to a trusted traveler.
                        </p>
                    </div>

                    <Checkbox
                        checked={role === "SHIPPER"}
                        onCheckedChange={() =>
                            setRole((prev) =>
                                prev === "SHIPPER" ? "" : "SHIPPER"
                            )
                        }
                        className=" data-[state=checked]:border-blue-600 data-[state=checked]:bg-accent3 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                </Label>

                <Label
                    className={`flex justify-between items-center rounded-lg border p-4 cursor-pointer ${
                        role === "COURIER"
                            ? " bg-blue-50 dark:border-b-gray-500 dark:bg-blue-950"
                            : ""
                    }`}
                >
                    <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-semibold">
                            Courier
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Help people get their packages safely.
                        </p>
                    </div>

                    <Checkbox
                        checked={role === "COURIER"}
                        onCheckedChange={() =>
                            setRole((prev) =>
                                prev === "COURIER" ? "" : "COURIER"
                            )
                        }
                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-accent3 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                </Label>

                <div>
                    <Input
                        id="full_name"
                        placeholder="Enter your name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pr-10 pl-4 py-6 text-sm border border-gray-300 mt-1 overflow-hidden rounded-lg mx-auto"
                    />
                </div>

                <Button
                    className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-full mx-auto"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Continue"}
                </Button>
            </div>
        </section>
    );
}
