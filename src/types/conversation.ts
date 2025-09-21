import type { Message } from './message.ts';

export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateConversationInput {
    title?: string;
}
