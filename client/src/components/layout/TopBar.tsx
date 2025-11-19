import { Search, Bell, ChevronDown, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getInitials } from '@/lib/helpers'
import type { User } from '@/types'

interface TopBarProps {
  currentUser: User
  onProfileClick?: () => void
  onLogout?: () => void
}

export function TopBar({ currentUser, onProfileClick, onLogout }: TopBarProps) {
  return (
    <div className="sticky top-0 z-30 h-20 px-6 lg:px-8 bg-white/20 backdrop-blur-xl border-b border-white/30">
      <div className="flex items-center justify-between h-full max-w-[1920px] mx-auto">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d6b5b]" />
            <Input
              placeholder="Search events, tasks, or team members..."
              className="pl-10 bg-white/30 backdrop-blur-sm border-white/40 focus:border-[#8d6b5b] focus:ring-2 focus:ring-[#8d6b5b]/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-white/30"
          >
            <Bell className="w-5 h-5 text-[#8d6b5b]" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/30 transition-all duration-200"
              >
                <Avatar className="w-9 h-9 border-2 border-white/50">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="bg-gradient-to-br from-[#8d6b5b] to-[#a37f6e] text-white">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-[#1a1a1a]">{currentUser.name}</p>
                  <p className="text-xs text-[#4a4a4a] capitalize">{currentUser.role}</p>
                </div>
                <ChevronDown className="hidden md:block w-4 h-4 text-[#8d6b5b]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-xl border-white/40">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
