"use server";

import { ID, Query } from "node-appwrite";
import { revalidateTag } from "next/cache";

import { createSessionClient } from "@/lib/appwrite/config";
import { CreatePrompt, Prompt, PromptList, UpdatePrompt } from "@/types/prompt";

const databaseId = process.env.NEXT_APPWRITE_DATABASE as string;
const collectionId = process.env.NEXT_APPWRITE_PROMPTS as string;

export async function createPrompt(data: CreatePrompt) {
    const { databases } = await createSessionClient();

    try {
        const result = await databases.createDocument(databaseId, collectionId, ID.unique(), data);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getPrompt(id: string) {
    const { databases } = await createSessionClient();

    try {
        const result = await databases.getDocument<Prompt>(databaseId, collectionId, id);
        return result;
    } catch (error) {
        return null;
    }
}

export async function updatePrompt(data: UpdatePrompt) {
    const { databases } = await createSessionClient();

    try {
        const result = await databases.updateDocument(databaseId, collectionId, data.$id, data);
        return result;
    } catch (error) {
        return null;
    }
}

export async function loadPrompts(limit: number, offset?: number): Promise<PromptList> {
    const { databases } = await createSessionClient();

    try {
        const count = await databases.listDocuments<Prompt>(databaseId, collectionId, [Query.limit(1), Query.select(["$id"])]);
        const result = await databases.listDocuments<Prompt>(databaseId, collectionId, [Query.limit(limit), Query.offset(offset || 0), Query.equal("status", "published")]);

        return { total: count.total, result: result.documents };
    } catch (error) {
        console.error(error);
        return { total: 0, result: [] };
    }
}

export async function getPromptsByStatus(status: string, limit: number, offset?: number): Promise<PromptList> {
    const { databases } = await createSessionClient();

    try {
        const count = await databases.listDocuments<Prompt>(databaseId, collectionId, [Query.limit(1), Query.select(["$id"]), Query.equal("status", status)]);
        const result = await databases.listDocuments<Prompt>(databaseId, collectionId, [Query.limit(limit), Query.offset(offset || 0), Query.equal("status", status)]);

        return { total: count.total, result: result.documents };
    } catch (error) {
        console.error(error);
        return { total: 0, result: [] };
    }
}

export async function getPromptsByCategory(category: string, limit: number, offset?: number): Promise<PromptList> {
    const { databases } = await createSessionClient();

    try {
        const count = await databases.listDocuments<Prompt>(databaseId, collectionId, [Query.limit(1), Query.select(["$id"]), Query.contains("categories", [category])]);
        const result = await databases.listDocuments<Prompt>(databaseId, collectionId, [Query.limit(limit), Query.offset(offset || 0), Query.contains("categories", [category])]);

        return { total: count.total, result: result.documents };
    } catch (error) {
        console.error(error);
        return { total: 0, result: [] };
    }
}
