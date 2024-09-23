"use client";

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

import Settings from "@/../../settings.json";

const AdminBar = ({ active }: { active: string }) => {
    const router = useRouter();
    const { user, loading } = useAuthContext();

    useEffect(() => {
        if (!(user?.prefs?.role === Settings.roles[0].name) && !loading) {
            router.push("/");
        }
    }, [user, loading, router]);

    const renderPromptsMenu = () => {
        return Settings.adminbar[0].submenu.map((item) => {
            return (
                <Button key={item.name} as={Link} href={active !== item.active ? item.url : ""} color={active === item.active ? "primary" : "default"} className={`${active !== item.active ? "bg-default-100 dark:bg-slate-700" : ""}`}>
                    {item.name}
                </Button>
            );
        });
    };

    return (
        <Card classNames={{ base: "shadow-sm border border-divider min-w-80 w-full md:w-80 h-fit" }}>
            <CardHeader>
                <p className="w-full text-center text-base font-medium text-default-500 dark:text-slate-400">Menus</p>
            </CardHeader>
            <CardBody className="gap-3">{renderPromptsMenu()}</CardBody>
        </Card>
    );
};

export default AdminBar;
