import { create } from 'zustand';

export type Subgroup = {
    id: string;
    name: string;
    members: number;
};

export type Channel = {
    id: string;
    name: string;
    description: string;
    icon: string; // Lucide icon name
    subgroups: Subgroup[];
    color: string;
};

interface ChannelState {
    channels: Channel[];
    activeChannelId: string | null;
    activeSubgroupId: string | null;
    setActiveChannel: (channelId: string | null) => void;
    setActiveSubgroup: (subgroupId: string | null) => void;
}

export const useChannelStore = create<ChannelState>((set) => ({
    channels: [
        {
            id: 'decoration',
            name: 'Decoration',
            description: 'Visuals, themes, and aesthetics.',
            icon: 'Palette',
            color: 'bg-[#ffcc00]',
            subgroups: [
                { id: 'stage', name: 'Stage Design', members: 4 },
                { id: 'lighting', name: 'Lighting', members: 2 },
                { id: 'flowers', name: 'Florals', members: 3 },
            ],
        },
        {
            id: 'logistics',
            name: 'Logistics',
            description: 'Transport, venue, and heavy lifting.',
            icon: 'Truck',
            color: 'bg-[#ff4d4d]',
            subgroups: [
                { id: 'transport', name: 'Transportation', members: 5 },
                { id: 'venue', name: 'Venue Prep', members: 8 },
            ],
        },
        {
            id: 'marketing',
            name: 'Marketing',
            description: 'Social media, posters, and hype.',
            icon: 'Megaphone',
            color: 'bg-[#4dffb8]',
            subgroups: [
                { id: 'social', name: 'Social Media', members: 3 },
                { id: 'print', name: 'Print Media', members: 2 },
            ],
        },
        {
            id: 'tech',
            name: 'Tech',
            description: 'Sound, screens, and wires.',
            icon: 'Cpu',
            color: 'bg-[#4d94ff]',
            subgroups: [
                { id: 'sound', name: 'Sound Engineering', members: 2 },
                { id: 'visuals', name: 'Visuals & Projection', members: 2 },
            ],
        },
    ],
    activeChannelId: null,
    activeSubgroupId: null,
    setActiveChannel: (channelId) => set({ activeChannelId: channelId, activeSubgroupId: null }),
    setActiveSubgroup: (subgroupId) => set({ activeSubgroupId: subgroupId }),
}));
