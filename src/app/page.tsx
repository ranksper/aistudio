import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react";

const HomePage = () => {
    const reviews = [
        {
            name: "Sarah J.",
            title: "Marketing Manager",
            content: "This platform has made my job so much easier. The prompt templates are a huge help, and the chatbots are really intuitive. It feels like I have a team member on call 24/7. Love it!",
            stars: 5,
        },
        {
            name: "David L.",
            title: "Freelance Writer",
            content: "I’ve used a lot of AI tools, but this one stands out. The templates are great for breaking through writer's block, and the chatbots are super smart. Definitely a tool I rely on.",
            stars: 5,
        },
        {
            name: "Emily T.",
            title: "Small Business Owner",
            content: "This platform has been a game-changer for my business. The chatbots handle customer service like pros, and the AI resources make content creation a breeze. Worth every penny!",
            stars: 5,
        },
        {
            name: "Michael P.",
            title: "Digital Marketing Consultant",
            content: "Really impressed with this AI platform. The templates are spot-on, and the chatbots feel almost human. It's clear a lot of thought went into this product. Highly recommend!",
            stars: 5,
        },
        {
            name: "Jessica R.",
            title: "Content Strategist",
            content: "I can’t say enough good things about this platform. The AI tools are incredibly helpful, and the chatbots are seamless to work with. It’s made my job a lot smoother.",
            stars: 5,
        },
        {
            name: "Chris M.",
            title: "E-commerce Manager",
            content: "This AI platform is a must-have for e-commerce. The chatbots have improved our customer response times, and the AI content tools are super handy. A solid investment!",
            stars: 5,
        },
    ];

    const colors = ["primary", "secondary", "success", "warning", "danger"];

    return (
        <div className="h-fit grow">
            <div className="flex h-auto flex-col border-b border-divider lg:flex-row">
                <div className="my-auto grow p-5">
                    <p className="px-5 py-2 text-2xl font-bold text-slate-700 dark:text-slate-300">100+ Skills In One Platform</p>
                    <h2 className="w-fit rounded-xl border border-divider px-5 py-2 text-3xl font-black uppercase text-blue-500 md:text-5xl">Your AI Specialist</h2>

                    <p className="mt-10 grow text-justify text-lg text-slate-700 dark:text-slate-300 lg:pr-5">Ranksper AI Studio is a platform that provides AI solutions for businesses and individuals. We offer a wide range of AI services, including chatbots, prompts templates, and AI ebooks. Our platform is easy to use and requires no coding experience. With Ranksper AI Studio, you can find AI solutions quickly and easily.</p>

                    <div className="mt-10 flex gap-4">
                        <Button as={Link} color="primary" href="/prompts">
                            Get Started
                        </Button>
                        <Button as={Link} color="primary" variant="flat" href="/chatbots">
                            AI Specialists
                        </Button>
                    </div>
                </div>
                <div className="shrink-0 lg:w-2/5">
                    <Image src="/assets/images/robot.png" alt="AI Robot" classNames={{ wrapper: "h-full", img: "h-full w-auto" }} />
                </div>
            </div>

            <div className="mt-20 w-full columns-1 gap-4 p-2 lg:columns-2 xl:columns-3 [&>div:not(:first-child)]:mt-4">
                {reviews.map((review, index) => (
                    <Card key={index} className="border border-divider shadow-sm">
                        <CardHeader className="gap-3">
                            <Avatar name={review.name} alt={review.name} color={colors[Math.floor(Math.random() * colors.length)] as "primary" | "secondary" | "success" | "warning" | "danger" | "default"} />
                            <div className="flex flex-col">
                                <p className="text-md">{review.name}</p>
                                <p className="text-small text-default-500">{review.title}</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>{review.content}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <div className="flex gap-1">{[...Array(review.stars)].map((_, index) => "⭐")}</div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
