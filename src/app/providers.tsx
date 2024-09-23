"use client";

import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "nextjs-toploader/app";

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <NextUIProvider navigate={router.push} className="flex h-full flex-col overflow-y-auto">
            <AuthProvider>{children}</AuthProvider>
        </NextUIProvider>
    );
}
