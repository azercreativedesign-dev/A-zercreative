"use client";

import { useEffect } from "react";

export function HydrationFix() {
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        (args[0].includes("Hydration failed") || args[0].includes("Hydration mismatch"))
      ) {
        return;
      }
      originalError.call(console, ...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}