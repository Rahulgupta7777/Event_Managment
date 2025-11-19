import { useState, useEffect, useRef } from 'react'
import { Home, Calendar, CheckSquare, Users, Settings, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface GooeyNavItem {
  id: string
  label: string
  icon: React.ReactNode
  color: string
}

interface GooeyNavProps {
  isOpen: boolean
  onClose: () => void
  onItemClick: (id: string) => void
  className?: string
}

const defaultNavItems: GooeyNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-[#E8D5F2] to-[#D5C6F2]',
  },
  {
    id: 'events',
    label: 'Events',
    icon: <Calendar className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-[#FFD7BA] to-[#FEC5BB]',
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: <CheckSquare className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-[#D5F2E3] to-[#B8E6D5]',
  },
  {
    id: 'team',
    label: 'Team',
    icon: <Users className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-[#FFF4D5] to-[#FFE8B8]',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-[#FAE1DD] to-[#F5D5D8]',
  },
]

export function GooeyNav({ isOpen, onClose, onItemClick, className }: GooeyNavProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node) && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleItemClick = (id: string) => {
    onItemClick(id)
    onClose()
  }

  const getPositionStyle = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2
    const radius = 100
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return {
      transform: `translate(${x}px, ${y}px)`,
    }
  }

  if (!isOpen) return null

  return (
    <>
      <svg className="fixed" style={{ width: 0, height: 0 }}>
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        ref={navRef}
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
          'transition-all duration-300 ease-out',
          prefersReducedMotion ? '' : 'animate-in fade-in zoom-in-95',
          className
        )}
        style={{
          filter: prefersReducedMotion ? 'none' : 'url(#gooey-filter)',
        }}
      >
        <div className="relative w-[300px] h-[300px]">
          <div
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'w-32 h-32 rounded-full',
              'bg-white/40 backdrop-blur-xl',
              'border border-white/60',
              'shadow-2xl',
              'transition-all duration-500 ease-out',
              isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            )}
          />

          <button
            onClick={onClose}
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'w-12 h-12 rounded-full',
              'bg-white/90 backdrop-blur-md',
              'border border-white/80',
              'shadow-lg',
              'flex items-center justify-center',
              'text-[#8d6b5b] hover:text-[#1a1a1a]',
              'transition-all duration-200',
              'hover:scale-105 active:scale-95',
              'z-10'
            )}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {defaultNavItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                'w-16 h-16 rounded-full',
                item.color,
                'border border-white/50',
                'shadow-xl',
                'flex flex-col items-center justify-center gap-1',
                'text-[#8d6b5b] hover:text-[#1a1a1a]',
                'transition-all duration-300',
                'hover:scale-110 hover:shadow-2xl active:scale-95',
                prefersReducedMotion ? '' : 'animate-in fade-in zoom-in slide-in-from-bottom-4'
              )}
              style={{
                ...getPositionStyle(index, defaultNavItems.length),
                animationDelay: prefersReducedMotion ? '0ms' : `${index * 50}ms`,
                animationFillMode: 'both',
              }}
              aria-label={item.label}
            >
              {item.icon}
              <span className="text-[9px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 bg-black/20 backdrop-blur-sm z-40',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
    </>
  )
}
