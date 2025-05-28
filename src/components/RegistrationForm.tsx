"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios, { AxiosError } from "axios";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/auth/register",
                { email }
            );
            if (response.status === 200 || response.status === 201) {
                // Registration successful, redirect to OTP verification page
                router.push("/verify-otp?email=" + encodeURIComponent(email));
            }
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            setError(
                error.response?.data?.message ||
                    "An error occurred. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="h-screen flex flex-col bg-neutral2 px-4 overflow-hidden
"
        >
            {/* Main Content Area */}
            <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-4 max-h-full overflow-hidden">
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col items-center space-y-6"
                >
                    <div className="text-center w-full">
                        <h2 className="text-2xl sm:text-4xl text-backgroundSecondary font-bold">
                            Welcome to{" "}
                            <span className="text-accent3">TrustLinc</span>
                        </h2>

                        <p className="text-xs sm:text-sm text-accent4 mx-auto mt-2 sm:mt-4 max-w-[80%]">
                            Thanks for choosing TrustLinc! Enter your email to
                            start your journey with fast, secure deliveries.
                        </p>

                        <div className="w-full relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pr-10 pl-4 py-6 rounded-full text-sm bg-gray-100 border border-gray-300 mt-6"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-full mt-5 mb-6"
                            disabled={loading}
                        >
                            {loading ? "Sending OTP..." : "Continue"}
                        </Button>
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <p className="text-sm text-accent4 text-center w-full">
                        Have an account already?{" "}
                        <Link
                            href="/login"
                            className="text-accent3 hover:text-backgroundPrimary font-medium"
                        >
                            Log in here
                        </Link>
                    </p>
                </form>
            </div>

            {/* Footer pinned at bottom */}
            <div className="text-xs text-accent4 text-center w-full pt-4 border-t max-w-md mx-auto pb-4">
                By continuing, you agree to our{" "}
                <Link
                    href="/terms"
                    className="text-accent3 hover:text-backgroundPrimary font-medium"
                >
                    Terms
                </Link>
                .
            </div>
        </section>
    );
}
