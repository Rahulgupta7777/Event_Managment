
import { useState } from 'react';

interface DrawerProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function Drawer({ activeView, onNavigate }: DrawerProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [isSalesDropdownOpen, setIsSalesDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top - 0 left - 0 z - 40 w - 64 h - screen transition - transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm: translate - x - 0`}
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-primary-100 border-r border-primary-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}
                className={`flex items - center p - 2 text - base font - normal text - gray - 900 rounded - lg dark: text - white hover: bg - primary - 200 dark: hover: bg - gray - 700 group ${activeView === 'dashboard' ? 'bg-primary-200' : ''} `}
              >
                <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                <span className="ml-3">Overview</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setIsPagesDropdownOpen(!isPagesDropdownOpen)}
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-primary-200 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
              >
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">Events</span>
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
              <ul id="dropdown-pages" className={`${isPagesDropdownOpen ? 'block' : 'hidden'} py - 2 space - y - 2`}>
                <li>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onNavigate('create-event'); }}
                    className={`flex items - center p - 2 pl - 11 w - full text - base font - normal text - gray - 900 rounded - lg transition duration - 75 group hover: bg - primary - 200 dark: text - white dark: hover: bg - gray - 700 ${activeView === 'create-event' ? 'bg-primary-200' : ''} `}
                  >
                    Create Event
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('tasks'); }}
                className={`flex items - center p - 2 text - base font - normal text - gray - 900 rounded - lg dark: text - white hover: bg - primary - 200 dark: hover: bg - gray - 700 group ${activeView === 'tasks' ? 'bg-primary-200' : ''} `}
              >
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Tasks</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('messages'); }}
                className={`flex items - center p - 2 text - base font - normal text - gray - 900 rounded - lg dark: text - white hover: bg - primary - 200 dark: hover: bg - gray - 700 group ${activeView === 'messages' ? 'bg-primary-200' : ''} `}
              >
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
                <span className="inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full text-primary-800 bg-primary-200 dark:bg-primary-200 dark:text-primary-800">
                  6
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('team'); }}
                className={`flex items - center p - 2 text - base font - normal text - gray - 900 rounded - lg dark: text - white hover: bg - primary - 200 dark: hover: bg - gray - 700 group ${activeView === 'team' ? 'bg-primary-200' : ''} `}
              >
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Team</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

