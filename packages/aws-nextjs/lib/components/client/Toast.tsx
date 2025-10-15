"use client";

import { useEffect, useState } from "react";

type ToastProps = {
    message: string;
    duration?: number; // ms
};


export default function Toast({ message, duration }: ToastProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration ?? 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500 opacity-100 animate-fade-out">
            {message}
        </div>
    );
}