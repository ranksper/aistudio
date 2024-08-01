"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { toast } from "sonner";

import { Prompt } from "@/types/prompt";

interface CopyProps extends ButtonProps {
    data: Prompt | null;
}

const FavoriteButton = ({ children, data, ...props }: CopyProps) => {
    const handleFavorite = () => {
        toast.info("This feature is not available yet");
    };

    return (
        <Button onClick={handleFavorite} {...props}>
            {children}
        </Button>
    );
};

export default FavoriteButton;
