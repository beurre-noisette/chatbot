import { useState, useEffect } from 'react';

/**
 * LocalStorage와 동기화된 상태를 관리하는 커스텀 훅
 * @param key LocalStorage 키
 * @param initialValue 초기값
 * @returns [값, setter 함수] 튜플
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
    // LocalStorage에서 초기값 읽기
    const [
        storedValue,
        setStoredValue,
    ] = useState<T>(() => {
        try {
            // LocalStorage에서 아이템 가져오기
            const item = window.localStorage.getItem(key);
            if (!item) return initialValue;

            // Date 문자열을 Date 객체로 복원하는 reviver
            const parsed = JSON.parse(item, (key, value) => {
                // ISO 날짜 형식 문자열을 Date 객체로 변환
                if (
                    typeof value === 'string' &&
                    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)
                ) {
                    return new Date(value);
                }
                return value;
            });

            return parsed;
        } catch (error) {
            console.error(`LocalStorage 읽기 오류 (${key}):`, error);
            return initialValue;
        }
    });

    // 값이 변경될 때마다 LocalStorage에 저장
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(`LocalStorage 저장 오류 (${key}):`, error);
        }
    }, [key, storedValue]);

    // 값을 설정하는 함수 (LocalStorage 저장은 useEffect에서 처리)
    const setValue = (value: T | ((prev: T) => T)) => {
        setStoredValue(value);
    };

    return [
        storedValue,
        setValue,
    ];
}
