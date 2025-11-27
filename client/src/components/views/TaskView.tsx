import React from 'react';

export function TaskView() {
    return (
        <div className="p-4 sm:ml-64 bg-primary-100 dark:bg-gray-900 min-h-screen">
            <div className="p-4 border-2 border-primary-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Assign Tasks</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <form>
                        <div className="mb-6">
                            <label htmlFor="task-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Title</label>
                            <input type="text" id="task-title" className="bg-gray-50 border border-primary-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. Book Venue" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="assignee" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assign To</label>
                            <select id="assignee" className="bg-gray-50 border border-primary-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option>Select Team Member</option>
                                <option>John Doe</option>
                                <option>Jane Smith</option>
                                <option>Mike Johnson</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="due-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                            <input type="date" id="due-date" className="bg-gray-50 border border-primary-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                        </div>
                        <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Assign Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
