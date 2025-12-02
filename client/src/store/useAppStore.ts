import { create } from 'zustand';

interface AppState {
    inkLevel: number;
    cursorVariant: 'default' | 'hover' | 'text' | 'drawing';
    isAuthenticated: boolean;
    user: { name: string } | null;

    setInkLevel: (level: number) => void;
    setCursorVariant: (variant: 'default' | 'hover' | 'text' | 'drawing') => void;
    login: (username: string) => void;
    logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    inkLevel: 0,
    cursorVariant: 'default',
    isAuthenticated: false,
    user: null,

    setInkLevel: (level) => set({ inkLevel: level }),
    setCursorVariant: (variant) => set({ cursorVariant: variant }),
    login: (username) => set({ isAuthenticated: true, user: { name: username } }),
    logout: () => set({ isAuthenticated: false, user: null }),
}));
