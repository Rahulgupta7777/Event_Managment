import { Mail, UserPlus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getInitials } from '@/lib/helpers'
import type { User } from '@/types'

interface TeamDirectoryProps {
  members: User[]
  eventId: string
  onInvite?: () => void
}

const roleColors = {
  owner: 'bg-purple-100 text-purple-700 border-purple-200',
  organizer: 'bg-blue-100 text-blue-700 border-blue-200',
  'team-lead': 'bg-green-100 text-green-700 border-green-200',
  member: 'bg-gray-100 text-gray-700 border-gray-200',
}

export function TeamDirectory({ members, eventId, onInvite }: TeamDirectoryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#1a1a1a]">Team Members</h2>
          <p className="text-sm text-[#4a4a4a] mt-1">{members.length} members in this event</p>
        </div>
        <Button 
          onClick={onInvite}
          className="bg-gradient-to-r from-[#8d6b5b] to-[#a37f6e] hover:from-[#a37f6e] hover:to-[#8d6b5b] text-white"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16 border-2 border-white/50">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-gradient-to-br from-[#8d6b5b] to-[#a37f6e] text-white">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#1a1a1a] mb-1 truncate">{member.name}</h3>
                <Badge className={roleColors[member.role] + ' border text-xs mb-2'}>
                  {member.role.replace('-', ' ')}
                </Badge>
                <div className="flex items-center gap-2 text-xs text-[#4a4a4a]">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{member.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/30">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">8</p>
                  <p className="text-xs text-[#4a4a4a]">Tasks</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">24</p>
                  <p className="text-xs text-[#4a4a4a]">Activities</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
