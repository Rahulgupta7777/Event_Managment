import React from 'react';
import { HiBell, HiSearch, HiUser, HiCog } from 'react-icons/hi';

interface TopNavBarProps {
    onProfileClick: () => void;
    onSettingsClick: () => void;
    userName?: string;
}

export function TopNavBar({ onProfileClick, onSettingsClick, userName = 'User' }: TopNavBarProps) {
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);
    const [showNotifications, setShowNotifications] = React.useState(false);

    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#D8E2DC] z-30 sm:ml-64">
            <div className="flex items-center justify-between h-full px-4">
                {/* Search Bar */}
                <div className="flex-1 max-w-xl">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <HiSearch className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="search"
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-[#D8E2DC] rounded-lg bg-[#F8EDEB] focus:ring-[#FEC5BB] focus:border-[#FEC5BB]"
                            placeholder="Search events, tasks, members..."
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 ml-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 text-gray-600 hover:bg-[#F8EDEB] rounded-lg transition-colors"
                        >
                            <HiBell className="w-6 h-6" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FEC89A] rounded-full"></span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#D8E2DC] rounded-lg shadow-lg">
                                <div className="p-4 border-b border-[#D8E2DC]">
                                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                                </div>
                                <div className="p-4 max-h-96 overflow-y-auto">
                                    <div className="space-y-3">
                                        <div className="p-3 bg-[#F8EDEB] rounded-lg">
                                            <p className="text-sm text-gray-900 font-medium">New task assigned</p>
                                            <p className="text-xs text-gray-600 mt-1">John assigned you "Book Venue"</p>
                                        </div>
                                        <div className="p-3 bg-[#F8EDEB] rounded-lg">
                                            <p className="text-sm text-gray-900 font-medium">Budget update</p>
                                            <p className="text-xs text-gray-600 mt-1">Decoration budget exceeded by 10%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Settings */}
                    <button
                        onClick={onSettingsClick}
                        className="p-2 text-gray-600 hover:bg-[#F8EDEB] rounded-lg transition-colors"
                    >
                        <HiCog className="w-6 h-6" />
                    </button>

                    {/* Profile Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-2 p-2 hover:bg-[#F8EDEB] rounded-lg transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FEC5BB] to-[#FCD5CE] flex items-center justify-center text-sm font-bold text-gray-900">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-gray-900 hidden md:block">{userName}</span>
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#D8E2DC] rounded-lg shadow-lg">
                                <div className="p-2">
                                    <button
                                        onClick={() => { onProfileClick(); setShowProfileMenu(false); }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#F8EDEB] rounded-lg"
                                    >
                                        View Profile
                                    </button>
                                    <button
                                        onClick={() => { onSettingsClick(); setShowProfileMenu(false); }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#F8EDEB] rounded-lg"
                                    >
                                        Settings
                                    </button>
                                    <hr className="my-2 border-[#D8E2DC]" />
                                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
