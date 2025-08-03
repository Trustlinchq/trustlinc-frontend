"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface AuthFormProps {
    title: string | React.ReactNode;
    description: string;
    submitUrl: string;
    redirectLabel: string;
    redirectHref: string;
    redirectText: string;
    terms?: boolean;
    redirectToVerification?: string;
}

export default function AuthForm({
    title,
    description,
    submitUrl,
    redirectLabel,
    redirectHref,
    redirectText,
    terms,
    redirectToVerification,
}: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(submitUrl, { email });
            toast.success("OTP sent to your email.");
            if (res.status === 201) {
                router.push(
                    `${
                        redirectToVerification ?? "/verify"
                    }?email=${encodeURIComponent(email)}`
                );
            }
        } catch (err) {
            const error = err as AxiosError<{
                error?: string;
                message?: string;
                details?: string;
            }>;

            const serverError = error.response?.data;
            const meaningfulError =
                serverError?.error ||
                serverError?.message ||
                serverError?.details ||
                "An unexpected error occurred. Please try again.";

            toast.error(meaningfulError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex flex-col bg-neutral-100">
            <main className="flex-grow flex flex-col items-center w-full mx-auto space-y-4 max-h-full overflow-hidden pt-44 sm:pt-48">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center space-y-6 w-full sm:max-w-md mx-auto overflow-hidden"
                >
                    <header className="text-center w-full">
                        <h1 className="text-3xl sm:text-4xl text-backgroundSecondary font-bold">
                            {title}
                        </h1>
                        <p className="text-xs sm:text-sm text-accent4 mx-auto mt-2 sm:mt-4 max-w-[75%]">
                            {description}
                        </p>

                        <div className="w-full relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pr-10 pl-4 py-6 rounded-lg text-sm bg-gray-100 border border-gray-300 mt-6 overflow-hidden max-w-[90%] mx-auto"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-lg mt-5 mb-4 max-w-[90%] mx-auto"
                            disabled={loading || !email}
                        >
                            {loading ? "Sending OTP..." : "Continue"}
                        </Button>
                    </header>

                    <p className="text-sm text-accent4 text-center w-full">
                        {redirectLabel}{" "}
                        <Link
                            href={redirectHref}
                            className="text-accent3 hover:text-backgroundPrimary font-medium"
                        >
                            {redirectText}
                        </Link>
                    </p>
                </form>
            </main>

            {terms && (
                <div className="mt-auto text-xs text-accent4 text-center w-full pt-4 border-t max-w-72 mx-auto pb-6">
                    By continuing, you agree to our{" "}
                    <Link
                        href="/terms"
                        className="text-accent3 hover:text-backgroundPrimary font-medium"
                    >
                        Terms
                    </Link>
                    .
                </div>
            )}
        </section>
    );
}
