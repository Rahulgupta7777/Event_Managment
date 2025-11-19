import { Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, getBudgetStatus } from '@/lib/helpers'
import type { Event, Expense } from '@/types'

interface BudgetDashboardProps {
  event: Event
  expenses: Expense[]
}

export function BudgetDashboard({ event, expenses }: BudgetDashboardProps) {
  const budgetPercentage = (event.budget.spent / event.budget.total) * 100
  const budgetStatus = getBudgetStatus(event.budget.spent, event.budget.total)
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg">
          <h3 className="text-sm font-medium text-[#4a4a4a] mb-2">Total Budget</h3>
          <p className="text-3xl font-bold text-[#1a1a1a]">{formatCurrency(event.budget.total)}</p>
        </Card>

        <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg">
          <h3 className="text-sm font-medium text-[#4a4a4a] mb-2">Spent</h3>
          <p className="text-3xl font-bold text-[#1a1a1a]">{formatCurrency(event.budget.spent)}</p>
          <Progress value={budgetPercentage} className="h-2 bg-white/50 mt-3" />
        </Card>

        <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg">
          <h3 className="text-sm font-medium text-[#4a4a4a] mb-2">Remaining</h3>
          <p className="text-3xl font-bold text-[#1a1a1a]">
            {formatCurrency(event.budget.total - event.budget.spent)}
          </p>
          <p className="text-xs text-[#8d6b5b] mt-2">{Math.round(100 - budgetPercentage)}% available</p>
        </Card>
      </div>

      <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1a1a1a]">Budget by Category</h3>
          <Button className="bg-gradient-to-r from-[#8d6b5b] to-[#a37f6e] hover:from-[#a37f6e] hover:to-[#8d6b5b] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>

        <div className="space-y-4">
          {Object.entries(categoryTotals).map(([category, amount]) => {
            const percentage = (amount / event.budget.total) * 100
            return (
              <div key={category}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-[#1a1a1a]">{category}</span>
                  <span className="text-[#8d6b5b]">{formatCurrency(amount)}</span>
                </div>
                <Progress value={percentage} className="h-2 bg-white/50" />
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg">
        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Recent Expenses</h3>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 rounded-lg bg-white/20">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-medium text-[#1a1a1a]">{expense.description}</p>
                  <Badge className={
                    expense.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200 border' :
                    expense.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 border' :
                    'bg-red-100 text-red-700 border-red-200 border'
                  }>
                    {expense.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#4a4a4a]">
                  <span>{expense.category}</span>
                  <span>•</span>
                  <span>{expense.vendor}</span>
                  <span>•</span>
                  <span>{expense.date}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#1a1a1a]">{formatCurrency(expense.amount)}</p>
              </div>
            </div>
          ))}

          {expenses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-[#4a4a4a]">No expenses recorded yet</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
