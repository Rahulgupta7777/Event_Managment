import React from "react";

export function GroupChatView() {
  return (
    <div className="p-4 sm:ml-64 bg-primary-100 dark:bg-gray-900 min-h-screen">
      <div className="p-4 border-2 border-primary-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Group Chat
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {/* Mock Messages */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary-300 flex items-center justify-center text-sm font-bold text-gray-700">
                  A
                </div>
              </div>
              <div className="ml-3 bg-primary-100 p-3 rounded-lg">
                <p className="text-sm text-gray-800">
                  Hey team, how is the event planning going?
                </p>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="mr-3 bg-primary-200 p-3 rounded-lg">
                <p className="text-sm text-gray-800">
                  We are on track! Just need to finalize the catering.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center text-sm font-bold text-gray-700">
                  Me
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <form className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-gray-50 border border-primary-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
