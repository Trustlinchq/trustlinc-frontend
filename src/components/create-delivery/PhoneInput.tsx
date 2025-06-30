"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

interface PhoneInputProps {
    onNext: (enteredPhone: string) => void;
}

export default function PhoneInput({ onNext }: PhoneInputProps) {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/phone/initiate",
                { phone_number: normalizedPhone }
            );

            toast.success(
                "OTP sent to your phone. Please check your messages."
            );
            onNext(normalizedPhone);
        } catch (err) {
            const axiosError = err as unknown as {
                response?: { data?: { error?: string } };
                message?: string;
            };
            const message =
                axiosError.response?.data?.error ||
                axiosError.message ||
                "Failed to send OTP.";
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

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center space-y-6 w-full sm:max-w-md mx-auto overflow-hidden"
            >
                <div className="w-full px-4">
                    <Input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="2349012345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full py-5 rounded-lg text-sm bg-gray-100 border border-gray-300 mt-6 placeholder:text-accent4/60"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-[90%] py-6 bg-accent3 hover:bg-backgroundPrimary rounded-lg mb-4"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send OTP"}
                </Button>
            </form>
        </section>
    );
}
