"use client";

import { useEffect, useState } from "react";

type ToastProps = {
    message: string;
    duration?: number; // ms
};


export default function Toast({ message, duration }: ToastProps) {
    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {

        const myDuration = duration ?? 5000;
        const fadeStart = Math.max(myDuration - 500, 0);
        const fadeTimer = setTimeout(() => setFading(true), fadeStart);
        const removeTimer = setTimeout(() => setVisible(false), myDuration);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [duration]);

    if (!visible && !fading) return null;


    return (
        <div
            className={`bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"
                }`}
        >
            {message}
        </div>
    );
}