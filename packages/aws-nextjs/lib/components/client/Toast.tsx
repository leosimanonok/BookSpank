"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'


export default function Toast() {

    const searchParams = useSearchParams();

    const error_description = searchParams.get("error_description");

    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);

    const VISIBLE_DURATION = 3000;
    const FADE_DURATION = 500;

    useEffect(() => {

        const fadeStart = Math.max(VISIBLE_DURATION - FADE_DURATION, 0);
        const fadeTimer = setTimeout(() => setFading(true), fadeStart);
        const removeTimer = setTimeout(() => setVisible(false), VISIBLE_DURATION);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    },);

    if (!error_description || (!visible && !fading)) return null;


    return (
        <div
            className={`bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"
                }`}
        >
            {error_description}
        </div>
    );
}