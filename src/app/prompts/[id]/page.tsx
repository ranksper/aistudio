import type { Metadata, ResolvingMetadata } from "next";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import Script from "next/script";
import Link from "next/link";

import { currentUser } from "@/lib/appwrite/auth";
import { getPrompt } from "@/lib/appwrite/database/prompts";
import { checkUserSubscription } from "@/lib/stripe/subscription";
import { Prompt } from "@/types/prompt";

import CopyButton from "@/components/Buttons/Copy";
import FavoriteButton from "@/components/Buttons/Favorite";

import CopyIcon from "@/components/Icons/Copy";
import HeartIcon from "@/components/Icons/Heart";

type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = params.id;
    const data: Prompt | null = await getPrompt(id);

    return {
        title: `${data?.title}`,
        description: `${data?.description}`,
    };
}

const PromptContentPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const data: Prompt | null = await getPrompt(id);
    const user = await currentUser();
    const subscription = user ? await checkUserSubscription(user.email) : null;
    const agent = await userAgent({ headers: headers() });

    if ((data === null || data.status !== "published") && (data?.user.$id !== user?.$id || user?.prefs.role !== "admin")) {
        notFound();
    }

    const generateContent = () => {
        if (data?.access === "premium") {
            if ((subscription !== null && subscription.plan.product === process.env.NEXT_STRIPE_PREMIUM_PASS_ID) || agent.isBot || data.user.$id === user?.$id || user?.prefs.role === "admin") {
                return <p className="paywall text-base text-default-600 md:text-lg" dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, "<br/>") }}></p>;
            } else {
                return (
                    <>
                        <p className="mb-2 text-base text-default-600 md:text-lg">{data.content.slice(0, 200)}...</p>
                        <div className="relative mb-2">
                            <p className="absolute top-0 h-full w-full overflow-hidden p-2 text-justify leading-loose">
                                {"Congratulations on taking the first step! But wait, there's more! Unlock the full potential of this prompt and dive deeper into the intricate details. Our premium plan offers exclusive access to the complete prompt, including advanced strategies, specific use cases, and a plethora of potential variations tailored to enhance your creative output. Maximize the impact of your content and explore the boundless possibilities with a full subscription."}
                            </p>
                            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-divider p-4 backdrop-blur">
                                <p className="font-medium">Prompt is for paid users only. Subscribe to see the full prompts and unlock exclusive content.</p>
                                <Button as={Link} href="/pricing" color="primary">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </>
                );
            }
        } else {
            return data && <p className="text-base text-default-600 md:text-lg" dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, "<br/>") }}></p>;
        }
    };

    const generateButtons = () => {
        if (data?.access === "premium") {
            if ((subscription !== null && subscription.plan.product === process.env.NEXT_STRIPE_PREMIUM_PASS_ID) || agent.isBot || data.user.$id === user?.$id || user?.prefs.role === "admin") {
                return (
                    <CopyButton text={data.content} size="sm" color="primary" variant="flat" className="px-2">
                        <CopyIcon size={18} /> Copy
                    </CopyButton>
                );
            } else {
                return null;
            }
        } else {
            return (
                data && (
                    <CopyButton text={data.content} size="sm" color="default" variant="flat" className="px-2 text-default-700">
                        <CopyIcon size={18} /> Copy
                    </CopyButton>
                )
            );
        }
    };

    return (
        data && (
            <div className="m-4 flex flex-col gap-6 md:m-10 md:flex-row">
                <Card classNames={{ base: "shadow-sm border border-divider min-w-80 w-full md:w-80 h-fit" }}>
                    <CardHeader className="gap-4">
                        <Avatar color="primary" size="lg" name={data.user.name} />
                        <div>
                            <h3 className="text-lg font-semibold leading-6 text-default-700">{data.user.name}</h3>
                            <p className="text-sm leading-5 text-default-400">Prompt Engineer</p>
                        </div>
                        <Button size="sm" color="primary" className="ml-auto" as={Link} href={`/author/${data.user.username}`}>
                            Profile
                        </Button>
                    </CardHeader>
                </Card>

                <Card classNames={{ base: "grow shadow-sm border border-divider px-3 py-2" }}>
                    <CardHeader className="flex-col items-start">
                        <h1 className="text-lg font-semibold text-default-700 md:text-xl">{data.title}</h1>
                        <p className="text-sm text-default-500 md:text-base">{data.description}</p>
                    </CardHeader>
                    <Divider />
                    <CardBody>{generateContent()}</CardBody>
                    <Divider />
                    <CardFooter className="mt-1 gap-2">
                        {generateButtons()}
                        <FavoriteButton data={data} size="sm" color={"default"} variant="flat" className="px-2 text-default-700">
                            <HeartIcon size={18} /> Favorite
                        </FavoriteButton>
                    </CardFooter>
                </Card>

                <Script id="paywall-schema" type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: data.title,
                        description: data.description,
                        datePublished: data.$createdAt,
                        dateModified: data.$updatedAt,
                        author: {
                            "@type": "Person",
                            name: data.user.name,
                            url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/author/${data.user.username}`,
                        },
                        isAccessibleForFree: data.access === "Free",
                        hasPart: {
                            "@type": "WebPageElement",
                            isAccessibleForFree: data.access === "Free",
                            cssSelector: ".paywall",
                        },
                    })}
                </Script>
            </div>
        )
    );
};

export default PromptContentPage;
