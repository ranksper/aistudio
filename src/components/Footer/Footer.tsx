"use client";

import { usePathname } from "next/navigation";
import { Link } from "@nextui-org/react";

const Footer = () => {
    const pathname = usePathname();

    const excludePaths = ["/chatbots/"];

    const shouldRender = excludePaths.some((path) => pathname.startsWith(path));

    if (shouldRender) return null;

    return (
        <footer className="mt-20 grow border-t border-divider px-5 py-3">
            <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-4 md:flex-row">
                <p>{"© 2024 Ranksper Company. All rights reserved."}</p>
                <div className="flex gap-4 md:ml-auto">
                    <Link href="https://www.ranksper.com/about" color="foreground">
                        About
                    </Link>
                    <Link href="https://www.ranksper.com/legal/privacy" color="foreground">
                        Privacy
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
