"use client";

import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import apiClient from "@/lib/api";

type Stat = {
    current: number;
    previous: number;
    percentageChange: string;
    trend: "up" | "down";
};

type StatsResponse = {
    timeframe: string;
    totalDeliveries: Stat;
    delivered: Stat;
    inProgress: Stat;
};

export default function MobileStatsCarousel() {
    const [stats, setStats] = useState<StatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        slides: { perView: 1 },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setTimeout(() => instanceRef.current?.update(), 4000);
        },
        animationEnded() {
            setTimeout(
                () => instanceRef.current?.moveToIdx((currentSlide + 1) % 3),
                4000
            );
        },
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        apiClient
            .get("/shipper/dashboard/stats")
            .then((res) => setStats(res.data))
            .catch(() => setStats(null))
            .finally(() => setLoading(false));
    }, [mounted]);

    const cards = stats
        ? [
              {
                  title: "Total Deliveries",
                  data: stats.totalDeliveries,
                  description: "Past 1 months total.",
              },
              {
                  title: "Delivered",
                  data: stats.delivered,
                  description: "Delivered in past 1 months total.",
              },
              {
                  title: "In Progress",
                  data: stats.inProgress,
                  description: "Ongoing deliveries now.",
              },
          ]
        : [];

    const renderTrend = (
        trend: "up" | "down",
        percent: string,
        description: string
    ) => {
        const isUp = trend === "up";
        return (
            <div
                className={cn(
                    "flex items-center justify-center gap-2 text-sm",
                    isUp ? "text-green-600" : "text-red-600"
                )}
            >
                {isUp ? (
                    <ArrowUpRight className="w-4 h-4" />
                ) : (
                    <ArrowDownRight className="w-4 h-4" />
                )}
                <span className="text-xs text-muted-foreground/65">
                    {description}
                </span>
            </div>
        );
    };

    return (
        <div className="w-full px-4 mt-7">
            {loading ? (
                <div className="flex justify-center items-center ">
                    <Skeleton className="w-full h-40 rounded-xl bg-neutral2 border shadow-[0_12px_35px_-8px_rgba(0,0,0,0.12)] py-6" />
                </div>
            ) : (
                <div className="relative">
                    {/* Fixed Card Container */}
                    <div className="bg-neutral2 p-6 rounded-2xl border border-accent1 shadow-[0_12px_35px_-8px_rgba(0,0,0,0.12)]">

                        {/* Slider Inside Card */}
                        <div
                            ref={sliderRef}
                            className="keen-slider overflow-hidden"
                        >
                            {cards.map((card) => (
                                <div
                                    key={card.title}
                                    className="keen-slider__slide flex flex-col items-center justify-center text-center"
                                >
                                    <h3 className="text-sm text-accent4/60 mb-5 font-semibold">
                                        {card.title}
                                    </h3>
                                    <div className="text-3xl font-bold text-accent3 mb-5">
                                        {card.data.current}
                                    </div>
                                    {renderTrend(
                                        card.data.trend,
                                        card.data.percentageChange,
                                        card.description
                                    )}

                                    {/* Dots inside the card */}
                                    <div className="flex justify-center mt-4 gap-2">
                                        {cards.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={cn(
                                                    "h-2 rounded-full transition-all",
                                                    currentSlide === idx
                                                        ? "bg-accent2 w-4 h-1"
                                                        : "bg-accent4/40 w-2 h-1"
                                                )}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
