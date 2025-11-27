import React from 'react';

export function ProfileView() {
    return (
        <div className="p-6 space-y-6">
            <div className="bg-white border border-[#D8E2DC] rounded-lg p-8">
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FEC5BB] to-[#FCD5CE] flex items-center justify-center text-3xl font-bold text-gray-900">
                        JD
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                        <p className="text-gray-600">john.doe@example.com</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-[#FFE5D9] text-sm rounded-full">Organizer</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#F8EDEB] rounded-lg">
                        <p className="text-sm text-gray-600">Events Created</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
                    </div>
                    <div className="p-4 bg-[#ECE4DB] rounded-lg">
                        <p className="text-sm text-gray-600">Tasks Completed</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">48</p>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-[#D8E2DC] rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            defaultValue="John Doe"
                            className="w-full px-3 py-2 border border-[#D8E2DC] rounded-lg bg-[#F8EDEB] focus:ring-[#FEC5BB] focus:border-[#FEC5BB]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="w-full px-3 py-2 border border-[#D8E2DC] rounded-lg bg-[#F8EDEB] focus:ring-[#FEC5BB] focus:border-[#FEC5BB]"
                        />
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#FEC5BB] to-[#FCD5CE] text-gray-900 font-medium rounded-lg hover:shadow-lg transition-shadow">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
