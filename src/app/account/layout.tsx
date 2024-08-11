import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account - Ranksper AI Studio",
    description: "Manage your Ranksper AI Studio account.",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return children;
}
