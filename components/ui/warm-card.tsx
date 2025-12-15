import { cn } from "@/lib/utils";

interface WarmCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function WarmCard({ children, className, ...props }: WarmCardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-2xl p-6",
                "shadow-lg shadow-navy/5",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
