import { Calendar, User, MessageSquare, Paperclip } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { getPriorityColor, getTaskStatusColor, formatDate, getInitials } from '@/lib/helpers'
import { mockUsers } from '@/lib/mockData'
import type { Task } from '@/types'

interface TaskCardProps {
  task: Task
  onClick?: () => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const assignee = task.assignee ? mockUsers.find(u => u.id === task.assignee) : null

  return (
    <Card 
      className="p-4 bg-white/30 backdrop-blur-xl border-white/40 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-[#1a1a1a] text-sm leading-snug pr-2">{task.title}</h4>
        <Badge className={getPriorityColor(task.priority) + ' text-xs border shrink-0'}>
          {task.priority}
        </Badge>
      </div>

      {task.description && (
        <p className="text-xs text-[#4a4a4a] mb-3 line-clamp-2">{task.description}</p>
      )}

      {task.progress > 0 && (
        <div className="mb-3">
          <Progress value={task.progress} className="h-1.5 bg-white/50" />
          <p className="text-xs text-[#8d6b5b] mt-1">{task.progress}% complete</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {assignee && (
            <Avatar className="w-6 h-6 border border-white/50">
              <AvatarImage src={assignee.avatar} alt={assignee.name} />
              <AvatarFallback className="bg-gradient-to-br from-[#8d6b5b] to-[#a37f6e] text-white text-[10px]">
                {getInitials(assignee.name)}
              </AvatarFallback>
            </Avatar>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-[#8d6b5b]">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-[#4a4a4a]">
              <MessageSquare className="w-3 h-3" />
              <span>{task.comments.length}</span>
            </div>
          )}
          {task.attachments.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-[#4a4a4a]">
              <Paperclip className="w-3 h-3" />
              <span>{task.attachments.length}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
