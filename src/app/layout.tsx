import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "@/app/providers";
import { Toaster } from "sonner";

import "@/styles/globals.css";

import Navigation from "@/components/Navigation/Navigation";

export const metadata: Metadata = {
    title: "Ranksper AI Studio",
    description: "Discover the future of AI with Ranksper AI Studio. We provide AI solutions for businesses and individuals.",
    metadataBase: new URL("https://ranksper.com/"),
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href={"/assets/favicons/apple-touch-icon.png"} />
                <link rel="icon" type="image/png" sizes="32x32" href={"/assets/favicons/favicon-32x32.png"} />
                <link rel="icon" type="image/png" sizes="16x16" href={"/assets/favicons/favicon-16x16.png"} />
                <link rel="manifest" href={"/assets/favicons/site.webmanifest"} />
            </head>
            <body className={`h-screen bg-white dark:bg-slate-900 ${inter.className}`}>
                <Providers>
                    <Navigation />
                    <main className="mx-auto w-full max-w-screen-2xl grow">{children}</main>
                    <Toaster closeButton richColors theme="system" />
                </Providers>
            </body>
        </html>
    );
}
