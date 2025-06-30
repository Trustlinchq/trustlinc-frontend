// ✅ PhoneVerify.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

interface PhoneVerifyProps {
    phone: string;
    pinId: string;
    onSuccess: () => void;
}

export default function PhoneVerify({
    phone,
    pinId,
    onSuccess,
}: PhoneVerifyProps) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!/^\d{6}$/.test(otp)) {
            toast.error("OTP must be a 6-digit code");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/phone/verify",
                { pin_id: pinId, otp },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            toast.success("Phone number verified successfully!");
            onSuccess();
        } catch (error) {
            const err = error as AxiosError<{ error?: string }>;
            const message =
                err.response?.data?.error ||
                err.message ||
                "Failed to verify phone number.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        try {
            await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/phone/initiate",
                { phone_number: phone },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            toast.success("New OTP sent to your phone");
        } catch (error) {
            const err = error as AxiosError;
            toast.error(err.message || "Failed to resend OTP");
        } finally {
            setResending(false);
        }
    };

    return (
        <section className="flex flex-col bg-neutral-100 mt-24 py-7 rounded-md">
            <div className="mb-3">
                <h2 className="text-xl text-backgroundSecondary font-bold text-center">
                    Phone Verification
                </h2>
                <p className="text-xs text-accent4 mx-auto mt-2 max-w-[58%] text-center">
                    A code has been sent to{" "}
                    <span className="text-accent3 font-bold">{phone}</span>.
                    Enter it below to complete your phone verification.
                </p>
            </div>

            <form
                onSubmit={handleVerify}
                className="max-w-md w-full mx-auto flex flex-col items-center space-y-4"
            >
                <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full pr-10 pl-4 py-5 rounded-md text-sm bg-gray-100 border border-gray-300 mt-3 overflow-hidden max-w-[90%] mx-auto"
                />

                <Button
                    type="submit"
                    className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-md mt-5 mb-5 max-w-[90%] mx-auto"
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Continue"}
                </Button>

                <p className="text-sm text-accent4 text-center w-full">
                    Didn&apos;t get the code?{" "}
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resending}
                        className="text-accent3 hover:text-backgroundPrimary font-medium"
                    >
                        {resending ? "Resending..." : "Resend"}
                    </button>
                </p>
            </form>
        </section>
    );
}
