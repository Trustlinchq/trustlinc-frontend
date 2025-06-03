import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
    return (
        <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/ grid grid-cols-1 gap-4 sm:grid-cols-3 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Total Deliveries</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        5
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge
                            variant="outline"
                            className="flex gap-1 rounded-lg text-xs"
                        >
                            <TrendingUpIcon className="size-3" />
                            +12.5%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        All your deliveries.{" "}
                        <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Past 6 months total.
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Delivered</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        2
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge
                            variant="outline"
                            className="flex gap-1 rounded-lg text-xs"
                        >
                            <TrendingDownIcon className="size-3" />
                            -20%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Successfully completed.{" "}
                        <TrendingDownIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Delivered in past 6 months.
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>In Progress</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        1
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge
                            variant="outline"
                            className="flex gap-1 rounded-lg text-xs"
                        >
                            <TrendingUpIcon className="size-3" />
                            +12.5%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Currently on the way.{" "}
                        <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Ongoing deliveries now.
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
