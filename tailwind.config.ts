import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
    darkMode: "class",

    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],

    theme: {},

    plugins: [
        nextui({
            addCommonColors: true,
            themes: {
                dark: {
                    colors: {
                        default: {
                            DEFAULT: "#374151",
                            100: "#1f262d",
                            200: "#232b33",
                        },
                        content1: "#101820",
                    },
                },
                light: {
                    colors: {
                        default: {
                            DEFAULT: "#f1f2f4",
                            100: "#eceef0",
                            200: "#e8eaed",
                        },
                        content1: "#f9fafb",
                    },
                },
            },
        }),
    ],
};

export default config;
