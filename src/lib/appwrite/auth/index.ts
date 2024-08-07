"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";

import { createSessionClient, createAdminClient } from "@/lib/appwrite/config";
import { SignUp, SignIn, SignUpResponse } from "@/types/user";
import { createUser, updateUserPrefs, getUserByUsername } from "@/lib/appwrite/database/users";

export async function currentUser() {
    const { account } = await createSessionClient();

    try {
        const session = cookies().get("session")?.value as string;
        account.client.setSession(session);

        return await account.get();
    } catch (error) {
        return null;
    }
}

export async function signUpUser(data: SignUp): Promise<SignUpResponse> {
    const { appwrite } = await createAdminClient();

    try {
        const username = await getUserByUsername(data.username);

        if (username !== null) {
            return { status: "error", code: 408, message: "Username is already taken" };
        }

        const user = await appwrite.create(ID.unique(), data.email, data.password, data.name);

        await createUser({
            id: user.$id,
            email: user.email,
            name: user.name,
            username: data.username,
        });

        await signInUser({ email: data.email, password: data.password });

        return { status: "success" };
    } catch (error: any) {
        return { status: "error", code: error.code, message: error.message || "An unexpected error occurred" };
    }
}

export async function signInUser(data: SignIn) {
    const { appwrite } = await createAdminClient();

    try {
        const session = await appwrite.createEmailPasswordSession(data.email, data.password);

        cookies().set("session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        await updateUserPrefs(session.userId);

        return session;
    } catch (error: any) {
        return { status: "error", code: error.code, message: error.message };
    }
}

export async function signOutUser() {
    const { account } = await createSessionClient();

    try {
        cookies().delete("session");
        const session = await account.deleteSession("current");

        return session;
    } catch (error: any) {
        return { status: "error", code: error.code, message: error.message };
    }
}
