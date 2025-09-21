export const TypingIndicator = () => {
    return (
        <div className="flex items-start gap-3 p-4">
            {/* 봇 아바타 */}
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
                AI
            </div>

            {/* 타이핑 애니메이션 */}
            <div className="bg-gray-200 rounded-lg px-4 py-3">
                <div className="flex gap-1">
                    <span className="typing-dot">•</span>
                    <span className="typing-dot animation-delay-200">•</span>
                    <span className="typing-dot animation-delay-400">•</span>
                </div>
            </div>
        </div>
    );
};