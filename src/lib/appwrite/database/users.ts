"use server";

import { cookies } from "next/headers";
import { Query } from "node-appwrite";

import { createSessionClient } from "@/lib/appwrite/config";
import { CreateUser, SaveUser } from "@/types/user";

const databaseId = process.env.NEXT_APPWRITE_DATABASE as string;
const collectionId = process.env.NEXT_APPWRITE_USERS as string;

export async function createUser(data: CreateUser) {
    const { databases } = await createSessionClient();

    try {
        await databases.createDocument(databaseId, collectionId, data.id, {
            email: data.email,
            name: data.name,
            username: data.username,
        });
    } catch (error) {
        return error;
    }
}

export async function updateUser(data: SaveUser) {
    const { account, databases } = await createSessionClient();

    try {
        const update = {} as SaveUser;

        if (data?.email) update.email = data.email;
        if (data?.name) update.name = data.name;
        if (data?.username) update.username = data.username;

        const user = await databases.updateDocument(databaseId, collectionId, data.userId, update);

        if (user) {
            if (data?.name) await account.updateName(data.name);
            if (data?.username) await updateUserPrefs(data.userId);
        }

        return user;
    } catch (error) {
        return null;
    }
}

export async function updateUserPrefs(id: string) {
    const { account, databases } = await createSessionClient();

    try {
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

export async function getUserByUsername(username: string) {
    const { databases } = await createSessionClient();

    try {
        const result = await databases.listDocuments(databaseId, collectionId, [Query.equal("username", username)]);

        if (result.total === 0) {
            return null;
        }

        return result.documents[0];
    } catch (error) {
        return null;
    }
}
