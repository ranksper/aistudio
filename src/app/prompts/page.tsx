import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip, Divider } from "@nextui-org/react";
import Link from "next/link";

import { loadPrompts } from "@/lib/appwrite/database/prompts";
import { PromptList, Prompt } from "@/types/prompt";
import PaginationBar from "@/components/Pagination/PaginationBar";

const PromptsPage = async ({ searchParams }: { searchParams: { page: string } }) => {
    const limit = 12;
    const offset = Number(searchParams?.page) || 1;
    const { total, result } = (await loadPrompts(limit, limit * offset - limit)) as PromptList;

    return (
        <div className="m-4 flex flex-col gap-6 md:m-10 md:flex-row">
            <Card classNames={{ base: "shadow-sm border border-divider min-w-80 w-full md:w-80 h-fit" }}>
                <CardHeader>
                    <p className="w-full text-center text-base font-medium text-default-500 dark:text-slate-400">Filters</p>
                </CardHeader>
                <CardBody>
                    <p className="w-full text-center">Not Available</p>
                </CardBody>
                <CardFooter></CardFooter>
            </Card>
            <div className="grow">
                <div className="mb-8 w-full columns-1 gap-4 lg:columns-2 xl:columns-3 [&>div:not(:first-child)]:mt-4">
                    {result.map((prompt: Prompt) => (
                        <Card key={prompt.$id} className="rounded-xl border border-divider bg-slate-50 shadow-sm dark:bg-content1">
                            <CardHeader>
                                <Link href={`/author/${prompt.user.username}`} className="flex items-center gap-2">
                                    <Avatar name={prompt.user.name} alt={prompt.user.name} size="sm" />
                                    <p>{prompt.user.name}</p>
                                </Link>
                                <Chip size="sm" color={prompt.access === "Free" ? "success" : "danger"} radius="sm" variant="flat" className="ml-auto">
                                    {prompt.access}
                                </Chip>
                            </CardHeader>
                            <Divider />
                            <CardBody className="gap-2">
                                <Link href={`/prompts/${prompt.$id}`}>
                                    <h2 className="text-lg font-semibold text-default-700 hover:text-primary-500">{prompt.title}</h2>
                                    <p className="mt-1 text-default-500">{prompt.description}</p>
                                </Link>
                                <div className="mt-1 flex gap-2">
                                    {prompt.categories.map((category) => (
                                        <Chip size="sm" key={category} color="default" radius="sm" variant="flat" classNames={{ base: "text-default-600" }} startContent={<span className="mx-1 h-2 w-2 rounded-full bg-default"></span>}>
                                            {category}
                                        </Chip>
                                    ))}
                                </div>
                            </CardBody>
                            <Divider />
                            <CardFooter className="gap-2">
                                {prompt.models.map((model) => (
                                    <Chip key={model} size="sm" color="warning" radius="sm" variant="flat">
                                        {model}
                                    </Chip>
                                ))}
                                <p className="ml-auto text-sm font-medium text-default-500">{new Date(prompt.$updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" })}</p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="flex w-full justify-center">
                    <PaginationBar total={Math.ceil(total / 10)} />
                </div>
            </div>
        </div>
    );
};

export default PromptsPage;
