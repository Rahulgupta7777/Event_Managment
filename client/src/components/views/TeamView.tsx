import React from 'react';

export function TeamView() {
    return (
        <div className="p-4 sm:ml-64 bg-primary-100 dark:bg-gray-900 min-h-screen">
            <div className="p-4 border-2 border-primary-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Manage Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Team Member Card 1 */}
                    <div className="w-full max-w-sm bg-white border border-primary-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-end px-4 pt-4">
                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <div className="w-24 h-24 mb-3 rounded-full bg-primary-300 flex items-center justify-center text-2xl font-bold text-gray-700 shadow-lg">JD</div>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">John Doe</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Event Planner</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Message</a>
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Remove</a>
                            </div>
                        </div>
                    </div>
                    {/* Team Member Card 2 */}
                    <div className="w-full max-w-sm bg-white border border-primary-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-end px-4 pt-4">
                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <div className="w-24 h-24 mb-3 rounded-full bg-primary-400 flex items-center justify-center text-2xl font-bold text-gray-700 shadow-lg">JS</div>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Jane Smith</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Coordinator</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Message</a>
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Remove</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
