import { Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TaskCard } from '@/components/tasks/TaskCard'
import type { Task } from '@/types'

interface TaskBoardProps {
  tasks: Task[]
  onTaskClick?: (taskId: string) => void
  onCreateTask?: () => void
}

const columns = [
  { id: 'todo', label: 'To Do', status: 'todo' as const },
  { id: 'in-progress', label: 'In Progress', status: 'in-progress' as const },
  { id: 'review', label: 'Review', status: 'review' as const },
  { id: 'done', label: 'Done', status: 'done' as const },
]

export function TaskBoard({ tasks, onTaskClick, onCreateTask }: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {columns.map((column) => {
        const columnTasks = tasks.filter(task => task.status === column.status)
        
        return (
          <div key={column.id} className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1a1a1a]">
                {column.label}
                <span className="ml-2 text-sm text-[#8d6b5b]">({columnTasks.length})</span>
              </h3>
              {column.id === 'todo' && onCreateTask && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCreateTask}
                  className="w-7 h-7 hover:bg-white/40"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1 space-y-3">
              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => onTaskClick?.(task.id)}
                />
              ))}
              
              {columnTasks.length === 0 && (
                <Card className="p-6 bg-white/20 backdrop-blur-sm border-white/30 border-dashed">
                  <p className="text-sm text-[#4a4a4a] text-center">No tasks</p>
                </Card>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
