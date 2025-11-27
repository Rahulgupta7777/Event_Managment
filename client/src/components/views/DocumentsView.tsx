import React from 'react';
import { HiPlus, HiDownload, HiFolder, HiDocument, HiUpload } from 'react-icons/hi';

export function DocumentsView() {
    const folders = [
        { name: 'Contracts', count: 12, color: '#FEC5BB' },
        { name: 'Designs', count: 24, color: '#FCD5CE' },
        { name: 'Budgets', count: 8, color: '#FFD7BA' },
        { name: 'Marketing', count: 15, color: '#D8E2DC' },
    ];

    const recentFiles = [
        { name: 'Event_Proposal_v2.pdf', size: '2.4 MB', uploaded: '2 hours ago', uploadedBy: 'John' },
        { name: 'Venue_Contract.docx', size: '156 KB', uploaded: '5 hours ago', uploadedBy: 'Sarah' },
        { name: 'Budget_Breakdown.xlsx', size: '48 KB', uploaded: '1 day ago', uploadedBy: 'Mike' },
        { name: 'Stage_Design.png', size: '3.2 MB', uploaded: '2 days ago', uploadedBy: 'Alice' },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
                    <p className="text-gray-600 mt-1">Manage event files and documents</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-[#FEC5BB] to-[#FCD5CE] text-gray-900 font-medium rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
                    <HiUpload className="w-5 h-5" />
                    Upload File
                </button>
            </div>

            {/* Folders */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Folders</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {folders.map((folder, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-[#E8E8E4] rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <HiFolder className="w-12 h-12 mb-2" style={{ color: folder.color }} />
                            <h3 className="font-semibold text-gray-900">{folder.name}</h3>
                            <p className="text-xs text-gray-600 mt-1">{folder.count} files</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Files */}
            <div className="bg-white border border-[#D8E2DC] rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Files</h2>
                <div className="space-y-3">
                    {recentFiles.map((file, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between p-3 border border-[#E8E8E4] rounded-lg hover:bg-[#F8EDEB] transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-gradient-to-br from-[#FFE5D9] to-[#FFD7BA] flex items-center justify-center">
                                    <HiDocument className="w-5 h-5 text-gray-700" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 text-sm">{file.name}</h3>
                                    <p className="text-xs text-gray-600">
                                        {file.size} • Uploaded by {file.uploadedBy} • {file.uploaded}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-[#E8E8E4] rounded transition-colors">
                                <HiDownload className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
