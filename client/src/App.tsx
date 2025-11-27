import { useState } from 'react'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAE1DD] to-[#FEC5BB]">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-[#D8E2DC]">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => { setActiveView('dashboard'); setSidebarOpen(false); }}
                className={`flex items-center p-2 w-full text-base font-normal rounded-lg transition-colors ${activeView === 'dashboard' ? 'bg-[#FAE1DD] text-gray-900' : 'text-gray-900 hover:bg-[#F8EDEB]'}`}
              >
                <svg aria-hidden="true" className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveView('create-event'); setSidebarOpen(false); }}
                className={`flex items-center p-2 w-full text-base font-normal rounded-lg transition-colors ${activeView === 'create-event' ? 'bg-[#FAE1DD] text-gray-900' : 'text-gray-900 hover:bg-[#F8EDEB]'}`}
              >
                <svg aria-hidden="true" className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-3">Create Event</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveView('tasks'); setSidebarOpen(false); }}
                className={`flex items-center p-2 w-full text-base font-normal rounded-lg transition-colors ${activeView === 'tasks' ? 'bg-[#FAE1DD] text-gray-900' : 'text-gray-900 hover:bg-[#F8EDEB]'}`}
              >
                <svg aria-hidden="true" className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
                <span className="ml-3">Assign Tasks</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveView('messages'); setSidebarOpen(false); }}
                className={`flex items-center p-2 w-full text-base font-normal rounded-lg transition-colors ${activeView === 'messages' ? 'bg-[#FAE1DD] text-gray-900' : 'text-gray-900 hover:bg-[#F8EDEB]'}`}
              >
                <svg aria-hidden="true" className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">Messages</span>
                <span className="inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full text-gray-800 bg-[#FEC89A]">
                  6
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveView('team'); setSidebarOpen(false); }}
                className={`flex items-center p-2 w-full text-base font-normal rounded-lg transition-colors ${activeView === 'team' ? 'bg-[#FAE1DD] text-gray-900' : 'text-gray-900 hover:bg-[#F8EDEB]'}`}
              >
                <svg aria-hidden="true" className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-3">Manage Team</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="sm:ml-64 p-4">
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'create-event' && <CreateEventView />}
        {activeView === 'tasks' && <TasksView />}
        {activeView === 'messages' && <MessagesView />}
        {activeView === 'team' && <TeamView />}
      </div>
    </div>
  )
}

// Dashboard View
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

// Create Event View
function CreateEventView() {
  return (
    <section className="bg-white rounded-lg shadow-sm">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Create New Event</h2>
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Event Name</label>
              <input type="text" name="name" id="name" className="bg-[#F8EDEB] border border-[#D8E2DC] text-gray-900 text-sm rounded-lg focus:ring-[#FEC5BB] focus:border-[#FEC5BB] block w-full p-2.5" placeholder="Type event name" required />
            </div>
            <div className="w-full">
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
              <input type="date" name="date" id="date" className="bg-[#F8EDEB] border border-[#D8E2DC] text-gray-900 text-sm rounded-lg focus:ring-[#FEC5BB] focus:border-[#FEC5BB] block w-full p-2.5" required />
            </div>
            <div className="w-full">
              <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-900">Budget</label>
              <input type="number" name="budget" id="budget" className="bg-[#F8EDEB] border border-[#D8E2DC] text-gray-900 text-sm rounded-lg focus:ring-[#FEC5BB] focus:border-[#FEC5BB] block w-full p-2.5" placeholder="$2999" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <textarea id="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-[#F8EDEB] rounded-lg border border-[#D8E2DC] focus:ring-[#FEC5BB] focus:border-[#FEC5BB]" placeholder="Your description here"></textarea>
            </div>
          </div>
          <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#FEC5BB] rounded-lg hover:bg-[#FCD5CE] focus:ring-4 focus:ring-[#FFD7BA]">
            Create Event
          </button>
        </form>
      </div>
    </section>
  )
}

// Tasks View
function TasksView() {
  return (
    <div className="py-8 px-4 mx-auto max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Assign Tasks</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form>
          <div className="mb-6">
            <label htmlFor="task-title" className="block mb-2 text-sm font-medium text-gray-900">Task Title</label>
            <input type="text" id="task-title" className="bg-[#F8EDEB] border border-[#D8E2DC] text-gray-900 text-sm rounded-lg focus:ring-[#FEC5BB] focus:border-[#FEC5BB] block w-full p-2.5" placeholder="e.g. Book Venue" required />
          </div>
          <div className="mb-6">
            <label htmlFor="assignee" className="block mb-2 text-sm font-medium text-gray-900">Assign To</label>
            <select id="assignee" className="bg-[#F8EDEB] border border-[#D8E2DC] text-gray-900 text-sm rounded-lg focus:ring-[#FEC5BB] focus:border-[#FEC5BB] block w-full p-2.5">
              <option>Select Team Member</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>
          <button type="submit" className="text-white bg-[#FEC5BB] hover:bg-[#FCD5CE] focus:ring-4 focus:outline-none focus:ring-[#FFD7BA] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Assign Task
          </button>
        </form>
      </div>
    </div>
  )
}

// Messages View
function MessagesView() {
  return (
    <div className="py-8 px-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Group Chat</h2>
      <div className="bg-white rounded-lg shadow-md p-4 h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-[#FEC89A] flex items-center justify-center text-sm font-bold text-gray-700">A</div>
            <div className="ml-3 bg-[#F8EDEB] p-3 rounded-lg">
              <p className="text-sm text-gray-800">Hey team, how is the event planning going?</p>
            </div>
          </div>
          <div className="flex items-start justify-end">
            <div className="mr-3 bg-[#FAE1DD] p-3 rounded-lg">
              <p className="text-sm text-gray-800">We are on track! Just need to finalize the catering.</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FCD5CE] flex items-center justify-center text-sm font-bold text-gray-700">Me</div>
          </div>
        </div>
        <div className="mt-auto">
          <form className="flex gap-2">
            <input type="text" className="flex-1 bg-[#F8EDEB] border border-[#D8E2DC] text-gray-900 text-sm rounded-lg focus:ring-[#FEC5BB] focus:border-[#FEC5BB] block w-full p-2.5" placeholder="Type a message..." />
            <button type="submit" className="text-white bg-[#FEC5BB] hover:bg-[#FCD5CE] focus:ring-4 focus:outline-none focus:ring-[#FFD7BA] font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// Team View
function TeamView() {
  return (
    <div className="py-8 px-4 mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="w-full bg-white border border-[#E8E8E4] rounded-lg shadow-sm">
          <div className="flex flex-col items-center pb-10 pt-10">
            <div className="w-24 h-24 mb-3 rounded-full bg-[#FEC89A] flex items-center justify-center text-2xl font-bold text-gray-700 shadow-lg">JD</div>
            <h5 className="mb-1 text-xl font-medium text-gray-900">John Doe</h5>
            <span className="text-sm text-gray-500">Event Planner</span>
            <div className="flex mt-4 space-x-3">
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#FEC5BB] rounded-lg hover:bg-[#FCD5CE]">
                Message
              </button>
            </div>
          </div>
        </div>
        <div className="w-full bg-white border border-[#E8E8E4] rounded-lg shadow-sm">
          <div className="flex flex-col items-center pb-10 pt-10">
            <div className="w-24 h-24 mb-3 rounded-full bg-[#FFD7BA] flex items-center justify-center text-2xl font-bold text-gray-700 shadow-lg">JS</div>
            <h5 className="mb-1 text-xl font-medium text-gray-900">Jane Smith</h5>
            <span className="text-sm text-gray-500">Coordinator</span>
            <div className="flex mt-4 space-x-3">
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#FEC5BB] rounded-lg hover:bg-[#FCD5CE]">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
