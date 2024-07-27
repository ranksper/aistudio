import { Client, Account, Databases, ID } from "node-appwrite";
import { cookies } from "next/headers";

const session = cookies().get("session");

const client = new Client()
    .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_APPWRITE_PROJECT as string)
    .setSession(session?.value as string);

const admin = new Client()
    .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_APPWRITE_PROJECT as string)
    .setSession(session?.value as string)
    .setKey(process.env.NEXT_APPWRITE_API_KEY as string);

export const account = new Account(client);
export const appwrite = new Account(admin);
export const databases = new Databases(client);
