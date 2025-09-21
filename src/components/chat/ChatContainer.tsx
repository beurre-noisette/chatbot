import { useState } from 'react';
import type { Message } from '../../types/message.ts';
import type { Conversation } from '../../types/conversation.ts';
import { MessageList } from './MessageList.tsx';
import { Sidebar } from '../layout/Sidebar.tsx';
import { TypingIndicator } from './TypingIndicator.tsx';
import { generateMockResponse } from '../../utils/mockResponses.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';

export const ChatContainer = () => {
    // 상태 관리 - LocalStorage와 동기화
    const [
        conversations,
        setConversations,
    ] = useLocalStorage<Conversation[]>('chatbot-conversations', []);

    const [
        currentConversationId,
        setCurrentConversationId,
    ] = useLocalStorage<string | null>('chatbot-current-conversation', null);

    const [
        inputValue,
        setInputValue,
    ] = useState('');

    // 타이핑 중 상태 추가
    const [isTyping, setIsTyping] = useState(false);

    // 현재 선택된 대화 찾기
    const currentConversation = conversations.find(
        (conv) => conv.id === currentConversationId
    );

    // 현재 대화의 메시지들 (없으면 빈 배열)
    const messages = currentConversation?.messages || [];

    // 새 대화 생성 함수
    const createNewConversation = () => {
        const newConversation: Conversation = {
            id: Date.now().toString(),
            title: `새 대화 ${conversations.length + 1}`,
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        setConversations(prev => [...prev, newConversation]);
        setCurrentConversationId(newConversation.id);
    };

    // 메시지 전송 핸들러
    const handleSendMessage = () => {
        const messageContent = inputValue.trim();

        if (messageContent === '') {
            return;
        }

        // 새 메시지 객체 생성
        const newMessage: Message = {
            id: Date.now().toString(),
            content: messageContent,
            role: 'user',
            timestamp: new Date(),
        };

        // 사용할 대화 ID 결정
        let targetConversationId = currentConversationId;
        const conversationExists = conversations.find(c => c.id === targetConversationId);

        if (!targetConversationId || !conversationExists) {
            // 새 대화 생성
            targetConversationId = Date.now().toString();
            const newConv: Conversation = {
                id: targetConversationId,
                title: messageContent.slice(0, 30) + (messageContent.length > 30 ? '...' : ''),
                messages: [newMessage],
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            setConversations(prev => [...prev, newConv]);
            setCurrentConversationId(targetConversationId);
        } else {
            // 기존 대화에 메시지 추가
            setConversations(prevConversations =>
                prevConversations.map(conv => {
                    if (conv.id === targetConversationId) {
                        return {
                            ...conv,
                            messages: [...conv.messages, newMessage],
                            updatedAt: new Date(),
                        };
                    }
                    return conv;
                })
            );
        }

        // 입력 필드 초기화
        setInputValue('');

        // 타이핑 시작
        setIsTyping(true);

        // 봇 응답 시뮬레이션 (1.5초 후)
        const convIdForBot = targetConversationId;
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: generateMockResponse(messageContent),
                role: 'assistant',
                timestamp: new Date(),
            };

            setConversations(prevConversations =>
                prevConversations.map(conv => {
                    if (conv.id === convIdForBot) {
                        return {
                            ...conv,
                            messages: [...conv.messages, botResponse],
                            updatedAt: new Date(),
                        };
                    }
                    return conv;
                })
            );

            // 타이핑 종료
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* 사이드바 */}
            <Sidebar
                conversations={conversations}
                currentConversationId={currentConversationId}
                onSelectConversation={setCurrentConversationId}
                onNewConversation={createNewConversation}
            />

            {/* 메인 채팅 영역 */}
            <div className="flex-1 flex flex-col">
                {/* 헤더 */}
                <div className="bg-white border-b px-6 py-4">
                    <h1 className="text-xl font-semibold">
                        {currentConversation?.title || 'Rule based chatbot'}
                    </h1>
                </div>

                {/* 메시지 리스트 */}
                <div className="flex-1 overflow-y-auto">
                    {conversations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p className="text-lg mb-4">대화를 시작하려면</p>
                            <p>아래에 메시지를 입력하거나</p>
                            <p>왼쪽 사이드바에서 "새 대화"를 클릭하세요</p>
                        </div>
                    ) : (
                        <>
                            <MessageList messages={messages} />
                            {isTyping && <TypingIndicator />}
                        </>
                    )}
                </div>

                {/* 입력 영역 */}
                <div className="border-t bg-white p-4">
                    <div className="max-w-4xl mx-auto flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
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
        </div>
    );
};
