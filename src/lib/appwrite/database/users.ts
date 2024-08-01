"use server";

import { cookies } from "next/headers";

import { createSessionClient } from "@/lib/appwrite/config";
import { CreateUser } from "@/types/user";

export async function createUser(data: CreateUser) {
    const { databases } = await createSessionClient();

    try {
        const databaseId = process.env.NEXT_APPWRITE_DATABASE as string;
        const collectionId = process.env.NEXT_APPWRITE_USERS as string;

        await databases.createDocument(databaseId, collectionId, data.id, {
            email: data.email,
            name: data.name,
            username: data.username,
        });
    } catch (error) {
        return error;
    }
}

export async function updateUserPrefs(id: string) {
    const { account, databases } = await createSessionClient();

    try {
        const databaseId = process.env.NEXT_APPWRITE_DATABASE as string;
        const collectionId = process.env.NEXT_APPWRITE_USERS as string;

        const user = await databases.getDocument(databaseId, collectionId, id);

        if (!user) {
            throw new Error("User not found");
        }

        const session = cookies().get("session")?.value as string;
        await account.client.setSession(session);

        const prefs = await account.updatePrefs({
            username: user.username,
            role: user.role,
        });

        return prefs;
    } catch (error) {
        return error;
    }
}
