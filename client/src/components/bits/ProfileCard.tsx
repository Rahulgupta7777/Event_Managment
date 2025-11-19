import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { GooeyNav } from './GooeyNav'
import { cn } from '@/lib/utils'

export interface ProfileCardUser {
  name: string
  role: string
  email: string
  avatar?: string
}

interface ProfileCardProps {
  user: ProfileCardUser
  onNavigate?: (id: string) => void
  className?: string
}

export function ProfileCard({ user, onNavigate, className }: ProfileCardProps) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleCardClick = () => {
    setIsNavOpen(true)
  }

  const handleNavItemClick = (id: string) => {
    onNavigate?.(id)
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={handleCardClick}
        className={cn(
          'w-full max-w-sm rounded-2xl p-6',
          'bg-white/30 backdrop-blur-xl',
          'border border-white/40',
          'shadow-xl hover:shadow-2xl',
          'transition-all duration-300 ease-out',
          'hover:-translate-y-1 active:translate-y-0',
          'cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-[#8d6b5b]/50 focus:ring-offset-2'
        )}
        aria-label="Open navigation menu"
      >
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-white/60 shadow-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-[#FAE1DD] to-[#FEC5BB] text-[#8d6b5b] font-semibold text-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-left">
            <h2 className="text-xl font-semibold text-[#1a1a1a] tracking-tight leading-tight">
              {user.name}
            </h2>
            <p className="text-sm font-medium text-[#4a4a4a] mt-1">
              {user.role}
            </p>
            <p className="text-xs text-[#8d6b5b] mt-0.5 tracking-wide truncate">
              {user.email}
            </p>
          </div>
        </div>
      </button>

      <GooeyNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onItemClick={handleNavItemClick}
      />
    </div>
  )
}
