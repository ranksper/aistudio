"use client";

import { Button, Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Textarea, cn } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { notFound } from "next/navigation";
import { toast } from "sonner";

import { useAuthContext } from "@/context/AuthContext";
import { getPrompt, updatePrompt } from "@/lib/appwrite/database/prompts";
import { validatePromptUpdate } from "@/lib/validation/prompt";
import Settings from "@/../../settings.json";

type CustomRadioProps = {
    children: React.ReactNode;
    value: string;
    description?: string;
};

type CustomCheckboxProps = {
    value: string;
};

const CustomRadio: React.FC<CustomRadioProps> = ({ children, ...props }) => (
    <Radio
        {...props}
        classNames={{
            base: cn("inline-flex max-w-full md:max-w-fit w-full m-0 bg-default-100 hover:bg-default-200 items-center justify-between", "flex-row-reverse min-w-fit cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent", "data-[selected=true]:border-primary"),
        }}
    >
        {children}
    </Radio>
);

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ value }) => (
    <Checkbox
        classNames={{
            base: cn("inline-flex w-full bg-default-100 m-0", "hover:bg-default-200 items-center justify-start", "cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent", "data-[selected=true]:border-primary"),
            label: "w-full",
        }}
        value={value}
    >
        {value}
    </Checkbox>
);

type Props = {
    params: { id: string };
};

const PromptEditPage = ({ params }: Props) => {
    const router = useRouter();
    const { user, loading } = useAuthContext();
    const id = params.id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [access, setAccess] = useState("Free");
    const [models, setModels] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        if (id && user) {
            const fetchPrompt = async () => {
                const prompt = await getPrompt(id as string);

                if (prompt) {
                    if (prompt.user.$id !== user?.$id) {
                        toast.error("You do not have permission to edit this prompt");
                        notFound();
                    }

                    setTitle(prompt.title);
                    setDescription(prompt.description);
                    setContent(prompt.content);
                    setAccess(prompt.access);
                    setModels(prompt.models);
                    setCategories(prompt.categories);
                } else {
                    toast.error("Prompt not found");
                    notFound();
                }
            };

            fetchPrompt();
        }
    }, [id, user]);

    useEffect(() => {
        if (!(user?.prefs?.role === Settings.roles[0].name || user?.prefs?.role === Settings.roles[1].name) && !loading) {
            router.back();
        }
    }, [user, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { $id: id as string, title, description, content, access, models, categories };

        const isValid = validatePromptUpdate(data);

        if (isValid) {
            const result: any = await updatePrompt(data);

            if (result.$id) {
                toast.success("Prompt updated successfully");
                router.push(`/prompts/${result.$id}`);
            } else {
                toast.error("An error occurred while updating the prompt");
            }
        }
    };

    return (
        <div className="container m-auto max-w-xl px-4 py-10">
            <h2 className="mb-8 text-center text-2xl font-bold uppercase">Edit Prompt</h2>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <Input label="Title" size="md" value={title} onValueChange={(value) => setTitle(value)} maxLength={60} isRequired />
                <Input label="Description" size="md" value={description} onValueChange={(value) => setDescription(value)} maxLength={160} isRequired />
                <Textarea label="Prompt" size="md" value={content} onValueChange={(value) => setContent(value)} classNames={{ inputWrapper: "h-auto" }} isRequired />

                <RadioGroup orientation="horizontal" label="Access" className="mt-2" value={access} onValueChange={setAccess}>
                    {Settings.access.map((access) => (
                        <CustomRadio key={access.name} description={access.description} value={access.name}>
                            {access.name}
                        </CustomRadio>
                    ))}
                </RadioGroup>

                <CheckboxGroup size="sm" orientation="horizontal" className="mt-2" label="Models" classNames={{ base: "w-full" }} value={models} onChange={setModels}>
                    {Settings.models.map((model) => (
                        <CustomCheckbox key={model.name} value={model.name} />
                    ))}
                </CheckboxGroup>

                <CheckboxGroup size="sm" orientation="horizontal" className="mt-2" label="Categories" classNames={{ base: "w-full" }} value={categories} onChange={setCategories}>
                    {Settings.categories.map((category) => (
                        <CustomCheckbox key={category.name} value={category.name} />
                    ))}
                </CheckboxGroup>

                <Button type="submit" size="lg" color="primary" className="mt-4">
                    Save
                </Button>
            </form>
        </div>
    );
};

export default PromptEditPage;
