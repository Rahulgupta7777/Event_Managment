import { ArrowLeft, Calendar, MapPin, Edit, Archive, Share2, Users as UsersIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { formatDate, formatCurrency, getStatusColor, getEventTypeIcon, getInitials } from '@/lib/helpers'
import { mockUsers, mockChannels, mockTasks, mockActivities, mockExpenses } from '@/lib/mockData'
import { ChannelCard } from '@/components/events/ChannelCard'
import { TaskBoard } from '@/components/tasks/TaskBoard'
import { BudgetDashboard } from '@/components/budget/BudgetDashboard'
import { TeamDirectory } from '@/components/team/TeamDirectory'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import type { Event } from '@/types'

interface EventDetailViewProps {
  eventId: string
  onBack: () => void
}

export function EventDetailView({ eventId, onBack }: EventDetailViewProps) {
  const event = {
    id: 'evt_1',
    name: 'Tech Summit 2025',
    type: 'conference',
    date: '2025-12-15',
    venue: 'Convention Center Hall A',
    description: 'Annual technology conference bringing together industry leaders and innovators to discuss the latest trends, innovations, and future directions in the tech industry.',
    status: 'active',
    progress: 65,
    budget: {
      total: 50000,
      spent: 32500,
    },
    teamMembers: ['user_1', 'user_2', 'user_3', 'user_4'],
    channels: ['ch_1', 'ch_2', 'ch_3', 'ch_4'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-11-15T00:00:00Z',
  } as Event

  if (!event) {
    return <div>Event not found</div>
  }

  const teamMembers = mockUsers.filter(u => event.teamMembers.includes(u.id))
  const channels = mockChannels.filter(c => c.eventId === eventId)
  const tasks = mockTasks.filter(t => t.eventId === eventId)
  const activities = mockActivities.filter(a => a.eventId === eventId)
  const expenses = mockExpenses.filter(e => e.eventId === eventId)
  const budgetPercentage = (event.budget.spent / event.budget.total) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="hover:bg-white/30"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8d6b5b] to-[#a37f6e] flex items-center justify-center text-2xl shadow-md">
              {getEventTypeIcon(event.type)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#1a1a1a]">{event.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge className={getStatusColor(event.status) + ' border'}>
                  {event.status}
                </Badge>
                <span className="text-sm text-[#4a4a4a]">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {formatDate(event.date)}
                </span>
                <span className="text-sm text-[#4a4a4a]">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {event.venue}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-white/30 hover:bg-white/50 border-white/40">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" className="bg-white/30 hover:bg-white/50 border-white/40">
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </Button>
          <Button className="bg-gradient-to-r from-[#8d6b5b] to-[#a37f6e] hover:from-[#a37f6e] hover:to-[#8d6b5b] text-white">
            <Edit className="w-4 h-4 mr-2" />
            Edit Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg">
          <h3 className="text-sm font-medium text-[#4a4a4a] mb-2">Overall Progress</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-white/30"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - event.progress / 100)}`}
                  className="text-[#8d6b5b] transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#1a1a1a]">{event.progress}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-[#4a4a4a]">
                {tasks.filter(t => t.status === 'done').length} of {tasks.length} tasks completed
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg">
          <h3 className="text-sm font-medium text-[#4a4a4a] mb-2">Budget Status</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#1a1a1a]">{formatCurrency(event.budget.spent)}</span>
              <span className="text-sm text-[#4a4a4a]">of {formatCurrency(event.budget.total)}</span>
            </div>
            <Progress value={budgetPercentage} className="h-3 bg-white/50" />
            <p className="text-xs text-[#8d6b5b]">{Math.round(budgetPercentage)}% utilized</p>
          </div>
        </Card>

        <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg">
          <h3 className="text-sm font-medium text-[#4a4a4a] mb-3">Team Members</h3>
          <div className="flex -space-x-2 mb-3">
            {teamMembers.map((member) => (
              <Avatar key={member.id} className="w-10 h-10 border-2 border-white">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-gradient-to-br from-[#8d6b5b] to-[#a37f6e] text-white text-xs">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full bg-white/40 hover:bg-white/60 border-white/50">
            <UsersIcon className="w-4 h-4 mr-2" />
            Manage Team
          </Button>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white/30 backdrop-blur-sm border border-white/40 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg">
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">Description</h3>
            <p className="text-[#4a4a4a]">{event.description}</p>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityFeed activities={activities} />
            <Card className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg">
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Channels Overview</h3>
              <div className="space-y-3">
                {channels.map((channel) => (
                  <div key={channel.id} className="flex items-center justify-between p-3 rounded-lg bg-white/20">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{channel.icon}</span>
                      <div>
                        <p className="font-medium text-[#1a1a1a]">{channel.name}</p>
                        <p className="text-xs text-[#4a4a4a]">
                          {channel.completedTasks}/{channel.taskCount} tasks
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#8d6b5b]">
                        {formatCurrency(channel.budget.spent)}
                      </p>
                      <p className="text-xs text-[#4a4a4a]">
                        of {formatCurrency(channel.budget.allocated)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {channels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <TaskBoard tasks={tasks} />
        </TabsContent>

        <TabsContent value="budget" className="mt-6">
          <BudgetDashboard event={event} expenses={expenses} />
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <TeamDirectory members={teamMembers} eventId={eventId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
