import {
    LayoutPanelLeft,
    CirclePlus,
    Package,
    WalletCards,
    BadgeHelp,
} from "lucide-react";

export const navItems = [
    {
        name: "Dashboard",
        href: "/shipper/dashboard",
        icon: LayoutPanelLeft,
    },

    {
        name: "Create a Delivery",
        href: "/shipper/create-delivery",
        icon: CirclePlus,
    },

    {
        name: "My Deliveries",
        href: "/my-deliveries",
        icon: Package,
    },

    {
        name: "Payment History",
        href: "/payment-history",
        icon: WalletCards,
    },

    {
        name: "Support",
        href: "/Support",
        icon: BadgeHelp,
    },
];
