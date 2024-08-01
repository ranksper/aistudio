"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { toast } from "sonner";

interface CopyProps extends ButtonProps {
    text: string;
}

const CopyButton = ({ children, text, ...props }: CopyProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.info("Copied to clipboard");
    };

    return (
        <Button onClick={handleCopy} {...props}>
            {children}
        </Button>
    );
};

export default CopyButton;
