import { Plus, Search, Filter, Grid, List } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { EventCard } from '@/components/dashboard/EventCard'
import { mockEvents } from '@/lib/mockData'

interface EventsViewProps {
  onEventClick: (eventId: string) => void
  onCreateEvent: () => void
}

export function EventsView({ onEventClick, onCreateEvent }: EventsViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvents = mockEvents.filter(event => {
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Events</h1>
          <p className="text-[#4a4a4a]">Manage all your events in one place</p>
        </div>
        <Button
          onClick={onCreateEvent}
          className="bg-gradient-to-r from-[#8d6b5b] to-[#a37f6e] hover:from-[#a37f6e] hover:to-[#8d6b5b] text-white shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d6b5b]" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/30 backdrop-blur-sm border-white/40"
          />
        </div>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-48 bg-white/30 backdrop-blur-sm border-white/40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-gradient-to-r from-[#8d6b5b] to-[#a37f6e] text-white' : 'bg-white/30 border-white/40'}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-gradient-to-r from-[#8d6b5b] to-[#a37f6e] text-white' : 'bg-white/30 border-white/40'}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-[#4a4a4a]">
          Showing {filteredEvents.length} of {mockEvents.length} events
        </span>
        {filterStatus !== 'all' && (
          <Badge className="bg-[#8d6b5b] text-white">
            {filterStatus}
          </Badge>
        )}
      </div>

      {filteredEvents.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewClick={onEventClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
          <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">No events found</h3>
          <p className="text-[#4a4a4a] mb-6">Try adjusting your search or filters</p>
          <Button
            onClick={() => {
              setSearchQuery('')
              setFilterStatus('all')
            }}
            variant="outline"
            className="bg-white/40 hover:bg-white/60 border-white/50"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
