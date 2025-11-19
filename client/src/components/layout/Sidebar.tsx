import { Home, Calendar, CheckSquare, MessageSquare, FileText, DollarSign, Users, Settings, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'budget', label: 'Budget', icon: DollarSign },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden w-10 h-10 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg flex items-center justify-center text-[#8d6b5b] hover:scale-105 transition-transform"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full p-6 bg-white/20 backdrop-blur-xl border-r border-white/30">
          <div className="flex items-center gap-3 mb-8 mt-12 lg:mt-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8d6b5b] to-[#a37f6e] flex items-center justify-center text-white shadow-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a1a1a]">Event Manager</h1>
              <p className="text-xs text-[#4a4a4a]">Plan · Coordinate · Execute</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-white/40 text-[#8d6b5b] shadow-md'
                      : 'text-[#4a4a4a] hover:bg-white/20 hover:text-[#1a1a1a]'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40">
              <p className="text-xs font-medium text-[#8d6b5b] mb-1">Need help?</p>
              <p className="text-xs text-[#4a4a4a]">Check our documentation or contact support</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 bg-white/50 hover:bg-white/70 border-white/60"
              >
                Get Help
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
