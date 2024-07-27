"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Link } from "@nextui-org/react";

import { useAuthContext } from "@/context/AuthContext";

const SignInPage = () => {
    const router = useRouter();

    const { user, loading, signIn } = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!loading && user?.$id) {
            router.push("/");
        }
    }, [user]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        signIn({ email, password });
    };

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <h2 className="my-8 text-2xl font-bold">Login to Account</h2>
            <form className="flex w-80 flex-col gap-4" onSubmit={handleSignIn}>
                <Input label="Email" size="md" type="email" defaultValue={email} onValueChange={(value: string) => setEmail(value)} isRequired />
                <Input label="Password" size="md" type="password" defaultValue={password} onValueChange={(value: string) => setPassword(value)} isRequired />
                <Button type="submit" color="primary" size="md" className="my-4">
                    Login
                </Button>
            </form>
            <p className="my-8 font-medium opacity-80">
                Don't have an account? <Link href="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default SignInPage;
