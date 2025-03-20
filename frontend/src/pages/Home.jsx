import React from "react";

const Home = () => {
  // Dummy data for featured content
  const featuredContent = [
    {
      id: 1,
      title: "Getting Started Guide",
      description:
        "Learn how to use our platform effectively with this comprehensive guide.",
      image: "/api/placeholder/600/400",
      category: "Guides",
    },
    {
      id: 2,
      title: "March Product Updates",
      description:
        "Explore the latest features and improvements we've added this month.",
      image: "/api/placeholder/600/400",
      category: "News",
    },
    {
      id: 3,
      title: "Productivity Tips",
      description:
        "Boost your efficiency with these proven workflow strategies.",
      image: "/api/placeholder/600/400",
      category: "Tips",
    },
  ];

  // Dummy data for recent activity
  const recentActivity = [
    {
      id: 1,
      user: "Jane Cooper",
      action: "completed",
      task: "Q1 Report",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Alex Smith",
      action: "commented on",
      task: "Marketing Strategy",
      time: "4 hours ago",
    },
    {
      id: 3,
      user: "Marcus Lee",
      action: "updated",
      task: "Project Timeline",
      time: "Yesterday",
    },
    {
      id: 4,
      user: "Sarah Wilson",
      action: "shared",
      task: "Client Presentation",
      time: "Yesterday",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Welcome to Your Workspace
              </h1>
              <p className="text-blue-100 mb-6 text-lg">
                Track projects, collaborate with your team, and achieve your
                goals all in one place.
              </p>
              <div className="space-x-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">
              Active Projects
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <span>↑ 3 from last month</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Team Members</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <span>↑ 2 new this week</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">
              Task Completion
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">87%</p>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <span>↑ 5% from last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured content section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredContent.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                  {item.category}
                </span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button className="text-blue-600 font-medium hover:text-blue-800 transition duration-150">
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
