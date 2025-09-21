// Like ENUM
export type MessageRole = "user" | "assistant" | "system";

// Like Class or Entity
export interface Message {
    id: string; // 고유 식별자
    content: string; // 메시지 내용
    role: MessageRole; // 발신자 구분
    timestamp: Date; // 전송 시간
    isTyping?: boolean; // 타이핑 중 표시
}

// Like DTO
export interface CreateMessageInput {
    content: string;
    role: MessageRole;
}
