import React from 'react';
import { HiPlus, HiTrendingDown, HiTrendingUp } from 'react-icons/hi';

export function BudgetView() {
    const budgetData = [
        { category: 'Venue', allocated: 50000, spent: 45000, color: '#FEC5BB' },
        { category: 'Catering', allocated: 30000, spent: 28000, color: '#FCD5CE' },
        { category: 'Decoration', allocated: 20000, spent: 22000, color: '#FFE5D9' },
        { category: 'Marketing', allocated: 15000, spent: 12000, color: '#FFD7BA' },
        { category: 'Technology', allocated: 25000, spent: 18000, color: '#D8E2DC' },
    ];

    const totalAllocated = budgetData.reduce((sum, item) => sum + item.allocated, 0);
    const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
    const percentageUsed = Math.round((totalSpent / totalAllocated) * 100);

    const recentExpenses = [
        { item: 'Stage Equipment Rental', amount: 15000, category: 'Technology', date: 'Dec 5', approvedBy: 'Admin' },
        { item: 'Food Samples', amount: 3000, category: 'Catering', date: 'Dec 4', approvedBy: 'Team Lead' },
        { item: 'Poster Printing', amount: 2000, category: 'Marketing', date: 'Dec 3', approvedBy: 'Admin' },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
                    <p className="text-gray-600 mt-1">Track expenses and manage event budget</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-[#FEC5BB] to-[#FCD5CE] text-gray-900 font-medium rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
                    <HiPlus className="w-5 h-5" />
                    Add Expense
                </button>
            </div>

            {/* Budget Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-[#D8E2DC] rounded-lg p-6">
                    <p className="text-sm font-medium text-gray-600">Total Budget</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">₹{totalAllocated.toLocaleString()}</p>
                </div>
                <div className="bg-white border border-[#D8E2DC] rounded-lg p-6">
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">₹{totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">{percentageUsed}% of budget</p>
                </div>
                <div className="bg-white border border-[#D8E2DC] rounded-lg p-6">
                    <p className="text-sm font-medium text-gray-600">Remaining</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">₹{(totalAllocated - totalSpent).toLocaleString()}</p>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white border border-[#D8E2DC] rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Category Breakdown</h2>
                <div className="space-y-4">
                    {budgetData.map((item, idx) => {
                        const percentage = Math.round((item.spent / item.allocated) * 100);
                        const isOverBudget = item.spent > item.allocated;

                        return (
                            <div key={idx} className="border border-[#E8E8E4] rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <h3 className="font-semibold text-gray-900">{item.category}</h3>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-gray-600">
                                            ₹{item.spent.toLocaleString()} / ₹{item.allocated.toLocaleString()}
                                        </span>
                                        <div className={`flex items-center gap-1 ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                                            {isOverBudget ? <HiTrendingUp className="w-4 h-4" /> : <HiTrendingDown className="w-4 h-4" />}
                                            <span className="font-medium">{percentage}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full bg-[#E8E8E4] rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full transition-all"
                                        style={{
                                            width: `${Math.min(percentage, 100)}%`,
                                            backgroundColor: isOverBudget ? '#FEC5BB' : item.color,
                                        }}
                                    />
                                </div>
                                {isOverBudget && (
                                    <p className="text-xs text-red-600 mt-1">Over budget by ₹{(item.spent - item.allocated).toLocaleString()}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Expenses */}
            <div className="bg-white border border-[#D8E2DC] rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Expenses</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#E8E8E4]">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Item</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Approved By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentExpenses.map((expense, idx) => (
                                <tr key={idx} className="border-b border-[#E8E8E4] hover:bg-[#F8EDEB]">
                                    <td className="py-3 px-4 text-sm text-gray-900">{expense.item}</td>
                                    <td className="py-3 px-4">
                                        <span className="text-xs px-2 py-1 bg-[#E8E8E4] rounded-full">{expense.category}</span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-right font-medium text-gray-900">
                                        ₹{expense.amount.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{expense.date}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{expense.approvedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
