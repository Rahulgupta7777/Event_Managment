import React from 'react';
import { HiPlus } from 'react-icons/hi';

interface Task {
    id: string;
    title: string;
    description: string;
    assignee: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: string;
}

const initialTasks: Record<string, Task[]> = {
    'To Do': [
        { id: '1', title: 'Book Venue', description: 'Finalize venue for tech conference', assignee: 'John', priority: 'High', dueDate: 'Dec 10' },
        { id: '2', title: 'Send Invitations', description: 'Email invitations to speakers', assignee: 'Sarah', priority: 'Medium', dueDate: 'Dec 12' },
    ],
    'In Progress': [
        { id: '3', title: 'Design Stage', description: 'Create stage design mockups', assignee: 'Mike', priority: 'High', dueDate: 'Dec 8' },
    ],
    'Review': [
        { id: '4', title: 'Budget Approval', description: 'Review decoration budget', assignee: 'Alice', priority: 'Medium', dueDate: 'Dec 5' },
    ],
    'Done': [
        { id: '5', title: 'Create Event Page', description: 'Setup event landing page', assignee: 'Tom', priority: 'Low', dueDate: 'Dec 1' },
    ],
};

export function TasksKanbanView() {
    const [tasks, setTasks] = React.useState(initialTasks);
    const [showAddTask, setShowAddTask] = React.useState<string | null>(null);

    const columns = ['To Do', 'In Progress', 'Review', 'Done'];
    const columnColors: Record<string, string> = {
        'To Do': '#F8EDEB',
        'In Progress': '#FFE5D9',
        'Review': '#FFD7BA',
        'Done': '#D8E2DC',
    };

    const priorityColors = {
        High: '#FEC5BB',
        Medium: '#FCD5CE',
        Low: '#E8E8E4',
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Tasks Board</h1>
                <p className="text-gray-600 mt-1">Manage and track all event tasks</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {columns.map((column) => (
                    <div key={column} className="bg-white border border-[#D8E2DC] rounded-lg p-4">
                        {/* Column Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: columnColors[column] }}
                                />
                                <h2 className="font-bold text-gray-900">{column}</h2>
                                <span className="text-xs text-gray-500 bg-[#E8E8E4] px-2 py-1 rounded-full">
                                    {tasks[column]?.length || 0}
                                </span>
                            </div>
                            <button
                                onClick={() => setShowAddTask(column)}
                                className="p-1 hover:bg-[#F8EDEB] rounded"
                            >
                                <HiPlus className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>

                        {/* Tasks */}
                        <div className="space-y-3">
                            {tasks[column]?.map((task) => (
                                <div
                                    key={task.id}
                                    className="p-3 border border-[#E8E8E4] rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-sm text-gray-900">{task.title}</h3>
                                        <span
                                            className="text-xs px-2 py-1 rounded-full"
                                            style={{ backgroundColor: priorityColors[task.priority] }}
                                        >
                                            {task.priority}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FEC89A] to-[#FFD7BA] flex items-center justify-center text-white text-xs font-bold">
                                                {task.assignee.charAt(0)}
                                            </div>
                                            <span className="text-gray-600">{task.assignee}</span>
                                        </div>
                                        <span className="text-gray-500">{task.dueDate}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Task Form */}
                        {showAddTask === column && (
                            <div className="mt-3 p-3 border-2 border-dashed border-[#D8E2DC] rounded-lg">
                                <input
                                    type="text"
                                    placeholder="Task title..."
                                    className="w-full px-3 py-2 text-sm border border-[#D8E2DC] rounded mb-2 focus:ring-[#FEC5BB] focus:border-[#FEC5BB]"
                                />
                                <div className="flex gap-2">
                                    <button className="flex-1 px-3 py-1 text-sm bg-[#FEC5BB] text-gray-900 rounded hover:bg-[#FCD5CE]">
                                        Add
                                    </button>
                                    <button
                                        onClick={() => setShowAddTask(null)}
                                        className="px-3 py-1 text-sm bg-[#E8E8E4] text-gray-700 rounded hover:bg-[#D8E2DC]"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
