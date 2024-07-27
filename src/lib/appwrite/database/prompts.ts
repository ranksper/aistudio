"use server";

import { ID } from "node-appwrite";

import { databases } from "@/lib/appwrite/config";
import { Prompt } from "@/types/prompt";
import { cookies } from "next/headers";

export async function createPrompt(data: Prompt) {
    try {
        const databaseId = process.env.NEXT_APPWRITE_DATABASE as string;
        const collectionId = process.env.NEXT_APPWRITE_PROMPTS as string;

        databases.client.setSession(cookies().get("session")?.value as string);
        const result = await databases.createDocument(databaseId, collectionId, ID.unique(), data);

        return result;
    } catch (error) {
        return error;
    }
}
