"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import VerifyOverlay from "@/components/create-delivery/VerifyOverlay";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import axios from "axios";

const PACKAGE_SIZE = ["SMALL", "MEDIUM", "LARGE"];

export default function DeliveriesPage() {
    const [showVerifyOverlay, setShowVerifyOverlay] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkVerification = async () => {
            try {
                const res = await axios.get("/api/v1/auth/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });

                if (res.data?.user?.phone_number) {
                    setIsVerified(true);
                } else {
                    setShowVerifyOverlay(true);
                }
            } catch (err) {
                console.error("Failed to check verification status", err);
                setShowVerifyOverlay(true);
            } finally {
                setLoading(false);
            }
        };

        checkVerification();
    }, []);

    if (loading)
        return (
            <div className="mt-20 text-center text-sm text-accent4 ">
                Checking verification...
            </div>
        );

    return (
        <>
            {showVerifyOverlay && (
                <VerifyOverlay
                    onComplete={() => {
                        setIsVerified(true);
                        setShowVerifyOverlay(false);
                    }}
                    onClose={() => {
                        window.location.href = "/shipper/dashboard";
                    }}
                />
            )}

            {isVerified && (
                <section className="min-h-screen mt-20 mx-auto max-w-lg">
                    <div className="mb-3">
                        <h2 className="text-2xl text-backgroundSecondary font-bold text-center mb-11">
                            What are you sending?
                        </h2>

                        <p className="text-sm text-accent4 font-normal">
                            Item Description
                        </p>
                    </div>

                    <div>
                        <Input
                            id="description"
                            placeholder="e.g. A pair of sneakers in a shoebox"
                            className="w-full pr-10 pl-4 py-5 bg-neutral1 border border-gray-300 overflow-hidden rounded-lg mx-auto placeholder:text-accent4/45"
                        />
                    </div>

                    <div className="mb-8 mt-6">
                        <Label className="text-sm text-accent4 font-normal">
                            Package Size
                        </Label>
                        <Select defaultValue="SMALL">
                            <SelectTrigger className="w-full pr-4 pl-4 py-5 bg-neutral1 border border-gray-300 mt-3 overflow-hidden rounded-lg mx-auto text-xs font-bold text-accent4/75">
                                <SelectValue placeholder="Select package size" />
                            </SelectTrigger>
                            <p className="text-xs mt-1 text-accent4/65">
                                “Choose the option that best fits your item’s
                                size and weight.”
                            </p>
                            <SelectContent
                                side="bottom"
                                sideOffset={4}
                                className="text-xs text-accent4 max-h-60 w-full"
                            >
                                {PACKAGE_SIZE.map((state) => (
                                    <SelectItem key={state} value={state}>
                                        {state.replace("_", " ")}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <p className="text-sm text-accent4 font-normal mb-4">
                            Suggested Delivery Reward
                        </p>
                        <Input
                            id="reward"
                            placeholder="₦1,500"
                            className="w-full pr-10 pl-4 py-5 bg-neutral1 border border-gray-300 overflow-hidden rounded-lg mx-auto placeholder:text-accent4/45"
                        />
                        <p className="text-xs mt-1 text-accent4/65">
                            “₦1,000 – ₦2,500 based on item size”
                        </p>
                    </div>

                    <Button className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-lg mt-8">
                        Continue
                    </Button>
                </section>
            )}
        </>
    );
}
