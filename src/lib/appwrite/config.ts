import { Client, Account, Databases } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
    const session = cookies().get("session");

    const client = new Client()
        .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_APPWRITE_PROJECT as string)
        .setSession(session?.value as string);

    const account = new Account(client);
    const databases = new Databases(client);

    return { account, databases };
}

export async function createAdminClient() {
    const session = cookies().get("session");

    const admin = new Client()
        .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_APPWRITE_PROJECT as string)
        .setSession(session?.value as string)
        .setKey(process.env.NEXT_APPWRITE_API_KEY as string);

    const appwrite = new Account(admin);

    return { appwrite };
}
