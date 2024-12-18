"use client";

import { Button, Link, Avatar, Divider, Spinner, Navbar, NavbarBrand, NavbarMenu, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenuItem, Accordion, AccordionItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";

import { useState, useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useAuthContext } from "@/context/AuthContext";

import SearchModal from "../Modal/Search";
import Settings from "@/../../settings.json";

import LogoIcon from "@/components/Icons/Logo";
import SunIcon from "@/components/Icons/Sun";
import MoonIcon from "@/components/Icons/Moon";
import ChevronIcon from "@/components/Icons/Chevron";
import FlashIcon from "@/components/Icons/Flash";
import ServerIcon from "@/components/Icons/Server";
import FireIcon from "@/components/Icons/Fire";

const Navigation = () => {
    const router = useRouter();
    const { user, loading, signOut } = useAuthContext();

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const icons: { [key: string]: JSX.Element } = {
        flash: <FlashIcon className="fill-foreground/80 group-hover:fill-white" size={32} />,
        server: <ServerIcon className="fill-foreground/80 group-hover:fill-white" size={30} />,
        fire: <FireIcon className="fill-foreground/80 group-hover:fill-white" size={30} />,
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");

            if (theme === "dark" || !theme) {
                document.documentElement.classList.add("dark");
                setIsDarkMode(true);
            } else {
                document.documentElement.classList.remove("dark");
                setIsDarkMode(false);
            }
        }
    }, []);

    const toggleTheme = () => {
        if (typeof window !== "undefined") {
            if (isDarkMode) {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
                setIsDarkMode(false);
            } else {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
                setIsDarkMode(true);
            }
        }
    };

    const generateNavItems = (NavItems: any) => {
        return NavItems.map((item: any) => {
            if (item.submenu) {
                return (
                    <Dropdown key={item.name} className="mt-5 border border-divider bg-white shadow-sm dark:bg-[#0c131a]">
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button disableRipple variant="light" endContent={<ChevronIcon size={16} />} className="text-md duration-00 h-fit cursor-pointer rounded-lg px-3 py-1 text-foreground transition-colors ease-linear data-[hover=true]:bg-default-100 data-[hover=true]:opacity-80">
                                    {item.name}
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu aria-label="features" classNames={{ list: "w-fit max-w-80" }} itemClasses={{ base: "gap-4" }}>
                            {item.submenu.map((subItem: any) => {
                                return (
                                    <DropdownItem key={subItem.name} onPress={() => router.push(`${subItem.url}`)} description={subItem.description} startContent={<div className="rounded-xl border border-divider p-1.5 transition-all group-hover:border-primary group-hover:bg-primary">{icons[subItem.icon]}</div>} variant="light" className="group text-foreground data-[hover=true]:text-foreground">
                                        {subItem.name}
                                    </DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                );
            } else {
                return (
                    <NavbarItem key={item.name}>
                        <Link color="foreground" href={item.url} className="duration-00 rounded-lg px-3 py-1 transition-colors ease-linear hover:bg-default-100">
                            {item.name}
                        </Link>
                    </NavbarItem>
                );
            }
        });
    };

    const generateMobileNavItems = (NavItems: any) => {
        return NavItems.map((item: any) => {
            if (item.submenu) {
                return (
                    <Accordion key={item.name} className="-px-2 py-3" itemClasses={{ trigger: "py-0 text-xl", title: "text-xl", content: "flex flex-col gap-2 mt-1" }}>
                        <AccordionItem title={item.name}>
                            {item.submenu.map((subItem: any) => {
                                return (
                                    <Link key={subItem.name} href={subItem.url} onPress={() => setIsMenuOpen(false)} className="w-full px-2 py-0.5 text-lg text-foreground/70">
                                        {subItem.name}
                                    </Link>
                                );
                            })}
                        </AccordionItem>
                    </Accordion>
                );
            } else {
                return (
                    <NavbarMenuItem key={item.name}>
                        <Link color="foreground" href={item.url} onPress={() => setIsMenuOpen(false)} className="w-full py-3 text-xl text-foreground">
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                );
            }
        });
    };

    const AccountNavItems = (role: string | null | undefined) => {
        if (role === Settings.roles[0].name) {
            return (
                <DropdownSection className="m-0">
                    <DropdownItem onPress={() => router.push(`/author/${user?.prefs?.username}`)}>Profile</DropdownItem>
                    <DropdownItem onPress={() => router.push(`/prompts/create`)}>Create</DropdownItem>
                    <DropdownItem onPress={() => router.push(`/admin`)}>Admin</DropdownItem>
                    <DropdownItem onPress={() => router.push(`/dashboard`)}>Dashboard</DropdownItem>
                    <DropdownItem onPress={() => signOut()} color="secondary">
                        Log Out
                    </DropdownItem>
                </DropdownSection>
            );
        } else if (role === Settings.roles[1].name) {
            return (
                <DropdownSection className="m-0">
                    <DropdownItem onPress={() => router.push(`/author/${user?.prefs?.username}`)}>Profile</DropdownItem>
                    <DropdownItem onPress={() => router.push(`/prompts/create`)}>Create</DropdownItem>
                    <DropdownItem onPress={() => router.push(`/dashboard`)}>Dashboard</DropdownItem>
                    <DropdownItem onPress={() => signOut()} color="secondary">
                        Log Out
                    </DropdownItem>
                </DropdownSection>
            );
        } else {
            return (
                <DropdownSection className="m-0">
                    <DropdownItem onPress={() => signOut()} color="secondary">
                        Log Out
                    </DropdownItem>
                </DropdownSection>
            );
        }
    };

    return (
        <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} maxWidth="2xl" className="border-divider bg-white dark:bg-[#0c131a]" isBordered>
            <NavbarContent justify="start">
                {/* Logo and brand name */}
                <Link href="/">
                    <NavbarBrand className="mr-4 grow-0">
                        <LogoIcon size={32} />
                        <p className="ml-2 hidden text-2xl font-semibold text-primary md:block">RANKSPER</p>
                    </NavbarBrand>
                </Link>

                {/* Desktop navigation items */}
                <NavbarContent className="hidden gap-1 md:flex">{generateNavItems(Settings.navigation)}</NavbarContent>
            </NavbarContent>

            <NavbarContent justify="end">
                {/* Mobile menu toggle */}
                <NavbarMenuToggle className="md:hidden" />

                <div className="flex gap-1">
                    {/* Search button */}
                    <SearchModal />

                    {/* Theme toggle button */}
                    <Button isIconOnly onPress={toggleTheme} variant="light" radius="lg" className="text-default-700 dark:text-slate-400">
                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                    </Button>
                </div>

                <Divider orientation="vertical" className="mr-2 h-8" />

                {/* User session handling: if the user is logged in then show the user profile else show the login and signup buttons */}
                {loading ? (
                    <Spinner />
                ) : user ? (
                    <>
                        <Dropdown placement="bottom-end" className="mt-5 border border-divider bg-white shadow-sm dark:bg-[#0c131a]">
                            <DropdownTrigger>
                                <Avatar as="button" className="transition-transform" name={user?.name} size="sm" color="primary" />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownSection showDivider>
                                    <DropdownItem className="h-14" onPress={() => router.push("/account")} aria-label="Profile Name">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <Avatar as="button" className="transition-transform" name={user?.name} color="primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground/60">Account</p>
                                                <p className="text-base font-semibold text-foreground/80">{user.name}</p>
                                            </div>
                                        </div>
                                    </DropdownItem>
                                </DropdownSection>
                                {AccountNavItems(user.prefs?.role)}
                            </DropdownMenu>
                        </Dropdown>
                    </>
                ) : (
                    <>
                        <NavbarItem>
                            <Button onPress={() => router.push("/signin")} size="sm" className="">
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onPress={() => router.push("/signup")} size="sm" color="primary">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>

            {/* Mobile navigation menu */}
            <NavbarMenu className="gap-0 divide-y divide-default overflow-hidden border-t border-divider bg-white/70 pt-2 dark:bg-[#0c131a]/70">{generateMobileNavItems(Settings.navigation)}</NavbarMenu>
        </Navbar>
    );
};

export default Navigation;
