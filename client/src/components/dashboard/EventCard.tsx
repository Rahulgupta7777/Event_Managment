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
    <Card className="p-6 bg-white/60 backdrop-blur-xl border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-300 to-primary-100 flex items-center justify-center text-2xl shadow-md text-gray-800">
            {getEventTypeIcon(event.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.name}</h3>
            <Badge className={getStatusColor(event.status) + ' border'}>
              {event.status}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-200"
        >
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </Button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-primary-950" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-primary-950" />
          <span>{event.venue}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-primary-950">{event.progress}%</span>
        </div>
        <Progress value={event.progress} className="h-2 bg-primary-200" />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Budget</span>
          <span className="font-semibold text-primary-950">
            {formatCurrency(event.budget.spent)} / {formatCurrency(event.budget.total)}
          </span>
        </div>
        <Progress value={budgetPercentage} className="h-2 bg-primary-200" />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-primary-200">
        <div className="flex -space-x-2">
          {teamMembers.slice(0, 4).map((member) => (
            <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary-300 to-primary-100 text-gray-800 text-xs">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
          ))}
          {teamMembers.length > 4 && (
            <div className="w-8 h-8 rounded-full bg-primary-200 backdrop-blur-sm border-2 border-white flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700">+{teamMembers.length - 4}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewClick(event.id)}
            className="hover:bg-primary-200 text-gray-700"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          {onEditClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditClick(event.id)}
              className="hover:bg-primary-200 text-gray-700"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
