"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import apiClient from "@/lib/api";
import { toast } from "sonner";

export type PackageSize = "SMALL" | "MEDIUM" | "LARGE";

const PACKAGE_SIZE: PackageSize[] = ["SMALL", "MEDIUM", "LARGE"];

const PACKAGE_CATEGORIES = [
    { value: "FOOD_AND_GROCERIES", label: "Food & Groceries" },
    { value: "CLOTHING_AND_ACCESSORIES", label: "Clothing & Accessories" },
    { value: "DOCUMENTS_AND_BOOKS", label: "Documents & Books" },
    { value: "ELECTRONICS", label: "Electronics" },
    { value: "HOUSEHOLD_ITEMS", label: "Household Items" },
    { value: "HEALTH_AND_PERSONAL_CARE", label: "Health & Personal Care" },
    { value: "GIFTS_AND_PACKAGES", label: "Gifts & Packages" },
    { value: "TOOLS_AND_EQUIPMENT", label: "Tools & Equipment" },
    { value: "BUSINESS_DELIVERIES", label: "Business Deliveries" },
    { value: "OTHERS", label: "Others" },
];

interface Props {
    data: {
        category: string;
        description: string;
        size: "" | PackageSize;
        price: string;
    };
    updateData: (data: Partial<Props["data"]>) => void;
    onNext: () => void;
    setPlatformFee: (value: number) => void;
    setRemainingFreeDeliveries: (value: number | null) => void;
    platformFee: number | null;
    remainingFreeDeliveries: number | null;
}

export default function CreatePackageStepOne({
    data,
    updateData,
    onNext,
    setPlatformFee,
    setRemainingFreeDeliveries,
    platformFee,
    remainingFreeDeliveries,
}: Props) {
    const [priceRange, setPriceRange] = useState<string | null>(null);
    const [recommendedPrice, setRecommendedPrice] = useState<number | null>(
        null
    );
    const [lowerLimit, setLowerLimit] = useState(0);
    const [upperLimit, setUpperLimit] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const handleSizeChange = useCallback(
        async (val: string) => {
            const size = val as PackageSize;
            updateData({ size });

            setIsLoading(true);
            try {
                const [priceRes, feeRes] = await Promise.all([
                    apiClient.get(`/packages/price-suggestion?size=${val}`),
                    apiClient.get(`/shipper/delivery-count`),
                ]);

                const range = priceRes.data?.price_range;
                const suggested = priceRes.data?.recommended_price;

                if (typeof range === "string" && range.includes("-")) {
                    const [low, high] = range
                        .split("-")
                        .map((v: string) => parseInt(v.trim()));
                    if (!isNaN(low) && !isNaN(high)) {
                        setPriceRange(range);
                        setLowerLimit(low);
                        setUpperLimit(high);
                    }
                }

                if (typeof suggested === "number") {
                    setRecommendedPrice(suggested);
                    updateData({ price: suggested.toString() });
                }

                const fee = feeRes.data?.platformFee;
                setPlatformFee(typeof fee === "number" ? fee : 0);

                const remaining = feeRes.data?.remainingFreeDeliveries;
                setRemainingFreeDeliveries(
                    typeof remaining === "number" ? remaining : null
                );
            } catch (error) {
                console.error("Failed to fetch suggestion or fee:", error);
                toast.error(
                    "Unable to fetch suggestion or fee. Please try again."
                );
            } finally {
                setIsLoading(false);
            }
        },
        [updateData, setPlatformFee, setRemainingFreeDeliveries]
    );

    useEffect(() => {
        if (data.size && !priceRange && !isLoading) {
            handleSizeChange(data.size);
        }
    }, [data.size, priceRange, isLoading, handleSizeChange]);

    const limitsFetched = lowerLimit > 0 && upperLimit > 0;
    const isValidPrice =
        !!data.price &&
        limitsFetched &&
        !isNaN(Number(data.price)) &&
        Number(data.price) >= lowerLimit &&
        Number(data.price) <= upperLimit;

    const pricePlaceholder =
        recommendedPrice !== null
            ? `₦${recommendedPrice}`
            : "Enter price (e.g., ₦1500)";

    return (
        <section className="min-h-screen mt-20 mx-auto max-w-lg">
            <div className="mb-3">
                <h2 className="text-2xl text-backgroundSecondary font-bold text-center mb-11">
                    Let’s get it moving — what are you sending?
                </h2>
            </div>

            {/* Category */}
            <div className="mb-3">
                <Label
                    htmlFor="category"
                    className="text-sm text-accent4 font-normal"
                >
                    Category
                </Label>
                <Select
                    value={data.category || ""}
                    onValueChange={(val) => updateData({ category: val })}
                >
                    <SelectTrigger
                        id="category"
                        className="w-full pr-4 pl-4 py-5 bg-neutral1 border border-gray-300 mt-3 overflow-hidden rounded-lg mx-auto text-xs text-accent4/75"
                    >
                        <SelectValue placeholder="Select item category" />
                    </SelectTrigger>
                    <SelectContent
                        side="bottom"
                        sideOffset={4}
                        className="text-xs text-accent4 max-h-60 w-full"
                    >
                        {PACKAGE_CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Description */}
            {data.category === "OTHERS" && (
                <div className="mb-6 mt-6">
                    <Label
                        htmlFor="description"
                        className="text-sm text-accent4 font-normal"
                    >
                        Item Description
                    </Label>
                    <Input
                        id="description"
                        value={data.description}
                        onChange={(e) =>
                            updateData({ description: e.target.value })
                        }
                        placeholder="e.g. Custom handcrafted souvenir"
                        className="w-full pr-10 pl-4 py-5 bg-neutral1 border border-gray-300 rounded-lg placeholder:text-accent4/45 mt-3"
                    />
                </div>
            )}

            {/* Package Size */}
            <div className="mb-8 mt-6">
                <Label
                    htmlFor="size"
                    className="text-sm text-accent4 font-normal"
                >
                    Package Size
                </Label>
                <Select
                    value={data.size || undefined}
                    onValueChange={handleSizeChange}
                    disabled={isLoading}
                >
                    <SelectTrigger
                        id="size"
                        className="w-full pr-4 pl-4 py-5 bg-neutral1 border border-gray-300 mt-3 overflow-hidden rounded-lg mx-auto text-xs text-accent4/75"
                    >
                        <SelectValue placeholder="Select package size" />
                    </SelectTrigger>
                    <SelectContent
                        side="bottom"
                        sideOffset={4}
                        className="text-xs text-accent4 max-h-60 w-full"
                    >
                        {PACKAGE_SIZE.map((size) => (
                            <SelectItem key={size} value={size}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="text-xs mt-1 text-accent4/65">
                    Choose the option that best fits your item’s size and
                    weight.
                </p>
                {isLoading && (
                    <p className="text-xs mt-1 text-accent4/65">
                        Fetching price suggestion...
                    </p>
                )}
            </div>

            {/* Price */}
            <div>
                <Label
                    htmlFor="price"
                    className="text-sm text-accent4 font-normal mb-4"
                >
                    Suggested Delivery Reward
                </Label>
                <Input
                    id="price"
                    value={data.price}
                    onChange={(e) => updateData({ price: e.target.value })}
                    placeholder={pricePlaceholder}
                    className="w-full pr-10 pl-4 py-5 bg-neutral1 border border-gray-300 overflow-hidden rounded-lg mx-auto placeholder:text-accent4/45"
                    type="number"
                    disabled={isLoading || !data.size}
                />
                {priceRange && (
                    <p className="text-xs mt-1 text-accent4/65">
                        ₦{priceRange} based on item size
                    </p>
                )}
                {platformFee !== null && (
                    <p className="text-xs mt-1 text-accent3/85">
                        Platform fee: ₦{platformFee}{" "}
                        {platformFee === 0 &&
                        remainingFreeDeliveries !== null &&
                        remainingFreeDeliveries > 0
                            ? `(You have ${remainingFreeDeliveries} free deliver${
                                  remainingFreeDeliveries === 1 ? "y" : "ies"
                              } left)`
                            : "(applies after your 5 free deliveries)"}
                    </p>
                )}

                {data.price && limitsFetched && !isValidPrice && (
                    <p className="text-xs mt-1 text-red-500">
                        Price must be between ₦{lowerLimit} and ₦{upperLimit}
                    </p>
                )}
            </div>

            <Button
                onClick={onNext}
                className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-lg mt-8"
                disabled={
                    !data.category ||
                    !data.size ||
                    !data.price ||
                    !isValidPrice ||
                    isLoading
                }
            >
                Continue
            </Button>
        </section>
    );
}
