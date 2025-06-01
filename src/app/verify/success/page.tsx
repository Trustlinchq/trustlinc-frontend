"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SuccessPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleContinue = () => {
        if (loading) return;
        setLoading(true);

        const token = localStorage.getItem("onboardingToken");
        if (!token) {
            toast.error(
                "Something went wrong. Please verify your email again."
            );
            router.push("/verify");
        } else {
            router.push("/onboarding/phase-1");
        }
    };

    return (
        <section className="min-h-screen flex flex-col bg-neutral-100 px-4 pt-44 sm:pt-48 overflow-x-hidden">
            <div className="w-full  flex flex-col items-center text-center space-y-4 sm:space-y-5">
                <h2 className="text-2xl sm:text-3xl text-backgroundSecondary font-bold">
                    You&apos;re Verified — Welcome!
                </h2>

                <p className="text-xs sm:text-sm text-accent4 mx-auto sm:mt-4 max-w-[85%] sm:max-w-[31%]">
                    Thanks for confirming your email. You’re now one step closer
                    to joining a trusted community powered by everyday people —
                    just like you.
                </p>

                <Button
                    className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-full mt-5 max-w-[90%] mx-auto sm:max-w-md"
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </div>
        </section>
    );
}
