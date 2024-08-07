export type Message = {
    role: string;
    parts: [
        {
            text: string;
        },
    ];
};

export type Chats = Message[];
