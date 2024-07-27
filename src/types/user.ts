export type User = {
    $id: string;
    email: string;
    name: string;
    image?: URL | string;
    prefs?: {
        username: string;
        role: string;
    };
};

export type SignUp = {
    name: string;
    email: string;
    username: string;
    password: string;
};

export type SignIn = {
    email: string;
    password: string;
};

export type CreateUser = {
    id: string;
    email: string;
    name: string;
    username: string;
    image?: URL | string;
};

export type SaveUser = {
    userId: string;
    email?: string;
    name?: string;
    username?: string;
    image?: URL | string;
};
