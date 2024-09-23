"use client";

import { useState, useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import { Input, Button, Link } from "@nextui-org/react";

import { useAuthContext } from "@/context/AuthContext";

const SignUpPage = () => {
    const router = useRouter();

    const { user, loading, signUp } = useAuthContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!loading && user?.$id) {
            router.push("/");
        }
    }, [user, loading, router]);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        signUp({ email, password, name, username });
    };

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <h2 className="my-8 text-2xl font-bold">Create An Account</h2>
            <form className="flex w-80 flex-col gap-4" onSubmit={handleSignUp}>
                <Input label="Name" size="md" type="text" defaultValue={name} minLength={3} maxLength={50} onValueChange={(value: string) => setName(value)} isRequired />
                <Input label="Email" size="md" type="email" defaultValue={email} minLength={3} maxLength={100} onValueChange={(value: string) => setEmail(value)} isRequired />
                <Input label="Username" size="md" type="text" defaultValue={username} minLength={3} maxLength={16} onValueChange={(value: string) => setUsername(value)} isRequired />
                <Input label="Password" size="md" type="password" defaultValue={password} minLength={3} maxLength={50} onValueChange={(value: string) => setPassword(value)} isRequired />
                <Button type="submit" color="primary" size="md" className="my-4">
                    Register
                </Button>
            </form>
            <p className="my-8 font-medium opacity-80">
                {"Already have an account?"} <Link href="/signin">Sign In</Link>
            </p>
        </div>
    );
};

export default SignUpPage;
