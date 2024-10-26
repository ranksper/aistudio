"use client";

import { Table, TableBody, TableCell, TableColumn, TableRow, TableHeader, Avatar, Button, Link, Spinner, Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import AdminBar from "@/components/Navigation/AdminBar";
import { Prompt } from "@/types/prompt";
import { getPromptsByStatus, updatePrompt } from "@/lib/appwrite/database/prompts";

const AdminSubmissionPage = () => {
    const [data, setData] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const limit = 10;

    const loadData = async (limit: number, offset: number) => {
        setLoading(true);
        const response = await getPromptsByStatus("pending", limit, offset);
        setData(response.result);
        setTotal(response.total);
        setLoading(false);
        setHasMore(response.result.length < limit);
    };

    const handleApprove = async (id: string) => {
        const result = await updatePrompt({ $id: id, status: "published" });
        if (result !== null) {
            setData(data.filter((prompt) => prompt.$id !== id));
            toast.success("Prompt approved successfully");
        } else {
            toast.error("Failed to approve prompt");
        }
    };

    const handleReject = async (id: string) => {
        const result = await updatePrompt({ $id: id, status: "rejected" });
        if (result !== null) {
            setData(data.filter((prompt) => prompt.$id !== id));
            toast.success("Prompt rejected successfully");
        } else {
            toast.error("Failed to reject prompt");
        }
    };

    const renderData = () => {
        return data.map((prompt) => {
            return (
                <TableRow key={prompt.$id} className="min-w-90">
                    <TableCell>
                        <Link className="text-sm" href={`/prompts/${prompt.$id}`}>
                            {prompt.title}
                        </Link>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                        <Avatar size="sm" name={prompt.user.name} /> {prompt.user.name}
                    </TableCell>
                    <TableCell>{new Date(prompt.$updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" })}</TableCell>
                    <TableCell>
                        <Button size="sm" color="success" variant="flat" className="mx-1 px-2" onPress={() => handleApprove(prompt.$id)}>
                            Approve
                        </Button>
                        <Button size="sm" color="danger" variant="flat" className="mx-1 px-2" onPress={() => handleReject(prompt.$id)}>
                            Reject
                        </Button>
                    </TableCell>
                </TableRow>
            );
        });
    };

    useEffect(() => {
        loadData(limit, (page - 1) * limit);
    }, [page, hasMore && data.length < 5]);

    return (
        <div className="m-4 flex flex-col gap-6 md:m-10 md:flex-row">
            <AdminBar active="submissions" />
            <Table aria-label="submissions" classNames={{ wrapper: "border border-divider shadow-sm", thead: "[&>tr]:first:shadow-none", td: "whitespace-nowrap" }} bottomContent={data.length >= 1 && <Pagination size="sm" classNames={{ base: "mx-auto" }} page={page} onChange={setPage} total={Math.ceil(total / limit)} loop showControls />}>
                <TableHeader>
                    <TableColumn>Title</TableColumn>
                    <TableColumn>User</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No Submissions"} isLoading={loading} loadingContent={<Spinner />}>
                    {renderData()}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminSubmissionPage;
