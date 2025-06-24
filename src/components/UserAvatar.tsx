import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type User = {
    username: string;
    full_name: string;
    role: "SHIPPER" | "COURIER";
    image?: string | null;
};

type Props = {
    user: User;
    className?: string;
};

export default function UserAvatar({ user, className }: Props) {
    return (
        <Avatar className={cn(className)}>
            {user.image ? (
                <AvatarImage src={user.image} alt={user.username} />
            ) : (
                <AvatarFallback className="bg-neutral1 text-base text-center cursor-pointer">
                    {user.full_name?.charAt(0).toUpperCase() ||
                        user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
            )}
        </Avatar>
    );
}
