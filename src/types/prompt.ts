export type CreatePrompt = {
    title: string;
    description: string;
    content: string;
    access: string;
    models: string[];
    categories: string[];
    user: string;
};

export type Prompt = {
    $id: string;
    title: string;
    description: string;
    content: string;
    access: string;
    models: string[];
    categories: string[];
    status: string;
    $collectionId: string;
    $databaseId: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    user: {
        $id: string;
        name: string;
        email: string;
        username: string;
        image: URL;
        role: string;
    };
};

export type PromptList = {
    total: number;
    result: Prompt[];
};

export type UpdatePrompt = {
    $id: string;
    title?: string;
    description?: string;
    content?: string;
    access?: string;
    models?: string[];
    categories?: string[];
    status?: string;
    $createdAt?: string;
    $updatedAt?: string;
    $permissions?: string[];
    user?: {
        $id: string;
        name: string;
        email: string;
        username: string;
        image: URL;
        role: string;
    };
};
