"use client";

import { Button } from "@/components/ui/button";

export default function SuccessPage() {
    return (
        <section className="min-h-screen flex flex-col bg-white justify-center items-center text-center px-4">
            <div className="w-full  flex flex-col items-center space-y-4 sm:space-y-5">
                <h2 className="text-2xl sm:text-3xl text-backgroundSecondary font-bold">
                    You&apos;re Verified — Welcome!
                </h2>

                <p className="text-xs sm:text-sm text-accent4 mx-auto sm:mt-4 max-w-[85%] sm:max-w-[31%]">
                    Thanks for confirming your email. You’re now one step closer
                    to joining a trusted community powered by everyday people —
                    just like you.
                </p>

                <Button className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-full mt-5 max-w-[90%] mx-auto sm:max-w-md">
                    Continue
                </Button>
            </div>
        </section>
    );
}
