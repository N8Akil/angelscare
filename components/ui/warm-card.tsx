import { cn } from "@/lib/utils";

interface WarmCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function WarmCard({ children, className, ...props }: WarmCardProps) {
    return (
        <div
            className={cn(
                "bg-card border border-border rounded-2xl p-6",
                "shadow-[0_4px_20px_rgba(107,58,91,0.05)]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
