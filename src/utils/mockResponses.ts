// Rule-based 응답을 위한 키워드 매칭 시스템

interface Rule {
    keywords: string[]; // 매칭할 키워드들
    response: string; // 응답 메시지
}

// 응답 규칙 정의
const responseRules: Rule[] = [
    {
        keywords: [
            '안녕',
            '하이',
            'hello',
            'hi',
        ],
        response: '안녕하세요! 오늘 하루는 어떠신가요?',
    },
    {
        keywords: [
            '날씨',
            '오늘날씨',
            '비',
            '맑음',
        ],
        response: '날씨 정보는 아직 제공하지 못합니다. 곧 업데이트 예정입니다!',
    },
    {
        keywords: [
            '시간',
            '몇시',
            '지금',
            '몇 시',
        ],
        response: `현재 시간은 ${new Date().toLocaleTimeString('ko-KR')}입니다.`,
    },
    {
        keywords: [
            '도움',
            '도와',
            'help',
            '뭐할수',
        ],
        response:
            '저는 간단한 대화를 나눌 수 있는 챗봇입니다. 인사, 시간 문의 등을 해보세요!',
    },
    {
        keywords: [
            '이름',
            '누구',
            '너는',
        ],
        response: '저는 Rule-based 챗봇입니다. 아직 학습 중이에요!',
    },
    {
        keywords: [
            '고마워',
            '감사',
            'thanks',
            'thank',
        ],
        response:
            '도움이 되었다니 기쁩니다! 더 필요한 것이 있으면 말씀해주세요.',
    },
    {
        keywords: [
            '잘가',
            '바이',
            'bye',
            '종료',
        ],
        response: '안녕히 가세요! 좋은 하루 보내세요!',
    },
];

// 기본 응답 (매칭되는 규칙이 없을 때)
const defaultResponses = [
    '흥미로운 질문이네요! 조금 더 자세히 말씀해주시겠어요?',
    '죄송해요, 잘 이해하지 못했습니다. 다시 한 번 말씀해주시겠어요?',
    '아직 그것에 대해서는 잘 모르겠어요. 다른 질문을 해주시겠어요?',
    '좋은 질문입니다! 하지만 제가 답변드릴 수 있는 범위를 벗어났네요.',
];

/**
 * 사용자 메시지에 대한 Mock 응답 생성
 * @param userMessage 사용자가 입력한 메시지
 * @returns 규칙 기반 응답 메시지
 */
export function generateMockResponse(userMessage: string): string {
    // 메시지를 소문자로 변환하여 비교 (대소문자 구분 없이)
    const lowerMessage = userMessage.toLowerCase();

    // 규칙을 순서대로 확인하며 매칭되는 키워드 찾기
    for (const rule of responseRules) {
        const hasKeyword = rule.keywords.some((keyword) =>
            lowerMessage.includes(keyword.toLowerCase())
        );

        if (hasKeyword) {
            return rule.response;
        }
    }

    // 매칭되는 규칙이 없으면 랜덤 기본 응답
    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
    return defaultResponses[randomIndex];
}
