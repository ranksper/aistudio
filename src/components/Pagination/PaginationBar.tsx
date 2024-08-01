"use client";

import { Pagination } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";

const PaginationBar = ({ total }: { total: number }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = (page: number) => {
        router.push(`${pathname}?page=${page}`);
    };

    return <Pagination size="lg" total={total} onChange={handlePageChange} loop showControls />;
};

export default PaginationBar;
