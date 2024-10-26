"use client";

import { Textarea, Button, Divider, Card, CardHeader, CardBody, CardFooter, Chip, Skeleton } from "@nextui-org/react";
import { useState } from "react";
import markdownIt from "markdown-it";

import { runSEOChat } from "@/lib/gemini/chatbots/seo";
import { Chats } from "@/types/gemini";
import PromptsModal from "@/components/Modal/Prompts";

import SendIcon from "@/components/Icons/Send";

const SEOChatBotPage = () => {
    const [message, setMessage] = useState<string>("");
    const [history, setHistory] = useState<Chats>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const md = new markdownIt();

    const handleSendMessage = async (message: string) => {
        if (message.length > 0) {
            setMessage("");
            setHistory((prev) => [...prev, { role: "user", parts: [{ text: message }] }]);
            setLoading(true);

            const response = await runSEOChat(message, history);

            if (response === null) {
                const error = "I got error while processing your request. Please try again later";
                setHistory((prev) => [...prev, { role: "model", parts: [{ text: error }] }]);
                setLoading(false);
                return;
            }

            setHistory((prev) => [...prev, { role: "model", parts: [{ text: response }] }]);
            setLoading(false);
        }
    };

    const handleEnterPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage(message);
        }
    };

    return (
        <Card className="m-5 h-[calc(100dvh-105px)] border border-divider shadow-sm">
            <CardHeader className="gap-3 px-4">
                <h2 className="font-medium text-slate-700 dark:text-slate-300">Ranksper AI</h2>
                <Chip color="primary">SEO Model</Chip>
            </CardHeader>
            <Divider />
            <CardBody className="h-full shrink gap-3 overflow-y-auto">
                {history.map((chat, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        {chat.role === "user" ? (
                            <div className="ml-auto flex w-5/6 flex-col items-end gap-2 md:w-2/3">
                                <Chip color="success" variant="flat">
                                    You
                                </Chip>
                                <div className="result flex flex-col gap-3 rounded-xl bg-default-100 p-2" dangerouslySetInnerHTML={{ __html: md.render(chat.parts[0].text) }} />
                            </div>
                        ) : (
                            <div className="mr-auto flex w-5/6 flex-col items-start gap-2 md:w-2/3">
                                <Chip color="primary" variant="flat">
                                    Ranksper AI
                                </Chip>
                                <div className="result flex flex-col gap-3 rounded-xl bg-default-100 p-2" dangerouslySetInnerHTML={{ __html: md.render(chat.parts[0].text) }} />
                            </div>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="mr-auto flex w-2/4 flex-col items-start gap-2">
                        <Chip color="primary" variant="flat">
                            Ranksper AI
                        </Chip>
                        <Skeleton className="w-4/5 rounded-lg bg-default-100 dark:bg-default-100">
                            <div className="h-28 w-2/3 rounded-xl"></div>
                        </Skeleton>
                    </div>
                )}
            </CardBody>
            <Divider />
            <CardFooter className="shrink-0 grow">
                <div className="flex w-full items-end gap-3">
                    <Textarea classNames={{ base: "grow" }} placeholder="Ask something..." minRows={1} value={message} onValueChange={setMessage} onKeyDown={handleEnterPress} isDisabled={loading} />
                    <PromptsModal title="SEO Prompts" category="SEO" setMessage={setMessage} />
                    <Button color="primary" onPress={() => handleSendMessage(message)} isDisabled={loading} isIconOnly>
                        <SendIcon size={22} />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default SEOChatBotPage;
