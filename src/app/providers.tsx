"use client";

import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <NextUIProvider navigate={router.push} className="flex h-full flex-col">
            <AuthProvider>{children}</AuthProvider>
        </NextUIProvider>
    );
}
