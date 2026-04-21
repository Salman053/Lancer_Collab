// components/ui/note.tsx
import { cn } from "@/lib/utils";
import { ReactNode, ElementType } from "react";
import {
    Info,
    AlertTriangle,
    CheckCircle,
    AlertCircle,
    Lightbulb
} from "lucide-react";

export type NoteVariant = "info" | "success" | "warning" | "error" | "tip";

interface NoteProps {
    children: ReactNode;
    variant?: NoteVariant;
    title?: string;
    className?: string;
    icon?: ElementType | null;
    onClose?: () => void;
}

const variantConfig = {
    info: {
        bg: "bg-blue-50 dark:bg-blue-950/30",
        border: "border-blue-200 dark:border-blue-800",
        text: "text-blue-800 dark:text-blue-200",
        icon: Info,
        iconBg: "bg-blue-100 dark:bg-blue-900/50",
        title: "Information",
    },
    success: {
        bg: "bg-green-50 dark:bg-green-950/30",
        border: "border-green-200 dark:border-green-800",
        text: "text-green-800 dark:text-green-200",
        icon: CheckCircle,
        iconBg: "bg-green-100 dark:bg-green-900/50",
        title: "Success",
    },
    warning: {
        bg: "bg-yellow-50 dark:bg-yellow-950/30",
        border: "border-yellow-200 dark:border-yellow-800",
        text: "text-yellow-800 dark:text-yellow-200",
        icon: AlertTriangle,
        iconBg: "bg-yellow-100 dark:bg-yellow-900/50",
        title: "Warning",
    },
    error: {
        bg: "bg-red-50 dark:bg-red-950/30",
        border: "border-red-200 dark:border-red-800",
        text: "text-red-800 dark:text-red-200",
        icon: AlertCircle,
        iconBg: "bg-red-100 dark:bg-red-900/50",
        title: "Error",
    },
    tip: {
        bg: "bg-purple-50 dark:bg-purple-950/30",
        border: "border-purple-200 dark:border-purple-800",
        text: "text-purple-800 dark:text-purple-200",
        icon: Lightbulb,
        iconBg: "bg-purple-100 dark:bg-purple-900/50",
        title: "Tip",
    },
};

export function Note({
    children,
    variant = "info",
    title,
    className,
    icon,
    onClose,
}: NoteProps) {
    const config = variantConfig[variant];
    const IconComponent = icon || config.icon;
    const displayTitle = title || config.title;

    return (
        <div
            className={cn(
                "relative rounded-lg border p-4",
                config.bg,
                config.border,
                className
            )}
            role="alert"
        >
            <div className="flex gap-3">
                {icon != null &&
                    <div
                        className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                            config.iconBg
                        )}
                    >
                        <IconComponent className={cn("h-4 w-4", config.text)} />
                    </div>
                }

                <div className="flex-1 space-y-1">
                    {displayTitle && (
                        <h4 className={cn("font-semibold", config.text)}>
                            {displayTitle}
                        </h4>
                    )}
                    <div className={cn("text-sm", config.text)}>
                        {children}
                    </div>
                </div>

                {onClose && (
                    <button
                        onClick={onClose}
                        className={cn(
                            "shrink-0 rounded-md p-1 transition-colors",

                            config.text
                        )}
                        aria-label="Close"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

// Optional: Compound component for more flexibility
export const NoteContent = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cn("space-y-2", className)}>{children}</div>
);

export const NoteActions = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cn("mt-3 flex gap-2", className)}>{children}</div>
);