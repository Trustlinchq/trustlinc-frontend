"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const RESEND_COOLDOWN_SECONDS = 30;
const TIMER_KEY = "trustlinc-login-resend-expiration";

export default function LoginVerifyClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const otpInputRef = useRef<HTMLInputElement>(null);

    // Init OTP and timer on page load
    useEffect(() => {
        if (!email) {
            router.push("/login");
        } else {
            const savedExpiration = localStorage.getItem(TIMER_KEY);
            const now = Date.now();

            if (savedExpiration && Number(savedExpiration) > now) {
                const remaining = Math.ceil(
                    (Number(savedExpiration) - now) / 1000
                );
                setResendCooldown(remaining);
            } else {
                const expiration = now + RESEND_COOLDOWN_SECONDS * 1000;
                localStorage.setItem(TIMER_KEY, expiration.toString());
                setResendCooldown(RESEND_COOLDOWN_SECONDS);
            }
        }

        otpInputRef.current?.focus();
    }, [email, router]);

    // Count down timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const interval = setInterval(() => {
                setResendCooldown((prev) => {
                    if (prev <= 1) {
                        localStorage.removeItem(TIMER_KEY);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [resendCooldown]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/auth/login",
                { email, otp }
            );

            if (res.status === 200) {
                const { user, token } = res.data;

                if (token && user?.role) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    toast.success("OTP verified successfully! Redirecting...");

                    if (user.role === "COURIER") {
                        router.push("/dashboard/courier");
                    } else if (user.role === "SHIPPER") {
                        router.push("/shipper/dashboard");
                    } else {
                        throw new Error("Invalid user role.");
                    }
                } else {
                    throw new Error("Invalid response from server.");
                }
            }
        } catch (err: unknown) {
            const error =
                err instanceof AxiosError
                    ? err.response?.data?.error ||
                      err.response?.data?.message ||
                      "Could not verify code. Try again later."
                    : err instanceof Error
                    ? err.message
                    : "An unexpected error occurred.";
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendCooldown > 0 || !email) return;

        setLoading(true);
        try {
            const res = await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/auth/requestLoginOtp",
                { email }
            );

            if (res.status === 200) {
                toast.success("OTP resent successfully!");
                const expiration = Date.now() + RESEND_COOLDOWN_SECONDS * 1000;
                localStorage.setItem(TIMER_KEY, expiration.toString());
                setResendCooldown(RESEND_COOLDOWN_SECONDS);
            }
        } catch (err: unknown) {
            const error =
                err instanceof AxiosError
                    ? err.response?.data?.error ||
                      "Could not resend code. Try again later."
                    : "An unexpected error occurred.";
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex flex-col bg-neutral-100 text-center px-4 pt-20 sm:pt-28 overflow-x-hidden">
            <div className="flex-grow flex flex-col items-center w-full mx-auto space-y-3 max-h-full">
                <h2 className="text-2xl sm:text-3xl text-backgroundSecondary font-bold">
                    We&#39;ve just sent you a code
                </h2>

                <p className="text-xs sm:text-sm text-accent4 mx-auto sm:mt-4 sm:max-w-[35%]">
                    Check your inbox — we’ve just sent a verification code to{" "}
                    <span className="font-medium text-accent3">{email}</span>.
                    Enter it below to proceed.
                </p>

                <form
                    onSubmit={handleVerify}
                    className="w-full max-w-md flex flex-col items-center space-y-4"
                >
                    <Input
                        ref={otpInputRef}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="w-full pr-10 pl-4 py-6 rounded-full text-sm bg-gray-100 border border-gray-300 mt-3 overflow-hidden max-w-[90%] mx-auto"
                    />

                    <Button
                        type="submit"
                        className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-full mt-5 mb-5 max-w-[90%] mx-auto"
                        disabled={loading || !otp}
                    >
                        {loading ? "Verifying..." : "Continue"}
                    </Button>

                    <p className="text-sm text-accent4 text-center w-full">
                        Didn&apos;t get the code?{" "}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resendCooldown > 0}
                            className={`${
                                resendCooldown > 0
                                    ? "text-muted cursor-not-allowed"
                                    : "text-accent3 hover:text-backgroundPrimary font-medium"
                            }`}
                        >
                            {resendCooldown > 0
                                ? `Resend in ${resendCooldown}s`
                                : "Resend"}
                        </button>
                    </p>
                </form>
            </div>
        </section>
    );
}
