import { create } from 'zustand';

interface AppState {
    inkLevel: number;
    cursorVariant: 'default' | 'hover' | 'text' | 'drawing';

    setInkLevel: (level: number) => void;
    setCursorVariant: (variant: 'default' | 'hover' | 'text' | 'drawing') => void;
}

export const useAppStore = create<AppState>((set) => ({
    inkLevel: 0,
    cursorVariant: 'default',

    setInkLevel: (level) => set({ inkLevel: level }),
    setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
