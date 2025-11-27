import React from 'react';
import { HiPlus, HiUsers } from 'react-icons/hi';

export function ChannelsView() {
    const channels = [
        { name: 'Decoration', members: 8, subgroups: 3, color: '#FEC5BB', lead: 'Sarah' },
        { name: 'Logistics', members: 12, subgroups: 4, color: '#FCD5CE', lead: 'Mike' },
        { name: 'Marketing', members: 6, subgroups: 2, color: '#FFE5D9', lead: 'Alice' },
        { name: 'Technology', members: 10, subgroups: 5, color: '#FFD7BA', lead: 'John' },
        { name: 'Anchoring', members: 4, subgroups: 1, color: '#D8E2DC', lead: 'Emma' },
        { name: 'Registration', members: 7, subgroups: 2, color: '#ECE4DB', lead: 'Tom' },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Channels & Subgroups</h1>
                    <p className="text-gray-600 mt-1">Organize teams and workflows</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-[#FEC5BB] to-[#FCD5CE] text-gray-900 font-medium rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
                    <HiPlus className="w-5 h-5" />
                    Create Channel
                </button>
            </div>

            {/* Channels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {channels.map((channel, idx) => (
                    <div
                        key={idx}
                        className="bg-white border border-[#E8E8E4] rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: channel.color }}
                            >
                                <HiUsers className="w-6 h-6 text-gray-700" />
                            </div>
                            <span className="text-xs px-2 py-1 bg-[#E8E8E4] rounded-full text-gray-700">
                                {channel.members} members
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-1">{channel.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">Lead: {channel.lead}</p>

                        <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{channel.subgroups} subgroups</span>
                            <button className="text-[#FEC5BB] hover:underline font-medium">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
