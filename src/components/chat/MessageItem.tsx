import type { Message } from '../../types/message.ts';

interface MessageItemProps {
    message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
    const isUser = message.role === 'user';

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
        >
            <div
                className={`max-w-ws lg:max-w-md px-4 py-2 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
                {/* 메시지 내용 */}
                <p className="text-sm">{message.content}</p>
                {/* 시간 표시 */}
                <span className="text-xs opacity-70 mt-1 block">
                    {formatTime(message.timestamp)}
                </span>
                {/* 타이핑 중 표시 (optional) */}
                {message.isTyping && <span className="text-xs">...</span>}
            </div>
        </div>
    );
};
