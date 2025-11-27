import React from 'react';

export function SettingsView() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your preferences and account settings</p>
            </div>

            <div className="bg-white border border-[#D8E2DC] rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Notifications</h2>
                <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 hover:bg-[#F8EDEB] rounded-lg cursor-pointer">
                        <span className="text-gray-900">Email notifications</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#FEC5BB]" />
                    </label>
                    <label className="flex items-center justify-between p-3 hover:bg-[#F8EDEB] rounded-lg cursor-pointer">
                        <span className="text-gray-900">Task reminders</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#FEC5BB]" />
                    </label>
                    <label className="flex items-center justify-between p-3 hover:bg-[#F8EDEB] rounded-lg cursor-pointer">
                        <span className="text-gray-900">Budget alerts</span>
                        <input type="checkbox" className="w-4 h-4 accent-[#FEC5BB]" />
                    </label>
                </div>
            </div>

            <div className="bg-white border border-[#D8E2DC] rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Appearance</h2>
                <div className="space-y-3">
                    <label className="block">
                        <span className="text-gray-700 font-medium">Theme</span>
                        <select className="mt-1 block w-full px-3 py-2 border border-[#D8E2DC] rounded-lg bg-[#F8EDEB] focus:ring-[#FEC5BB] focus:border-[#FEC5BB]">
                            <option>Light</option>
                            <option>Dark</option>
                            <option>System</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>
    );
}
