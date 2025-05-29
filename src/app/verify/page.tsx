"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";

export default function VerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!email) {
            router.push("/register");
        }
    }, [email, router]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/auth/verify-otp",
                { email, otp }
            );

            if (res.status === 200) {
                setMessage("OTP verified successfully!");
                // You can now redirect to dashboard or login
                // router.push("/dashboard");
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setError(
                    err.response?.data?.error ||
                        err.response?.data?.message ||
                        "Could not verify code. Try again later."
                );
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/auth/request-verification-otp",
                { email }
            );
            if (res.status === 200) {
                setMessage("OTP resent successfully!");
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setError(
                    err.response?.data?.error ||
                        "Could not resend code. Try again later."
                );
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex flex-col bg-white justify-center items-center text-center px-4">
            <div className="flex-grow flex flex-col items-center justify-center w-full mx-auto space-y-4 max-h-full overflow-hidden">
                <h2 className="text-3xl sm:text-4xl text-backgroundSecondary font-bold">
                    We Just Sent You A Code
                </h2>

                <p className="text-xs sm:text-sm text-accent4 mx-auto mt-2 sm:mt-4  sm:max-w-[35%]">
                    Check your inbox! We just sent a verification code to{" "}
                    <span className="font-medium text-accent3">{email}</span> —
                    enter it below to proceed.
                </p>

                <form
                    onSubmit={handleVerify}
                    className="w-full max-w-md flex flex-col items-center space-y-4"
                >
                    <Input
                        type="text"
                        placeholder="Code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="w-full pr-10 pl-4 py-6 rounded-full text-sm bg-gray-100 border border-gray-300 mt-3 overflow-hidden max-w-[90%] mx-auto"
                    />

                    <Button
                        type="submit"
                        className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-full mt-5 mb-5 max-w-[90%] mx-auto"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Continue"}
                    </Button>

                    {error && (
                        <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-full px-4 py-2 text-center max-w-[90%] mx-auto">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-4 py-2">
                            {message}
                        </p>
                    )}

                    <p className="text-sm text-accent4 text-center w-full">
                        Didn&apos;t get the code?{" "}
                        <button
                            type="button"
                            onClick={handleResend}
                            className="text-accent3 hover:text-backgroundPrimary font-medium"
                        >
                            Resend
                        </button>
                    </p>
                </form>
            </div>
        </section>
    );
}
