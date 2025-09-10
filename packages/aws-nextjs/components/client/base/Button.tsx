import React from "react";
import { classNameMerge } from "../utils/classNameMerge";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "primary" | "accent" | "sage" | "outline";
    size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                className={classNameMerge(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                    {
                        "bg-primary text-primary-foreground shadow hover:bg-primary/90":
                            variant === "primary",
                        "bg-accent text-accent-foreground shadow hover:bg-accent/90":
                            variant === "accent",
                        "bg-sage text-sage-foreground shadow hover:bg-sage/90":
                            variant === "sage",
                        "bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground":
                            variant === "default",
                        "border border-input bg-background hover:bg-secondary/20 hover:border-secondary hover:text-secondary hover:shadow-md":
                            variant === "outline",
                    },
                    {
                        "h-10 px-4 py-2": size === "default",
                        "h-9 rounded-md px-3": size === "sm",
                        "h-11 rounded-md px-8": size === "lg",
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
