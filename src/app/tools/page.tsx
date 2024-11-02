import type { Metadata } from "next";
import { Link, Card, CardHeader, CardBody, CardFooter, Avatar, Chip } from "@nextui-org/react";

import Settings from "@/../../settings.json";

export const metadata: Metadata = {
    title: "AI Tools - Ranksper AI Studio",
    description: "Explore the advanced AI tools created by the Ranksper.",
};

const ChatbotsPage = () => {
    return (
        <div className="flex flex-col gap-10 p-5">
            <div className="flex flex-col items-center justify-center py-5">
                <h1 className="text-2xl font-bold uppercase text-slate-700 dark:text-slate-100">Meet Our AI Tools</h1>
                <p className="text-slate-500 dark:text-slate-300">Advanced AI Tools will Automate Your Tasks in Seconds</p>
            </div>
            <div className="grid h-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {Settings.tools.map((chatbot, index) => (
                    <Link href={`/tools/${chatbot.url}`} key={index}>
                        <Card className="flex-row divide-x divide-divider border border-divider shadow-sm">
                            <CardHeader className="hidden w-fit sm:flex">
                                <Avatar color={chatbot.access === "Paid" ? "danger" : "success"} name={chatbot.name} alt={chatbot.name} size="lg" classNames={{ name: "font-semibold text-foreground" }} />
                            </CardHeader>
                            <CardBody className="gap-1">
                                <div className="flex gap-2">
                                    <h2 className="text-base font-semibold text-default-700">{chatbot.name}</h2>
                                    <Chip color={chatbot.access === "Paid" ? "danger" : "success"} size="sm" variant="flat">
                                        {chatbot.access}
                                    </Chip>
                                </div>
                                <p className="text-small text-default-500">{chatbot.description}</p>
                            </CardBody>
                            <CardFooter className="w-auto flex-col justify-center overflow-visible rounded-none">
                                <span className="font-medium text-default-700">{`${chatbot.accuracy} / 10`}</span> <span className="text-sm text-warning-500">Accuracy</span>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ChatbotsPage;
