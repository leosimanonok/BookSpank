import React from "react";
import { classNameMerge } from "../utils/classNameMerge";

export interface LabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement> { }

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, ...props }, ref) => {
        return (
            <label
                ref={ref}
                className={classNameMerge(
                    "text-sm font-medium leading-none text-foreground",
                    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    className
                )}
                {...props}
            />
        );
    }
);
Label.displayName = "Label";

export { Label };
