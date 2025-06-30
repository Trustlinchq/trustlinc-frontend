"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

interface PhoneInputProps {
    onNext: (phone: string, pin_id: string) => void;
}

export default function PhoneInput({ onNext }: PhoneInputProps) {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const normalizedPhone = phone.replace(/\s+/g, "");
        const phonePattern = /^(\+?234)[0-9]{10}$/;

        if (!phonePattern.test(normalizedPhone)) {
            toast.error(
                "Please enter a valid Nigerian phone number. Use e.g. 2349012345678"
            );
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/phone/initiate",
                { phone_number: normalizedPhone },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            toast.success(
                "OTP sent to your phone. Please check your messages."
            );
            onNext(normalizedPhone, res.data.pin_id);
        } catch (err: unknown) {
            let message = "Failed to send OTP.";
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.error || err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col bg-neutral-100 mt-24 py-7 rounded-md">
            <div className="mb-3">
                <h2 className="text-xl text-backgroundSecondary font-bold text-center">
                    Phone Verification
                </h2>
                <p className="text-xs text-accent4 mx-auto mt-2 max-w-[50%] text-center">
                    We’ll use this number to confirm your identity and secure
                    your delivery
                </p>
            </div>
            <div className="flex-grow flex flex-col items-center w-full mx-auto space-y-4 max-h-full overflow-hidden ">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center space-y-6 w-full sm:max-w-md mx-auto overflow-hidden"
                >
                    <div className="text-center w-full">
                        <div className="w-full relative">
                            <Input
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="234 901 234 5678"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="w-full pr-10 pl-4 py-5 rounded-lg text-sm bg-gray-100 border border-gray-300 mt-6 overflow-hidden max-w-[90%] mx-auto placeholder:text-accent4/60"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-lg mt-5 mb-4 max-w-[90%] mx-auto"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
