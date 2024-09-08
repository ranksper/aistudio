"use client";

import DashboardBar from "@/components/Navigation/DashboardBar";

const DashboardPage = () => {
    return (
        <div className="m-4 flex flex-col gap-6 md:m-10 md:flex-row">
            <DashboardBar active="overview" />
            <div className="grow rounded-xl border border-divider bg-content1 px-3 py-2 shadow-sm"></div>
        </div>
    );
};

export default DashboardPage;
