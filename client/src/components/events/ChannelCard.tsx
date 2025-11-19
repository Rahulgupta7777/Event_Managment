import { CheckSquare, DollarSign, Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { formatCurrency, calculateProgress } from '@/lib/helpers'
import type { Channel } from '@/types'

interface ChannelCardProps {
  channel: Channel
  onViewClick?: (channelId: string) => void
}

export function ChannelCard({ channel, onViewClick }: ChannelCardProps) {
  const taskProgress = calculateProgress(channel.completedTasks, channel.taskCount)
  const budgetProgress = (channel.budget.spent / channel.budget.allocated) * 100

  return (
    <Card className={`p-6 ${channel.color} backdrop-blur-xl border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{channel.icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">{channel.name}</h3>
            <p className="text-sm text-[#4a4a4a]">{channel.description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2 text-[#4a4a4a]">
              <CheckSquare className="w-4 h-4 text-[#8d6b5b]" />
              <span>Tasks</span>
            </div>
            <span className="font-semibold text-[#8d6b5b]">
              {channel.completedTasks}/{channel.taskCount}
            </span>
          </div>
          <Progress value={taskProgress} className="h-2 bg-white/50" />
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2 text-[#4a4a4a]">
              <DollarSign className="w-4 h-4 text-[#8d6b5b]" />
              <span>Budget</span>
            </div>
            <span className="font-semibold text-[#8d6b5b]">
              {formatCurrency(channel.budget.spent)} / {formatCurrency(channel.budget.allocated)}
            </span>
          </div>
          <Progress value={budgetProgress} className="h-2 bg-white/50" />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-[#4a4a4a]">
            <Users className="w-4 h-4 text-[#8d6b5b]" />
            <span>Members</span>
          </div>
          <span className="font-semibold text-[#8d6b5b]">{channel.memberCount}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/30">
        <p className="text-xs text-[#4a4a4a]">Last activity: {channel.lastActivity}</p>
        {onViewClick && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewClick(channel.id)}
            className="hover:bg-white/40"
          >
            View Details
          </Button>
        )}
      </div>
    </Card>
  )
}
