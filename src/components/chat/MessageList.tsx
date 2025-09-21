import type { Message } from '../../types/message.ts';
import { MessageItem } from './MessageItem.tsx';

interface MessageListProps {
    messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* 메시지가 없을 때 */}
            {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                    대화를 시작해보세요.
                </div>
            ) : (
                // 메시지 목록 렌더링
                messages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                ))
            )}
        </div>
    );
};
