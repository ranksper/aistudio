"use client";

import { Textarea, Button, Spinner, Divider } from "@nextui-org/react";
import { useState } from "react";
import markdownIt from "markdown-it";
import { generatePrompt } from "@/lib/gemini/tools/prompts";

const PromptGeneratorPage = () => {
    const [message, setMessage] = useState("");
    const [prompt, setPrompt] = useState("Result will be displayed here.");
    const [loading, setLoading] = useState(false);

    const md = new markdownIt({
        html: true,
        breaks: true,
    });

    const handleGeneratePrompt = async () => {
        if (message.length < 3 || message.length > 1000) return;
        setLoading(true);
        const result = await generatePrompt(message);
        setPrompt(result);
        setLoading(false);
    };

    return (
        <div className="mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center px-6">
            <h1 className="my-8 text-center text-xl font-extrabold uppercase tracking-wide sm:text-4xl">AI Prompt Generator</h1>
            <Textarea placeholder="Explain your prompt here..." value={message} onValueChange={setMessage} />
            <Button className="my-4 w-full sm:w-fit" color="primary" onPress={handleGeneratePrompt}>
                {loading ? <Spinner color="default" /> : "Generate Magic"}
            </Button>

            <div className="mt-10 flex w-full items-center justify-between gap-4">
                <Divider className="flex flex-1" />
                <span className="uppercase text-default-500">Your Prompt</span>
                <Divider className="flex flex-1" />
            </div>

            <div className="result mt-4 flex w-full flex-col gap-3 rounded-xl border border-divider bg-content1 p-5" dangerouslySetInnerHTML={{ __html: loading ? "Result will be displayed here." : md.render(prompt) }}></div>
        </div>
    );
};

export default PromptGeneratorPage;
