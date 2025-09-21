import { useState } from 'react';
import type { Message } from '../../types/message.ts';
import { MessageList } from './MessageList.tsx';

export const ChatContainer = () => {
    // 상태 관리
    const [
        messages,
        setMessages,
    ] = useState<Message[]>([]);

    const [
        inputValue,
        setInputValue,
    ] = useState('');

    // 메시지 전송 핸들러
    const handleSendMessage = () => {
        if (inputValue.trim() === '') {
            return;
        }

        // 새 메시지 객체 생성
        const newMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            role: 'user',
            timestamp: new Date(),
        };

        // 메시지 배열 업데이트
        setMessages([
            ...messages,
            newMessage,
        ]);

        // 입력 필드 초기화
        setInputValue('');

        // 봇 응답 시뮬레이션 (1초 후)
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: '안녕하세요! 무엇을 도와드릴까요?',
                role: 'assistant',
                timestamp: new Date(),
            };
            setMessages((prev) => [
                ...prev,
                botResponse,
            ]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-screen max-w-4xl mx-auto">
            {/* 헤더 */}
            <div className="bg-gray-800 text-white p-4">
                <h1 className="text-xl font-bold">Rule based chatbot</h1>
            </div>

            {/* 메시지 리스트 */}
            <MessageList messages={messages} />

            {/* 입력 영역 */}
            <div className="border-t p-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' && handleSendMessage()
                        }
                        placeholder="메시지를 입력하세요"
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
};
