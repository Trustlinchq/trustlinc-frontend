"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

interface PhoneVerifyProps {
    onSuccess: () => void;
    onBack?: () => void;
}

export default function PhoneVerify({ onSuccess, onBack }: PhoneVerifyProps) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(60);
    const [pinId, setPinId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        const storedPinId = sessionStorage.getItem("pin_id");
        const storedPhone = sessionStorage.getItem("phone_number");
        if (storedPinId && storedPhone) {
            setPinId(storedPinId);
            setPhoneNumber(storedPhone);
        } else {
            toast.error("Missing verification session. Please start again.");
            if (onBack) {
                onBack();
            }
        }
    }, [onBack]);

    useEffect(() => {
        if (resendCountdown <= 0) return;
        const timer = setInterval(() => {
            setResendCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [resendCountdown]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp.match(/^\d{6}$/)) {
            toast.error("OTP must be a 6-digit number");
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Auth token missing");

            await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/phone/verify",
                { pin_id: pinId, otp },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const meRes = await axios.get(
                "https://trustlinc-backend.onrender.com/api/v1/auth/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedUser = meRes.data.user;
            console.log("User updated:", updatedUser);

            toast.success("Phone number verified successfully!");
            sessionStorage.removeItem("pin_id");
            sessionStorage.removeItem("phone_number");
            onSuccess();
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(
                    err.response?.data?.details ||
                        "Failed to verify phone number"
                );
            } else {
                toast.error("Failed to verify phone number");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Auth token missing");

            const res = await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/phone/initiate",
                { phone_number: phoneNumber },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newPinId = res.data.pin_id;
            sessionStorage.setItem("pin_id", newPinId);
            setPinId(newPinId);
            toast.success("OTP resent successfully");
            setResendCountdown(60);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(
                    err.response?.data?.details ||
                        "Could not resend OTP. Try again later."
                );
            } else {
                toast.error("Could not resend OTP. Try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    function formatPhoneNumber(num: string) {
        if (!num) return "";
        // Removes non-digit characters and adds spacing for readability
        const digitsOnly = num.replace(/\D/g, "");
        return digitsOnly.replace(/^(\d{3})(\d{3})(\d{4})$/, "+$1 $2 $3 $4");
    }

    return (
        <section className="flex flex-col bg-neutral-100 mt-8 py-7 rounded-md">
            <div className="mb-3">
                <h2 className="text-xl text-backgroundSecondary font-bold text-center">
                    Phone Verification
                </h2>
                <p className="text-xs text-accent4 mx-auto mt-2 max-w-[68%] text-center">
                    A code has been sent to{" "}
                    <span className="text-accent3 font-bold">
                        {formatPhoneNumber(phoneNumber)}
                    </span>
                    . Enter it below to complete your phone verification.
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
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pr-10 pl-4 py-5 rounded-md text-sm bg-gray-100 border border-gray-300 mt-3 overflow-hidden max-w-[90%] mx-auto"
                />

                <Button
                    type="submit"
                    disabled={loading || !otp}
                    className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-md mt-5 mb-5 max-w-[90%] mx-auto"
                >
                    {loading ? "Verifying..." : "Verify Phone Number"}
                </Button>

                <p className="text-sm text-accent4 text-center w-full">
                    Didn&apos;t get the code?{" "}
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendCountdown > 0 || loading}
                        className="text-accent3 hover:text-backgroundPrimary font-medium disabled:opacity-50"
                    >
                        {resendCountdown > 0
                            ? `Resend in ${resendCountdown}s`
                            : "Resend Code"}
                    </button>
                </p>
            </form>
        </section>
    );
}
