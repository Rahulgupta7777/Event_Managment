import { useState } from 'react'
import { FullSidebar } from './components/layout/FullSidebar'
import { CreateEventView } from './components/views/CreateEventView'
import { TaskView } from './components/views/TaskView'
import { GroupChatView } from './components/views/GroupChatView'
import { TeamView } from './components/views/TeamView'
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
    <div className="min-h-screen bg-gradient-to-br from-[#FAE1DD] to-[#FEC5BB]">
      {/* Sidebar */}
      <FullSidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        sidebarOpen={sidebarOpen}
        onToggle={handleToggleSidebar}
      />

      {/* Main Content */}
      <div className="sm:ml-64 p-4">
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'create-event' && <CreateEventView />}
        {activeView === 'events' && <CreateEventView />}
        {activeView === 'tasks' && <TaskView />}
        {activeView === 'messages' && <GroupChatView />}
        {activeView === 'team' && <TeamView />}

        {/* Placeholder views for other navigation items */}
        {(activeView === 'channels' || activeView === 'budget' || activeView === 'documents' ||
          activeView === 'profile' || activeView === 'settings') && (
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600">This feature is under development</p>
            </div>
          )}
      </div>
    </div>
  )
}

// Simple Dashboard View
function DashboardView() {
  return (
    <div className="py-8 px-4 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-[#E8E8E4] shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Events</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-[#E8E8E4] shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Active Tasks</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-[#E8E8E4] shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Team Members</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
        </div>
      </div>
    </div>
  )
}

export default App
