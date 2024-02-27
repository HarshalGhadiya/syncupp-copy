"use client";
import { useEffect } from "react";
import { persistor, store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

export function Persistor({ children }: { children: React.ReactNode }) {


    // Remove All the console
    // useEffect(() => {
    //     const originalConsoleLog = console.log;
    //     const originalConsoleWarn = console.warn;
    //     const originalConsoleError = console.error;

    //     console.log = console.warn = console.error = () => { };

    //     return () => {
    //         console.log = originalConsoleLog;
    //         console.warn = originalConsoleWarn;
    //         console.error = originalConsoleError;
    //     };
    // }, []);


    return <PersistGate persistor={persistor}>{children}</PersistGate>;
}