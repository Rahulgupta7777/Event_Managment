import React from 'react';
import { HiCalendar, HiClipboard, HiCurrencyDollar, HiUsers, HiTrendingUp, HiClock } from 'react-icons/hi';

export function EnhancedDashboardView() {
    const stats = [
        { label: 'Active Events', value: '8', change: '+2', icon: HiCalendar, color: 'from-[#FEC5BB] to-[#FCD5CE]' },
        { label: 'Total Tasks', value: '45', change: '+12', icon: HiClipboard, color: 'from-[#FAE1DD] to-[#F8EDEB]' },
        { label: 'Budget Used', value: '68%', change: '+5%', icon: HiCurrencyDollar, color: 'from-[#FFE5D9] to-[#FFD7BA]' },
        { label: 'Team Members', value: '24', change: '+4', icon: HiUsers, color: 'from-[#D8E2DC] to-[#ECE4DB]' },
    ];

    const recentEvents = [
        { name: 'Annual Tech Conference 2025', date: 'Dec 15', status: 'In Progress', progress: 65, color: '#FEC89A' },
        { name: 'College Fest - Resonance', date: 'Jan 20', status: 'Planning', progress: 30, color: '#FFD7BA' },
        { name: 'Workshop: AI & ML', date: 'Dec 28', status: 'In Progress', progress: 80, color: '#FCD5CE' },
    ];

    const upcomingDeadlines = [
        { task: 'Finalize venue booking', event: 'Tech Conference', due: '2 days', priority: 'High' },
        { task: 'Send invitations', event: 'College Fest', due: '5 days', priority: 'Medium' },
        { task: 'Prepare presentation', event: 'AI Workshop', due: '1 week', priority: 'Low' },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's your event overview</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-[#FEC5BB] to-[#FCD5CE] text-gray-900 font-medium rounded-lg hover:shadow-lg transition-shadow">
                    + Create Event
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white border border-[#E8E8E4] rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                <p className="text-xs text-green-600 mt-1 flex items-center">
                                    <HiTrendingUp className="w-3 h-3 mr-1" />
                                    {stat.change} this month
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-gray-700" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Events & Deadlines */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Events */}
                <div className="lg:col-span-2 bg-white border border-[#D8E2DC] rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Events</h2>
                    <div className="space-y-4">
                        {recentEvents.map((event, idx) => (
                            <div key={idx} className="border border-[#E8E8E4] rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900">{event.name}</h3>
                                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: event.color }}>
                                        {event.status}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mb-3">
                                    <HiCalendar className="w-4 h-4 mr-1" />
                                    {event.date}
                                </div>
                                <div className="w-full bg-[#E8E8E4] rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full"
                                        style={{ width: `${event.progress}%`, backgroundColor: event.color }}
                                    />
                                </div>
                                <p className="text-xs text-gray-600 mt-1">{event.progress}% complete</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white border border-[#D8E2DC] rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Deadlines</h2>
                    <div className="space-y-3">
                        {upcomingDeadlines.map((item, idx) => (
                            <div
                                key={idx}
                                className="border-l-4 pl-3 py-2"
                                style={{
                                    borderLeftColor:
                                        item.priority === 'High' ? '#FEC5BB' : item.priority === 'Medium' ? '#FFD7BA' : '#D8E2DC',
                                }}
                            >
                                <p className="text-sm font-semibold text-gray-900">{item.task}</p>
                                <p className="text-xs text-gray-600">{item.event}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <HiClock className="w-3 h-3 mr-1" />
                                    Due in {item.due}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-[#ECE4DB] to-[#E8E8E4] border border-[#D8E2DC] rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                    <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-[#D8E2DC]">
                        <HiCalendar className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                        <p className="text-sm font-medium text-gray-900">Create Event</p>
                    </button>
                    <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-[#D8E2DC]">
                        <HiClipboard className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                        <p className="text-sm font-medium text-gray-900">Add Task</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
