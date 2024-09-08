import { Button, useDisclosure, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Pagination, Chip } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Prompt } from "@/types/prompt";
import { getPromptsByCategory } from "@/lib/appwrite/database/prompts";
import { useAuthContext } from "@/context/AuthContext";
import { checkUserSubscription } from "@/lib/stripe/subscription";

import ServerIcon from "@/components/Icons/Server";

const PromptsModal = ({ title, category, setMessage }: { title: string; category: string; setMessage: (message: string) => void }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [subscribed, setSubscribed] = useState(false);
    const { user, loading } = useAuthContext();

    const loadPrompts = async () => {
        const response = await getPromptsByCategory(category, page * 10, (page - 1) * 10);
        setTotal(response.total);
        setPrompts(response.result);
    };

    const setUserSubscription = async () => {
        if (user && !loading) {
            const response = await checkUserSubscription(user.email);
            setSubscribed(response !== null && response.plan.active);
        }
    };

    useEffect(() => {
        loadPrompts();
    }, []);

    useEffect(() => {
        setUserSubscription();
    }, [user]);

    const insertPrompt = (prompt: Prompt) => {
        if (prompt.access === "Paid") {
            if (subscribed) {
                setMessage(prompt.content);
                toast.success("Prompt added to the input field.");
                onOpenChange();
            } else {
                toast.error("Purchase a subscription to access paid prompts.");
            }
        } else {
            setMessage(prompt.content);
            toast.success("Prompt added to the input field.");
            onOpenChange();
        }
    };

    return (
        <>
            <Button color="primary" variant="flat" onPress={onOpen} isIconOnly>
                <ServerIcon fill={"currentColor"} size={22} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        {prompts.map((prompt, index) => (
                            <Button key={index} onPress={() => insertPrompt(prompt)} color={prompt.access === "Paid" ? "danger" : "success"} variant="flat" className="h-fit justify-start p-2">
                                <p className="w-full text-wrap text-left">{prompt.title}</p>{" "}
                                <Chip variant="flat" color={prompt.access === "Paid" ? "danger" : "success"} classNames={{ base: "ml-auto hidden md:flex" }}>
                                    {prompt.access}
                                </Chip>
                            </Button>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Pagination classNames={{ base: "mx-auto" }} total={Math.ceil((total / 10) * 1)} page={page} onChange={setPage} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PromptsModal;
