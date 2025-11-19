import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from '@/components/ui/sonner'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { DashboardView } from '@/components/views/DashboardView'
import { EventDetailView } from '@/components/views/EventDetailView'
import { EventsView } from '@/components/views/EventsView'
import { GooeyNav } from '@/components/bits/GooeyNav'
import { LoginPage } from '@/components/auth/LoginPage'
import { LoadingScreen } from '@/components/bits/LoadingScreen'
import type { User } from '@/types'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useKV<boolean>('is-authenticated', false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  
  const [currentUser, setCurrentUser] = useKV<User | null>('current-user', null)

  const [activeView, setActiveView] = useState<string>('dashboard')
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [showGooeyNav, setShowGooeyNav] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleViewChange = (view: string) => {
    setActiveView(view)
    setSelectedEventId(null)
  }

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId)
    setActiveView('event-detail')
  }

  const handleBackToDashboard = () => {
    setSelectedEventId(null)
    setActiveView('dashboard')
  }

  const handleGooeyNavClick = (id: string) => {
    if (id === 'home') {
      handleViewChange('dashboard')
    } else {
      handleViewChange(id)
    }
  }

  const handleLogin = (email: string, password: string) => {
    setIsLoading(true)
    
    setTimeout(() => {
      const user: User = {
        id: 'user_1',
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: 'owner',
      }
      setCurrentUser(user)
      setIsAuthenticated(true)
      setIsLoading(false)
    }, 1500)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  if (isInitializing) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} isLoading={isLoading} />
  }

  if (!currentUser) {
    return <LoadingScreen />
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(135deg, #FAE1DD 0%, #FFD7BA 50%, #FEC5BB 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Toaster position="top-center" />
      
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />
      
      <div className="lg:ml-72">
        <TopBar 
          currentUser={currentUser} 
          onProfileClick={() => setShowGooeyNav(true)}
          onLogout={handleLogout}
        />
        
        <main className="p-6 lg:p-8 max-w-[1920px] mx-auto">
          {activeView === 'dashboard' && (
            <DashboardView
              onEventClick={handleEventClick}
              onCreateEvent={() => console.log('Create event')}
            />
          )}

          {activeView === 'event-detail' && selectedEventId && (
            <EventDetailView
              eventId={selectedEventId}
              onBack={handleBackToDashboard}
            />
          )}

          {activeView === 'events' && (
            <EventsView
              onEventClick={handleEventClick}
              onCreateEvent={() => console.log('Create event')}
            />
          )}

          {activeView === 'tasks' && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Tasks View</h2>
              <p className="text-[#4a4a4a]">Global task management coming soon...</p>
            </div>
          )}

          {activeView === 'messages' && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Messages</h2>
              <p className="text-[#4a4a4a]">Real-time messaging coming soon...</p>
            </div>
          )}

          {activeView === 'documents' && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Documents</h2>
              <p className="text-[#4a4a4a]">Document management coming soon...</p>
            </div>
          )}

          {activeView === 'budget' && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Budget Overview</h2>
              <p className="text-[#4a4a4a]">Global budget tracking coming soon...</p>
            </div>
          )}

          {activeView === 'team' && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Team Management</h2>
              <p className="text-[#4a4a4a]">Team directory and management coming soon...</p>
            </div>
          )}

          {activeView === 'settings' && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Settings</h2>
              <p className="text-[#4a4a4a]">User preferences and settings coming soon...</p>
            </div>
          )}
        </main>
      </div>

      <GooeyNav
        isOpen={showGooeyNav}
        onClose={() => setShowGooeyNav(false)}
        onItemClick={handleGooeyNavClick}
      />
    </div>
  )
}

export default App
