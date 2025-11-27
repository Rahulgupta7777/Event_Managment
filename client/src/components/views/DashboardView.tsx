import { Calendar, CheckSquare, DollarSign, Users, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/dashboard/StatCard'
import { EventCard } from '@/components/dashboard/EventCard'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { mockEvents, mockActivities, mockTasks } from '@/lib/mockData'
import { calculateProgress } from '@/lib/helpers'

interface DashboardViewProps {
  onEventClick: (eventId: string) => void
  onCreateEvent: () => void
}

export function DashboardView({ onEventClick, onCreateEvent }: DashboardViewProps) {
  const activeEvents = mockEvents.filter(e => e.status === 'active')
  const totalEvents = mockEvents.length
  const totalBudget = mockEvents.reduce((sum, e) => sum + e.budget.total, 0)
  const totalSpent = mockEvents.reduce((sum, e) => sum + e.budget.spent, 0)
  const budgetUtilization = Math.round((totalSpent / totalBudget) * 100)

  const activeTasks = mockTasks.filter(t => t.status !== 'done')
  const completedTasks = mockTasks.filter(t => t.status === 'done')
  const taskCompletion = calculateProgress(completedTasks.length, mockTasks.length)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your events.</p>
        </div>
        <Button
          onClick={onCreateEvent}
          className="bg-gradient-to-r from-primary-300 to-primary-100 hover:from-primary-100 hover:to-primary-300 text-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 border border-primary-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={Calendar}
          label="Total Events"
          value={totalEvents}
          subtitle={`${activeEvents.length} active`}
          trend={{ value: '12%', isPositive: true }}
        />
        <StatCard
          icon={CheckSquare}
          label="Active Tasks"
          value={activeTasks.length}
          subtitle={`${taskCompletion}% completed`}
          trend={{ value: '8%', isPositive: true }}
        />
        <StatCard
          icon={DollarSign}
          label="Budget Used"
          value={`${budgetUtilization}%`}
          subtitle={`$${totalSpent.toLocaleString()} of $${totalBudget.toLocaleString()}`}
          trend={{ value: '5%', isPositive: false }}
        />
        <StatCard
          icon={Users}
          label="Team Members"
          value={12}
          subtitle="Across all events"
          trend={{ value: '2', isPositive: true }}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Active Events</h2>
          <Button variant="outline" className="bg-white/40 hover:bg-white/60 border-primary-200 text-gray-700">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewClick={onEventClick}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed activities={mockActivities} maxItems={8} />
        </div>
        <div>
          <div className="bg-white/60 backdrop-blur-xl border border-primary-200 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-4">
              {mockTasks.filter(t => t.dueDate).slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-950 mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <p className="text-xs text-primary-950">{task.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-white/60 backdrop-blur-xl border border-primary-200 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-white/40 hover:bg-white/60 border-primary-200 text-gray-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
              <Button variant="outline" className="w-full justify-start bg-white/40 hover:bg-white/60 border-primary-200 text-gray-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
              <Button variant="outline" className="w-full justify-start bg-white/40 hover:bg-white/60 border-primary-200 text-gray-700">
                <Plus className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
