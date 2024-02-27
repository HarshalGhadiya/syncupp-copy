"use client";
import { useState, useEffect } from "react";

export function useDebouncedValue<T>(input: T, time: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(input);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(input);
        }, time);

        return () => {
            clearTimeout(timeout);
        };
    }, [input, time]);

    return debouncedValue;
}
