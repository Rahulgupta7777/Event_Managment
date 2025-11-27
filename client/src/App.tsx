import { useState } from 'react'
import { FullSidebar } from './components/layout/FullSidebar'
import { TopNavBar } from './components/layout/TopNavBar'
import { EnhancedDashboardView } from './components/views/EnhancedDashboardView'
import { CreateEventView } from './components/views/CreateEventView'
import { TasksKanbanView } from './components/views/TasksKanbanView'
import { TeamView } from './components/views/TeamView'
import { BudgetView } from './components/views/BudgetView'
import { GroupChatView } from './components/views/GroupChatView'
import { DocumentsView } from './components/views/DocumentsView'
import { ChannelsView } from './components/views/ChannelsView'
import { ProfileView } from './components/views/ProfileView'
import { SettingsView } from './components/views/SettingsView'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')

  const handleNavigate = (view: string) => {
    setActiveView(view)
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 640) {
      setSidebarOpen(false)
    }
  }

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAE1DD] via-[#F8EDEB] to-[#E8E8E4]">
      {/* Sidebar */}
      <FullSidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        sidebarOpen={sidebarOpen}
        onToggle={handleToggleSidebar}
      />

      {/* Top Navigation Bar */}
      <TopNavBar
        onProfileClick={() => handleNavigate('profile')}
        onSettingsClick={() => handleNavigate('settings')}
        userName="John Doe"
      />

      {/* Main Content */}
      <div className="sm:ml-64 pt-16 min-h-screen">
        {activeView === 'dashboard' && <EnhancedDashboardView />}
        {activeView === 'events' && <CreateEventView />}
        {activeView === 'create-event' && <CreateEventView />}
        {activeView === 'channels' && <ChannelsView />}
        {activeView === 'tasks' && <TasksKanbanView />}
        {activeView === 'team' && <TeamView />}
        {activeView === 'budget' && <BudgetView />}
        {activeView === 'messages' && <GroupChatView />}
        {activeView === 'documents' && <DocumentsView />}
        {activeView === 'profile' && <ProfileView />}
        {activeView === 'settings' && <SettingsView />}
      </div>
    </div>
  )
}

export default App
