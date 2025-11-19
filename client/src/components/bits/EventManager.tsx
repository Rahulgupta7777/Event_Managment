import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { ProfileCard, ProfileCardUser } from './ProfileCard'
import { EventDashboard } from './EventDashboard'
import { toast } from 'sonner'

interface EventManagerProps {
  currentUser: ProfileCardUser
}

export function EventManager({ currentUser }: EventManagerProps) {
  const [selectedNav, setSelectedNav] = useState<string>('home')
  const [teamMembers] = useKV<ProfileCardUser[]>('team-members', [
    {
      name: 'Sarah Chen',
      role: 'Event Coordinator',
      email: 'sarah.chen@eventmgr.io',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Logistics Manager',
      email: 'marcus.r@eventmgr.io',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    {
      name: 'Emily Thompson',
      role: 'Marketing Lead',
      email: 'emily.thompson@eventmgr.io',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    },
  ])

  const handleNavigate = (id: string) => {
    setSelectedNav(id)
    toast.success(`Switched to ${id.charAt(0).toUpperCase() + id.slice(1)}`, {
      description: `Viewing ${id} section`,
    })
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="w-full px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a] tracking-tight">
            Let's happen event
          </h1>
          <p className="text-lg text-[#4a4a4a] font-medium mt-1">
            Collaborative event management workspace
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-[#8d6b5b]">Current User</p>
            <p className="text-xs text-[#4a4a4a]">{currentUser.email}</p>
          </div>
          <ProfileCard
            user={currentUser}
            onNavigate={handleNavigate}
          />
        </div>
      </header>

      <main className="flex-1 px-8 pb-8">
        <EventDashboard
          activeSection={selectedNav}
          currentUser={currentUser}
          teamMembers={teamMembers || []}
        />
      </main>
    </div>
  )
}
