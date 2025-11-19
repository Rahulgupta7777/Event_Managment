import { Calendar, MapPin, Eye, Edit, Share2, MoreVertical } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate, getStatusColor, getEventTypeIcon, getInitials } from '@/lib/helpers'
import { mockUsers } from '@/lib/mockData'
import type { Event } from '@/types'

interface EventCardProps {
  event: Event
  onViewClick: (eventId: string) => void
  onEditClick?: (eventId: string) => void
}

export function EventCard({ event, onViewClick, onEditClick }: EventCardProps) {
  const budgetPercentage = (event.budget.spent / event.budget.total) * 100
  const teamMembers = mockUsers.filter(user => event.teamMembers.includes(user.id))

  return (
    <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8d6b5b] to-[#a37f6e] flex items-center justify-center text-2xl shadow-md">
            {getEventTypeIcon(event.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">{event.name}</h3>
            <Badge className={getStatusColor(event.status) + ' border'}>
              {event.status}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertical className="w-4 h-4 text-[#8d6b5b]" />
        </Button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-[#4a4a4a]">
          <Calendar className="w-4 h-4 text-[#8d6b5b]" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#4a4a4a]">
          <MapPin className="w-4 h-4 text-[#8d6b5b]" />
          <span>{event.venue}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-[#4a4a4a]">Progress</span>
          <span className="font-semibold text-[#8d6b5b]">{event.progress}%</span>
        </div>
        <Progress value={event.progress} className="h-2 bg-white/50" />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-[#4a4a4a]">Budget</span>
          <span className="font-semibold text-[#8d6b5b]">
            {formatCurrency(event.budget.spent)} / {formatCurrency(event.budget.total)}
          </span>
        </div>
        <Progress value={budgetPercentage} className="h-2 bg-white/50" />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/30">
        <div className="flex -space-x-2">
          {teamMembers.slice(0, 4).map((member) => (
            <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-gradient-to-br from-[#8d6b5b] to-[#a37f6e] text-white text-xs">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
          ))}
          {teamMembers.length > 4 && (
            <div className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-sm border-2 border-white flex items-center justify-center">
              <span className="text-xs font-medium text-[#8d6b5b]">+{teamMembers.length - 4}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewClick(event.id)}
            className="hover:bg-white/40"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          {onEditClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditClick(event.id)}
              className="hover:bg-white/40"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
