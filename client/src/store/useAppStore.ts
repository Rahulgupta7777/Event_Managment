import { create } from 'zustand';

interface AppState {
    activeView: string;
    inkLevel: number;
    cursorVariant: 'default' | 'hover' | 'text' | 'drawing';

    setActiveView: (view: string) => void;
    setInkLevel: (level: number) => void;
    setCursorVariant: (variant: 'default' | 'hover' | 'text' | 'drawing') => void;
}

export const useAppStore = create<AppState>((set) => ({
    activeView: 'dashboard',
    inkLevel: 0,
    cursorVariant: 'default',

    setActiveView: (view) => set({ activeView: view }),
    setInkLevel: (level) => set({ inkLevel: level }),
    setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
