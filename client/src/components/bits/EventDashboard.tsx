import { useKV } from '@github/spark/hooks'
import { ProfileCardUser } from './ProfileCard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, CheckSquare, Users, Settings, Plus, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'

interface Event {
  id: string
  title: string
  date: string
  status: 'upcoming' | 'in-progress' | 'completed'
  assignedTo: string[]
}

interface Task {
  id: string
  title: string
  completed: boolean
  eventId: string
  assignedTo: string
}

interface EventDashboardProps {
  activeSection: string
  currentUser: ProfileCardUser
  teamMembers: ProfileCardUser[]
}

export function EventDashboard({ activeSection, currentUser, teamMembers }: EventDashboardProps) {
  const [events] = useKV<Event[]>('events', [
    {
      id: '1',
      title: 'Annual Tech Conference 2024',
      date: '2024-06-15',
      status: 'upcoming',
      assignedTo: ['Ava Patel', 'Sarah Chen'],
    },
    {
      id: '2',
      title: 'Product Launch Event',
      date: '2024-05-20',
      status: 'in-progress',
      assignedTo: ['Marcus Rodriguez', 'Emily Thompson'],
    },
    {
      id: '3',
      title: 'Team Building Workshop',
      date: '2024-07-10',
      status: 'upcoming',
      assignedTo: ['Sarah Chen', 'Ava Patel'],
    },
  ])

  const [tasks] = useKV<Task[]>('tasks', [
    { id: '1', title: 'Finalize venue booking', completed: false, eventId: '1', assignedTo: 'Ava Patel' },
    { id: '2', title: 'Send speaker invitations', completed: true, eventId: '1', assignedTo: 'Sarah Chen' },
    { id: '3', title: 'Order promotional materials', completed: false, eventId: '2', assignedTo: 'Emily Thompson' },
    { id: '4', title: 'Setup registration system', completed: false, eventId: '2', assignedTo: 'Marcus Rodriguez' },
  ])

  const safeEvents = events || []
  const safeTasks = tasks || []

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-gradient-to-br from-[#D5F2E3] to-[#B8E6D5] text-[#2d6a4f]'
      case 'in-progress':
        return 'bg-gradient-to-br from-[#FFD7BA] to-[#FEC5BB] text-[#8d4a2e]'
      case 'completed':
        return 'bg-gradient-to-br from-[#E8D5F2] to-[#D5C6F2] text-[#6b4c9a]'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const renderHome = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#1a1a1a]">Dashboard</h2>
          <p className="text-[#4a4a4a] mt-1">Welcome back, {currentUser.name.split(' ')[0]}</p>
        </div>
        <Button
          onClick={() => toast.success('Creating new event')}
          className="bg-gradient-to-r from-[#FAE1DD] to-[#FEC5BB] text-[#1a1a1a] hover:shadow-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8d6b5b] font-medium">Total Events</p>
              <p className="text-3xl font-bold text-[#1a1a1a] mt-1">{safeEvents.length}</p>
            </div>
            <Calendar className="w-10 h-10 text-[#8d6b5b]" />
          </div>
        </Card>
        <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8d6b5b] font-medium">Active Tasks</p>
              <p className="text-3xl font-bold text-[#1a1a1a] mt-1">
                {safeTasks.filter((t) => !t.completed).length}
              </p>
            </div>
            <CheckSquare className="w-10 h-10 text-[#8d6b5b]" />
          </div>
        </Card>
        <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8d6b5b] font-medium">Team Members</p>
              <p className="text-3xl font-bold text-[#1a1a1a] mt-1">{teamMembers.length + 1}</p>
            </div>
            <Users className="w-10 h-10 text-[#8d6b5b]" />
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-4">Recent Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safeEvents.map((event) => (
            <Card key={event.id} className="p-6 bg-white/40 backdrop-blur-xl border-white/50 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-semibold text-[#1a1a1a]">{event.title}</h4>
                <Badge className={getStatusColor(event.status)}>
                  {event.status.replace('-', ' ')}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#8d6b5b] mb-4">
                <Clock className="w-4 h-4" />
                {new Date(event.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-[#8d6b5b]">Team:</p>
                <div className="flex -space-x-2">
                  {event.assignedTo.map((member, idx) => (
                    <Avatar key={idx} className="w-8 h-8 border-2 border-white">
                      <AvatarFallback className="bg-gradient-to-br from-[#FAE1DD] to-[#FEC5BB] text-[#8d6b5b] text-xs">
                        {getInitials(member)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#1a1a1a]">Events</h2>
        <Button
          onClick={() => toast.success('Creating new event')}
          className="bg-gradient-to-r from-[#FAE1DD] to-[#FEC5BB] text-[#1a1a1a] hover:shadow-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {safeEvents.map((event) => (
          <Card key={event.id} className="p-6 bg-white/40 backdrop-blur-xl border-white/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-[#1a1a1a]">{event.title}</h3>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#8d6b5b]">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#1a1a1a]">Tasks</h2>
        <Button
          onClick={() => toast.success('Creating new task')}
          className="bg-gradient-to-r from-[#FAE1DD] to-[#FEC5BB] text-[#1a1a1a] hover:shadow-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
      <div className="space-y-3">
        {safeTasks.map((task) => (
          <Card key={task.id} className="p-4 bg-white/40 backdrop-blur-xl border-white/50 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toast.info('Task status updated')}
                className="w-5 h-5 rounded border-2 border-[#8d6b5b]"
              />
              <div className="flex-1">
                <p className={`font-medium ${task.completed ? 'line-through text-[#8d6b5b]' : 'text-[#1a1a1a]'}`}>
                  {task.title}
                </p>
                <p className="text-xs text-[#8d6b5b] mt-1">Assigned to: {task.assignedTo}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderTeam = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#1a1a1a]">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/50">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-white/60 shadow-lg">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="bg-gradient-to-br from-[#FAE1DD] to-[#FEC5BB] text-[#8d6b5b] font-semibold text-lg">
                {getInitials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-[#1a1a1a]">{currentUser.name}</h3>
              <p className="text-sm text-[#8d6b5b]">{currentUser.role}</p>
              <Badge className="mt-2 bg-gradient-to-r from-[#E8D5F2] to-[#D5C6F2] text-[#6b4c9a]">
                You
              </Badge>
            </div>
          </div>
        </Card>
        {teamMembers.map((member, idx) => (
          <Card key={idx} className="p-6 bg-white/40 backdrop-blur-xl border-white/50">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-white/60 shadow-lg">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-gradient-to-br from-[#FAE1DD] to-[#FEC5BB] text-[#8d6b5b] font-semibold text-lg">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a]">{member.name}</h3>
                <p className="text-sm text-[#8d6b5b]">{member.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#1a1a1a]">Settings</h2>
      <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/50">
        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Profile Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#8d6b5b]">Name</label>
            <p className="text-[#1a1a1a] mt-1">{currentUser.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#8d6b5b]">Email</label>
            <p className="text-[#1a1a1a] mt-1">{currentUser.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#8d6b5b]">Role</label>
            <p className="text-[#1a1a1a] mt-1">{currentUser.role}</p>
          </div>
        </div>
      </Card>
    </div>
  )

  switch (activeSection) {
    case 'home':
      return renderHome()
    case 'events':
      return renderEvents()
    case 'tasks':
      return renderTasks()
    case 'team':
      return renderTeam()
    case 'settings':
      return renderSettings()
    default:
      return renderHome()
  }
}
