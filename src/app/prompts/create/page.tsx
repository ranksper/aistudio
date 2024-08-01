"use client";

import { Button, Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Textarea, cn } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuthContext } from "@/context/AuthContext";
import { createPrompt } from "@/lib/appwrite/database/prompts";
import { validatePrompt } from "@/lib/validation/prompt";

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

const PromptCreatePage = () => {
    const router = useRouter();
    const { user, loading } = useAuthContext();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [access, setAccess] = useState("Free");
    const [models, setModels] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        if (!(user?.prefs?.role === Settings.roles[0].name || user?.prefs?.role === Settings.roles[1].name) && !loading) {
            router.back();
        }
    }, [user, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { title, description, content, access, models, categories, user: user?.$id as string };

        const isValid = validatePrompt(data);

        if (isValid) {
            const result: any = await createPrompt(data);

            if (result.$id) {
                toast.success("Prompt created successfully");
                router.push(`/prompts/${result.$id}`);
            } else {
                toast.error("An error occurred while creating the prompt");
            }
        }
    };

    return (
        <div className="container m-auto max-w-xl px-4 py-10">
            <h2 className="mb-8 text-center text-2xl font-bold uppercase">Create Prompt</h2>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <Input label="Title" size="md" defaultValue={title} onValueChange={(value) => setTitle(value)} maxLength={60} isRequired />
                <Input label="Description" size="md" defaultValue={description} onValueChange={(value) => setDescription(value)} maxLength={160} isRequired />
                <Textarea label="Prompt" size="md" defaultValue={content} onValueChange={(value) => setContent(value)} classNames={{ inputWrapper: "h-auto" }} isRequired />

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
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default PromptCreatePage;
