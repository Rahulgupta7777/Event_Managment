import { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  subtitle?: string
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export function StatCard({ icon: Icon, label, value, subtitle, trend, className }: StatCardProps) {
  return (
    <Card className={cn('p-6 bg-white/30 backdrop-blur-xl border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[#4a4a4a] mb-1">{label}</p>
          <p className="text-3xl font-bold text-[#1a1a1a] mb-2">{value}</p>
          {subtitle && (
            <p className="text-xs text-[#8d6b5b]">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-[#4a4a4a]">vs last month</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8d6b5b] to-[#a37f6e] flex items-center justify-center text-white shadow-md">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  )
}
