"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
    data: {
        recipient_name: string;
        recipient_number: string;
    };
    updateData: (data: Partial<Props["data"]>) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function CreatePackageStepThree({
    data,
    updateData,
    onNext,
    onBack,
}: Props) {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const isNameValid = data.recipient_name.trim().length > 1;
        const isPhoneValid = /^\d{11,15}$/.test(data.recipient_number.trim());
        setIsValid(isNameValid && isPhoneValid);
    }, [data]);

    return (
        <section className="min-h-screen mt-20 mx-auto max-w-lg">
            <div className="mb-3">
                <h2 className="text-2xl text-backgroundSecondary font-bold text-center mb-11">
                    Who’s receiving your package?
                </h2>
            </div>

            {/*  Recipient Name */}
            <div className="mb-7">
                <Label
                    htmlFor="recipient_name"
                    className="text-sm text-accent4 font-normal"
                >
                    Recipient Name
                </Label>
                <Input
                    id="recipient_name"
                    value={data.recipient_name}
                    onChange={(e) => updateData({ recipient_name: e.target.value })}
                    placeholder="e.g. Nnalunwa Rachel"
                    className="mt-4 w-full pr-10 pl-4 py-5 bg-neutral1 border border-gray-300 rounded-lg placeholder:text-accent4/45"
                />
            </div>

            {/* Recipient Phone Number */}
            <div className="mb-4">
                <Label
                    htmlFor="recipient_phone_number"
                    className="text-sm text-accent4 font-normal"
                >
                    Recipient Phone Number
                </Label>
                <Input
                    id="recipient_phone_number"
                    value={data.recipient_number}
                    onChange={(e) => updateData({ recipient_number: e.target.value })}
                    placeholder="e.g. 2349012345678"
                    className="mt-4 w-full pr-10 pl-4 py-5 bg-neutral1 border border-gray-300 rounded-lg placeholder:text-accent4/45"
                />
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-8">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="w-1/3 py-6 border-gray-300 text-accent4 hover:bg-muted"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </Button>

                <Button
                    type="button"
                    onClick={onNext}
                    disabled={!isValid}
                    className="w-2/3 py-6 bg-accent3 hover:bg-backgroundPrimary rounded-lg disabled:opacity-50"
                >
                    Continue
                </Button>
            </div>
        </section>
    );
}
 