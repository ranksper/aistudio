"use client";

import { Button, Chip, Input, Spinner, Tab, Tabs } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { useAuthContext } from "@/context/AuthContext";
import { updateUser } from "@/lib/appwrite/database/users";
import { checkUserSubscription } from "@/lib/stripe/subscription";

const AccountPage = () => {
    const router = useRouter();
    const { user, loading, setCurrentUser } = useAuthContext();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const [oldName, setOldName] = useState<string>("");
    const [oldEmail, setOldEmail] = useState<string>("");
    const [oldUsername, setOldUsername] = useState<string>("");

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

    useEffect(() => {
        if (!loading && !user?.$id) {
            router.push("/");
        }
    }, [user, loading, router]);

    const checkUserPlan = async () => {
        if (user) {
            const subscription = await checkUserSubscription(user?.email);
            setIsSubscribed(subscription !== null && subscription.plan.active);
        }
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setOldName(user.name);
            setEmail(user.email);
            setOldEmail(user.email);

            if (user.prefs) {
                setUsername(user.prefs.username);
                setOldUsername(user.prefs.username);
            }

            checkUserPlan();
        }
    }, [user]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);

        setName(oldName);
        setEmail(oldEmail);
        setUsername(oldUsername);
    };

    const handleSave = async () => {
        setIsSaving(true);

        if (name === oldName && email === oldEmail && username === oldUsername) {
            toast.error("No changes detected");
            setIsSaving(false);
            return;
        }

        if (user) {
            const response = await updateUser({
                userId: user?.$id,
                name: name,
                email: email,
                username: username,
            });

            if (response !== null) {
                toast.success("Profile updated successfully");
                setCurrentUser();
                setIsEditing(false);
            } else {
                toast.error("An unexpected error occurred");
                setIsEditing(true);
            }
        }

        setIsSaving(false);
    };

    return (
        <div className="flex flex-col items-center p-5">
            <Tabs size="lg" classNames={{ panel: "w-full max-w-xl" }}>
                <Tab key="details" title="Details" className="flex flex-col gap-4">
                    <div className="mt-4 flex justify-between">
                        <h2 className="font-semibold">Profile Details</h2>
                        <div className="flex gap-4">
                            {!isEditing ? (
                                <Button size="sm" color="danger" onPress={() => handleEdit()}>
                                    Edit
                                </Button>
                            ) : (
                                <>
                                    <Button size="sm" onPress={() => handleCancel()}>
                                        Cancel
                                    </Button>
                                    <Button size="sm" color="primary" onPress={() => handleSave()}>
                                        {isSaving ? <Spinner color="default" size="sm" /> : "Save"}
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    <Input label="Email" value={email} onValueChange={setEmail} isDisabled />
                    <Input label="Name" value={name} onValueChange={setName} isDisabled={!isEditing} />
                    <Input label="Username" placeholder="Not Set" value={username} onValueChange={setUsername} isDisabled={!isEditing} />
                </Tab>

                <Tab key="premium" title="Premium">
                    <div className="flex flex-col gap-4 rounded-xl border border-divider p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-foreground">Paid Plan</h2>
                            {isSubscribed ? (
                                <Chip color="success" variant="flat">
                                    Active
                                </Chip>
                            ) : (
                                <Chip color="danger" variant="flat">
                                    Inactive
                                </Chip>
                            )}
                        </div>
                        <p className="text-justify text-default-500">{isSubscribed ? "You have an active subscription. Thank you for being a premium member. You can check your subscription details in our customer portal." : "You do not have an active subscription. Subscribe to a plan to unlock premium features."}</p>
                        {isSubscribed ? (
                            <Button color="primary" as={Link} href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL}>
                                Manage Plan
                            </Button>
                        ) : (
                            <Button color="primary" as={Link} href="/pricing">
                                Purchase Plan
                            </Button>
                        )}
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default AccountPage;
