import type { Conversation } from '../../types/conversation';

interface SidebarProps {
    conversations: Conversation[];
    currentConversationId: string | null;
    onSelectConversation: (id: string) => void;
    onNewConversation: () => void;
    onDeleteConversation: (id: string) => void;
}

export const Sidebar = ({
    conversations,
    currentConversationId,
    onSelectConversation,
    onNewConversation,
    onDeleteConversation,
}: SidebarProps) => {
    return (
        <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
            {/* 새 대화 버튼 */}
            <button
                onClick={onNewConversation}
                className="m-4 p-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
            >
                + 새 대화
            </button>

            {/* 대화 목록 */}
            <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                    <div className="text-gray-500 text-center mt-8 px-4">
                        대화가 없습니다
                    </div>
                ) : (
                    <div className="space-y-2 px-2">
                        {conversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                className={`group relative rounded-lg transition-colors ${
                                    conversation.id === currentConversationId
                                        ? 'bg-gray-700'
                                        : 'hover:bg-gray-800'
                                }`}
                            >
                                <button
                                    onClick={() => onSelectConversation(conversation.id)}
                                    className="w-full text-left p-3 pr-10"
                                >
                                    <div className="truncate">{conversation.title}</div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        {conversation.messages.length}개의 메시지
                                    </div>
                                </button>

                                {/* 삭제 버튼 */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm('이 대화를 삭제하시겠습니까?')) {
                                            onDeleteConversation(conversation.id);
                                        }
                                    }}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2
                                             opacity-0 group-hover:opacity-100 transition-opacity
                                             w-6 h-6 flex items-center justify-center
                                             hover:bg-red-600 rounded text-xs"
                                    title="대화 삭제"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};