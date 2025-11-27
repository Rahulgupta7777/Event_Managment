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
    <Card className={cn('p-6 bg-white/60 backdrop-blur-xl border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {subtitle && (
            <p className="text-xs text-primary-950 font-medium">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-300 to-primary-100 flex items-center justify-center text-gray-800 shadow-md">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  )
}
