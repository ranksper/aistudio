import type { Metadata, ResolvingMetadata } from "next";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Prompt } from "@/types/prompt";
import { getUserByUsername } from "@/lib/appwrite/database/users";

type Props = {
    params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const username = params.username;
    const user = await getUserByUsername(username);

    return {
        title: `${user?.name} - Ranksper AI Studio`,
        description: `Explore the public prompts created by ${user?.name}.`,
    };
}

const AuthorPage = async ({ params }: { params: { username: string } }) => {
    const { username } = params;
    const result = await getUserByUsername(username);

    if (!result) {
        notFound();
    }

    const prompts = result.prompts.filter((prompt: Prompt) => prompt.status === "published");

    return (
        <div className="m-4 flex flex-col gap-6 md:m-10 md:flex-row">
            <Card classNames={{ base: "py-5 shadow-sm border border-divider min-w-80 w-full md:w-80 h-fit" }}>
                <CardHeader className="flex-col gap-3">
                    <Avatar name={result.name} alt={result.name} size="lg" color="primary" classNames={{ base: "w-32 h-32", name: "text-4xl font-bold" }} />
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold text-default-700">{result.name}</h2>
                        <p className="text-base font-medium text-default-500">{result.profession}</p>
                    </div>
                </CardHeader>
                <CardBody className="flex columns-3 flex-row flex-wrap justify-center gap-3 lg:columns-2">
                    <Chip color="default" className="h-fit rounded-xl px-4 py-1.5">
                        <p className="text-center text-medium">Prompts</p>
                        <p className="text-center text-lg font-semibold">{result.prompts.length}</p>
                    </Chip>
                </CardBody>
                <CardFooter>
                    <p className="w-full text-center text-sm text-slate-400">{`Member Since ${new Date(result.$createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" })}`}</p>
                </CardFooter>
            </Card>
            <div className="grow">
                <div className="mb-8 w-full columns-1 gap-4 lg:columns-2 xl:columns-3 [&>div:not(:first-child)]:mt-4">
                    {result &&
                        prompts.map((prompt: Prompt) => (
                            <Card key={prompt.$id} className="rounded-xl border border-divider shadow-sm">
                                <CardHeader className="gap-2">
                                    <Avatar name={result.name} alt={result.name} size="sm" />
                                    <p>{result.name}</p>
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
            </div>
        </div>
    );
};

export default AuthorPage;
