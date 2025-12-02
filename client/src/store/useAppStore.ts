import { create } from 'zustand';

interface AppState {
    activeView: string;
    /* 
     * Leo's Diary:
     * "Ink Level" tracks how much chaos we've unleashed on the page.
     * As you interact, the ink flows.
     */
    inkLevel: number;
    cursorVariant: 'default' | 'hover' | 'text' | 'drawing';
    isAuthenticated: boolean;
    user: { name: string } | null;

    setActiveView: (view: string) => void;
    setInkLevel: (level: number) => void;
    setCursorVariant: (variant: 'default' | 'hover' | 'text' | 'drawing') => void;
    login: (username: string) => void;
    logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    activeView: 'dashboard',
    inkLevel: 0,
    cursorVariant: 'default',
    isAuthenticated: false,
    user: null,

    setActiveView: (view) => set({ activeView: view }),
    setInkLevel: (level) => set({ inkLevel: level }),
    setCursorVariant: (variant) => set({ cursorVariant: variant }),
    login: (username) => set({ isAuthenticated: true, user: { name: username } }),
    logout: () => set({ isAuthenticated: false, user: null }),
}));
