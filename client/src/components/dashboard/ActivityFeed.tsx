import { CheckSquare, Plus, DollarSign, UserPlus, FileUp, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatRelativeTime, getInitials } from '@/lib/helpers'
import { mockUsers } from '@/lib/mockData'
import type { Activity } from '@/types'

interface ActivityFeedProps {
  activities: Activity[]
  maxItems?: number
}

const activityIcons = {
  task_created: Plus,
  task_completed: CheckSquare,
  expense_added: DollarSign,
  member_added: UserPlus,
  document_uploaded: FileUp,
  message_sent: MessageSquare,
}

const activityColors = {
  task_created: 'bg-blue-100 text-blue-600',
  task_completed: 'bg-green-100 text-green-600',
  expense_added: 'bg-yellow-100 text-yellow-600',
  member_added: 'bg-purple-100 text-purple-600',
  document_uploaded: 'bg-pink-100 text-pink-600',
  message_sent: 'bg-indigo-100 text-indigo-600',
}

export function ActivityFeed({ activities, maxItems = 10 }: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems)

  return (
    <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg">
      <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {displayActivities.map((activity) => {
          const user = mockUsers.find(u => u.id === activity.userId)
          const Icon = activityIcons[activity.type]
          const colorClass = activityColors[activity.type]

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="w-9 h-9 border-2 border-white/50">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-br from-[#8d6b5b] to-[#a37f6e] text-white text-xs">
                  {user ? getInitials(user.name) : '?'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm text-[#1a1a1a]">
                    <span className="font-semibold">{user?.name}</span>{' '}
                    <span className="text-[#4a4a4a]">{activity.description}</span>
                  </p>
                </div>
                <p className="text-xs text-[#8d6b5b]">{formatRelativeTime(activity.createdAt)}</p>
              </div>

              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
          )
        })}

        {activities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-[#4a4a4a]">No recent activity</p>
          </div>
        )}
      </div>
    </Card>
  )
}
