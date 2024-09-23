"use client";

import { Pagination } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

const PaginationBar = ({ total }: { total: number }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = (page: number) => {
        router.push(`${pathname}?page=${page}`);
    };

    return <Pagination size="lg" total={total} onChange={handlePageChange} loop showControls />;
};

export default PaginationBar;
