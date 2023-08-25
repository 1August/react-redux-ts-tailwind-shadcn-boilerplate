import { useState } from 'react';

export type SetValue<T> = (newValue: T) => void

export type UseLocalStorage<T> = (props: UseLocalStorageProps<T>) => UseLocalStorageReturnType<T>

export type UseLocalStorageReturnType<T> = [storedValue: T, setValue: SetValue<T>]

export type UseLocalStorageProps<T> = {
    keyName: string
    defaultValue: T | null
}

export const useLocalStorage = <T, >(keyName: string, defaultValue: T): UseLocalStorageReturnType<T> => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = localStorage.getItem(keyName);

            if (!value) {
                localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }

            return JSON.parse(value);
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue: T) => {
        try {
            localStorage.setItem(keyName, JSON.stringify(newValue))
        } catch (err) {
            throw new Error('Something happened when saving into local storage')
        }

        setStoredValue(newValue)
    }

    return [storedValue, setValue];
};
