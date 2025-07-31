"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/api";

interface Props {
    data: {
        category: string;
        description: string;
        size: string;
        price: string;
        pickup_location: string;
        pickup_location_details: string;
        destination: string;
        destination_details: string;
        recipient_name: string;
        recipient_number: string;
    };
    platformFee: number | null;
    remainingFreeDeliveries: number | null;
    onBack: () => void;
    onSuccess: () => void;
}

const getCategoryLabel = (value: string) => {
    const map = {
        FOOD_AND_GROCERIES: "Food & Groceries",
        CLOTHING_AND_ACCESSORIES: "Clothing & Accessories",
        DOCUMENTS_AND_BOOKS: "Documents & Books",
        ELECTRONICS: "Electronics",
        HOUSEHOLD_ITEMS: "Household Items",
        HEALTH_AND_PERSONAL_CARE: "Health & Personal Care",
        GIFTS_AND_PACKAGES: "Gifts & Packages",
        TOOLS_AND_EQUIPMENT: "Tools & Equipment",
        BUSINESS_DELIVERIES: "Business Deliveries",
        OTHERS: "Others",
    } as Record<string, string>;

    return map[value] || value;
};

export default function CreatePackageStepFour({
    data,
    platformFee,
    remainingFreeDeliveries,
    onBack,
    onSuccess,
}: Props) {
    const handleSubmit = async () => {
        try {
            const payload = {
                ...data,
                price: Number(data.price),
                description:
                    data.category === "OTHERS" && data.description
                        ? data.description
                        : "Not specified",
            };

            await apiClient.post("/packages", payload);
            toast.success("Delivery created successfully!");
            onSuccess();
        } catch (error) {
            toast.error("Failed to create package. Try again.");
            console.error("Submit error:", error);
        }
    };

    return (
        <section className="min-h-screen mt-20 mx-auto max-w-lg">
            <div className="mb-8 text-center">
                <h2 className="text-2xl text-backgroundSecondary font-bold mb-2">
                    Confirm Your Delivery Details
                </h2>
                <p className="text-sm text-accent4/85">
                    Everything in place? Let’s post your package securely.
                </p>
            </div>

            <div className="space-y-6 text-sm text-accent4">
                {/* Section 1: Package Info */}
                <div className="space-y-4 text-xs">
                    <h2 className="text-base font-bold text-accent4/90">
                        📦 What You&#39;re Sending
                    </h2>
                    <div className="flex gap-1">
                        <p className="font-medium text-accent4/80">Category:</p>
                        <p>{getCategoryLabel(data.category)}</p>
                    </div>
                    {data.category === "OTHERS" && (
                        <div className="flex gap-2">
                            <p className="font-medium text-accent4/80">
                                Description:
                            </p>
                            <p>{data.description}</p>
                        </div>
                    )}
                    <div className="flex gap-1">
                        <p className="font-medium text-accent4/80">Size:</p>
                        <p>{data.size}</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-medium text-accent4/80">
                            Suggested Reward:
                        </p>
                        <p>₦{data.price}</p>
                    </div>

                    {platformFee !== null && (
                        <p className="text-xs text-accent3/85 mt-1">
                            Platform fee: ₦{platformFee}{" "}
                            {platformFee === 0 &&
                            remainingFreeDeliveries !== null &&
                            remainingFreeDeliveries > 0
                                ? `(You have ${remainingFreeDeliveries} free deliver${
                                      remainingFreeDeliveries === 1
                                          ? "y"
                                          : "ies"
                                  } left)`
                                : "(applies after your 5 free deliveries)"}
                        </p>
                    )}
                </div>

                <div className="border-t border-border my-2" />

                {/* Section 2: Delivery Route */}
                <div className="space-y-3 text-xs">
                    <h2 className="text-base font-bold text-accent4/90">
                        📍 Delivery Route
                    </h2>
                    <div className="flex gap-1">
                        <p className="font-medium text-accent4/80">Pickup:</p>
                        <p>
                            {data.pickup_location.replace(/_/g, " ")} —{" "}
                            {data.pickup_location_details}
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-medium text-accent4/80">
                            Destination:
                        </p>
                        <p>
                            {data.destination.replace(/_/g, " ")} —{" "}
                            {data.destination_details}
                        </p>
                    </div>
                </div>

                <div className="border-t border-border my-2" />

                {/* Section 3: Recipient */}
                <div className="space-y-3 text-xs">
                    <h2 className="text-base font-bold text-accent4/90">
                        👤 Recipient Info
                    </h2>
                    <div className="flex gap-1">
                        <p className="font-medium text-accent4/90">
                            Recipient:
                        </p>
                        <p>{data.recipient_name}</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-medium text-accent4/90">Phone:</p>
                        <p>{data.recipient_number}</p>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-10">
                <Button
                    variant="outline"
                    onClick={onBack}
                    className="w-1/3 py-6 border-gray-300 text-accent4 hover:bg-muted"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="w-2/3 py-6 bg-accent3 hover:bg-backgroundPrimary rounded-lg"
                >
                    Submit
                </Button>
            </div>
        </section>
    );
}
