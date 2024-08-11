import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In - Ranksper AI Studio",
    description: "Sign in to your Ranksper AI Studio account.",
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
    return children;
}
