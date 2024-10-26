import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Spinner, Chip, Link, Pagination } from "@nextui-org/react";
import { searchPrompts } from "@/lib/appwrite/database/prompts";
import SearchIcon from "@/components/Icons/Search";
import { useEffect, useState } from "react";
import { Prompt } from "@/types/prompt";

const SearchModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [searching, setSearching] = useState(false);
    const [text, setText] = useState("");
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [prompts, setPrompts] = useState<Prompt[]>([]);

    const findPrompts = async () => {
        setSearching(true);
        if (!text) {
            setSearching(false);
            return;
        }
        const response = await searchPrompts(text, page * 3, (page - 1) * 3);
        setPrompts(response.result);
        console.log(Math.ceil(response.total / 1));
        setTotal(response.total);
        setSearching(false);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        findPrompts();
    };

    useEffect(() => {
        findPrompts();
    }, [page]);

    return (
        <>
            <Button onPress={onOpen} className="bg-transparent" isIconOnly>
                <SearchIcon className="text-default-700 dark:text-slate-400" size={20} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ closeButton: "z-10 top-2 right-1.5" }} size="lg">
                <ModalContent>
                    <ModalHeader className="border-b border-divider p-1">
                        <form onSubmit={handleSearch} className="w-full">
                            <Input value={text} onValueChange={setText} placeholder="Search prompts..." startContent={<SearchIcon className="text-default-700 dark:text-slate-400" size={20} />} classNames={{ inputWrapper: "pr-8 bg-transparent group-data-[focus=true]:bg-transparent data-[hover=true]:bg-transparent shadow-none" }} />
                            <Button type="submit" className="hidden" />
                        </form>
                    </ModalHeader>
                    <ModalBody className="p-5">
                        {searching && (
                            <div className="flex items-center justify-center">
                                <Spinner color="primary" />
                            </div>
                        )}
                        {!searching && prompts.length > 0 && (
                            <div className="grid grid-cols-1 gap-4">
                                {prompts.map((prompt, index) => (
                                    <Link key={index} href={`/prompts/${prompt.$id}`}>
                                        <div className="w-full rounded-xl border border-divider p-2">
                                            <h4 className="w-full text-wrap text-left text-large font-semibold text-default-700">{prompt.title}</h4>
                                            <p className="mt-0.5 text-small font-medium text-default-600">{prompt.description}</p>
                                            <div className="mt-2 flex justify-between">
                                                <Chip variant="flat" color={prompt.access === "Paid" ? "danger" : "success"} size="sm">
                                                    {prompt.access}
                                                </Chip>
                                                <div className="flex gap-2">
                                                    {prompt.categories.map((category, index) => (
                                                        <Chip key={index} variant="flat" color="secondary" size="sm">
                                                            {category}
                                                        </Chip>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {!searching && prompts.length === 0 && (
                            <div className="flex items-center justify-center py-4">
                                <p className="text-default-700 dark:text-slate-400">No results found.</p>
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter className={`${total > 3 ? "" : "hidden"}`}>
                        <Pagination classNames={{ base: "mx-auto" }} total={Math.ceil(total / 3)} page={page} onChange={setPage} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SearchModal;
