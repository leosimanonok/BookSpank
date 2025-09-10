import React from "react";
import { classNameMerge } from "../utils/classNameMerge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={classNameMerge(
                    "rounded-lg border bg-card text-card-foreground shadow-sm",
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

export { Card };
