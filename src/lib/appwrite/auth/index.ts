"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";

import { account, appwrite } from "@/lib/appwrite/config";
import { SignUp, SignIn } from "@/types/user";
import { createUser, updateUserPrefs } from "@/lib/appwrite/database/users";

export async function currentUser() {
    try {
        const session = cookies().get("session")?.value as string;
        account.client.setSession(session);

        return await account.get();
    } catch (error) {
        return null;
    }
}

export async function signUpUser(data: SignUp) {
    try {
        const user = await appwrite.create(ID.unique(), data.email, data.password, data.name).then(async (response) => {
            await createUser({
                id: response.$id,
                email: response.email,
                name: response.name,
                username: data.username,
            });
        });

        await signInUser({ email: data.email, password: data.password });

        return user;
    } catch (error) {
        return error;
    }
}

export async function signInUser(data: SignIn) {
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
    } catch (error) {
        return error;
    }
}

export async function signOutUser() {
    try {
        cookies().delete("session");
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        return error;
    }
}
