"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { setupSessionSync, handleLogout } from "@/lib/session";
import apiClient from "@/lib/api";

const FILTERS = ["all", "in-progress", "delivered"];

type Delivery = {
    id: string;
    description: string;
    pickup: string;
    dropoff: string;
    courier: string;
    status: string;
    date: string;
    trackingUrl: string;
};

export default function ShipperDeliveries() {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);

    const fetchDeliveries = async () => {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.role !== "SHIPPER") {
            toast.error("Access denied. Shipper role required.");
            setLoading(false);
            return;
        }

        if (!localStorage.getItem("token")) {
            toast.error("No authentication token found. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const res = await apiClient.get("/shipper/dashboard/deliveries", {
                params: {
                    status: filter,
                    page,
                    limit: 5,
                },
            });

            setDeliveries(res.data.data);
            SetTotalPages(res.data.pagination.totalPages);
        } catch {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setupSessionSync(
            () => {
                // Handle logout in other tabs
                toast.error("Logged out in other tabs");
                handleLogout();
            },
            () => {
                // Handle token update (refresh)
                apiClient
                    .get("/shipper/dashboard/deliveries", {
                        params: { status: filter, page, limit: 5 },
                    })
                    .then((res) => {
                        setDeliveries(res.data.data);
                        SetTotalPages(res.data.pagination.totalPages);
                    })
                    .catch(() => {
                        setDeliveries([]);
                    });
            }
        );

        fetchDeliveries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, page]);

    return (
        <div className="w-full px-4 sm:px-6 md:px-8 py-4 rounded-sm shadow-sm border mb-4">
            {loading ? (
                <div className="space-y-6">
                    {/* Header Skeleton */}
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-16" />
                    </div>

                    {/* Filter Buttons Skeleton */}
                    <div className="flex gap-4">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-8 w-24 rounded-sm" />
                        ))}
                    </div>

                    {/* Table Skeleton */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <tbody>
                                {[...Array(3)].map((_, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="py-2">
                                            <Skeleton className="h-4 w-20" />
                                        </td>
                                        <td>
                                            <Skeleton className="h-4 w-24" />
                                        </td>
                                        <td>
                                            <Skeleton className="h-4 w-32" />
                                        </td>
                                        <td>
                                            <Skeleton className="h-4 w-24" />
                                        </td>
                                        <td>
                                            <Skeleton className="h-4 w-20" />
                                        </td>
                                        <td>
                                            <Skeleton className="h-4 w-16" />
                                        </td>
                                        <td>
                                            <Skeleton className="h-4 w-12" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-base font-bold text-backgroundSecondary">
                            My Deliveries
                        </h2>
                        <Link
                            href="/MyDeliveries"
                            className="text-xs py-1 px-2 bg-backgroundSecondary text-neutral2 rounded-sm hover:bg-backgroundPrimary"
                        >
                            View All
                        </Link>
                    </div>

                    {/* Filter */}
                    <div className="flex gap-10 mb-6 border p-1 w-fit rounded-sm">
                        {FILTERS.map((f) => {
                            const isActive = f === filter;
                            return (
                                <Button
                                    key={f}
                                    variant="ghost"
                                    onClick={() => {
                                        setPage(1);
                                        setFilter(f);
                                    }}
                                    className={cn(
                                        "px-6 text-sm transition",
                                        isActive
                                            ? "bg-accent3 text-neutral2 hover:bg-backgroundPrimary hover:text-neutral2"
                                            : "text-muted-foreground hover:bg-backgroundPrimary hover:text-neutral2"
                                    )}
                                >
                                    {f === "in-progress"
                                        ? "In Progress"
                                        : f.charAt(0).toUpperCase() +
                                          f.slice(1)}
                                </Button>
                            );
                        })}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <Table className="min-w-[700px]">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-sm">
                                        ID
                                    </TableHead>
                                    <TableHead className="text-sm">
                                        Description
                                    </TableHead>
                                    <TableHead className="text-sm whitespace-nowrap">
                                        Pickup → Dropoff
                                    </TableHead>
                                    <TableHead className="text-sm">
                                        Courier
                                    </TableHead>
                                    <TableHead className="text-sm">
                                        Status
                                    </TableHead>
                                    <TableHead className="text-sm">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-sm text-right">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {deliveries.map((delivery) => (
                                    <TableRow key={delivery.id}>
                                        <TableCell className="text-sm font-medium whitespace-nowrap">
                                            {delivery.id}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {delivery.description}
                                        </TableCell>
                                        <TableCell className="text-sm whitespace-nowrap">
                                            {delivery.pickup} →{" "}
                                            {delivery.dropoff}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {delivery.courier}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            <span
                                                className={
                                                    delivery.status ===
                                                    "In Progress"
                                                        ? "text-yellow-600"
                                                        : delivery.status ===
                                                          "DELIVERED"
                                                        ? "text-green-600"
                                                        : "text-muted-foreground"
                                                }
                                            >
                                                {delivery.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {delivery.date}
                                        </TableCell>
                                        <TableCell className="text-sm text-right">
                                            <Button
                                                size="sm"
                                                variant="link"
                                                asChild
                                            >
                                                <a
                                                    href={delivery.trackingUrl}
                                                    target="_blank"
                                                >
                                                    View
                                                </a>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() =>
                                    setPage((prev) => Math.max(prev - 1, 1))
                                }
                            >
                                Prev
                            </Button>
                            <span className="px-2 text-sm pt-1">
                                Page {page} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
