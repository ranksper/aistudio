import { toast } from "sonner";
import { CreatePrompt } from "@/types/prompt";

export const validatePrompt = (data: CreatePrompt): boolean => {
    let isValid = true;

    const checks = [
        { condition: data.title.length > 5, message: "Title must be at least 5 characters long" },
        { condition: data.description.length > 10, message: "Description must be at least 10 characters long" },
        { condition: data.content.length > 20, message: "Prompt must be at least 20 characters long" },
        { condition: data.access.length > 0, message: "Access is required" },
        { condition: data.models.length > 0, message: "At least one model is required" },
        { condition: data.categories.length > 0, message: "At least one category is required" },
        { condition: data.user.length > 0, message: "User is required" },
    ];

    for (const check of checks) {
        if (!check.condition) {
            isValid = false;
            toast.error(check.message);
            break;
        }
    }

    return isValid;
};
