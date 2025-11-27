import React from "react";

export function TeamView() {
  const teamMembers = [
    { name: "John Doe", role: "Event Planner", avatar: "JD", color: "#FEC89A" },
    { name: "Jane Smith", role: "Coordinator", avatar: "JS", color: "#FFD7BA" },
    { name: "Mike Johnson", role: "Tech Lead", avatar: "MJ", color: "#FCD5CE" },
  ];

  return (
    <div className="py-8 px-4 mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="w-full bg-white border border-[#E8E8E4] rounded-lg shadow-sm"
          >
            <div className="flex flex-col items-center pb-10 pt-10">
              <div
                className="w-24 h-24 mb-3 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700 shadow-lg"
                style={{ backgroundColor: member.color }}
              >
                {member.avatar}
              </div>
              <h5 className="mb-1 text-xl font-medium text-gray-900">
                {member.name}
              </h5>
              <span className="text-sm text-gray-500">{member.role}</span>
              <div className="flex mt-4 space-x-3">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#FEC5BB] rounded-lg hover:bg-[#FCD5CE]">
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
