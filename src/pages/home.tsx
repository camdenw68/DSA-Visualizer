"use client"

import { useState } from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import { Sun, Moon, ChevronRight, Code, Zap, BookOpen, Cpu } from "lucide-react"

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState("structures")
  const location = useLocation()

  const dataStructures = ["Array", "Linked List", "Stack", "Queue", "Binary Tree", "Hash Table", "Graph"]
  const algorithms = ["Bubble Sort", "Merge Sort", "Quick Sort", "Binary Search", "Dijkstra's Algorithm"]

  const exploreItems = [
    { title: "Data Structures", icon: <Code className="h-4 w-4" /> },
    { title: "Algorithms", icon: <Zap className="h-4 w-4" /> },
    { title: "Tutorials", icon: <BookOpen className="h-4 w-4" /> },
    { title: "Complexity Analysis", icon: <Cpu className="h-4 w-4" /> },
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="flex h-screen w-screen text-gray-900 dark:text-white overflow-hidden">
      {/* Sidebar */}
      <aside className={`w-64 ${darkMode ? "bg-[#0f1219] border-gray-800" : "bg-white border-gray-200"} border-r`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold">DataViz Explorer</h1>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Explore Section */}
          <div className="mb-8">
            <h2 className={`text-sm font-semibold mb-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Explore</h2>
            <ul className="space-y-2">
              {exploreItems.map((item) => (
                <li key={item.title}>
                  <button
                    className={`w-full flex items-center px-3 py-2 rounded-md ${
                      darkMode
                        ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                        : "hover:bg-gray-200 text-gray-700 hover:text-black"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Visualize Section */}
          <div>
            <h2 className={`text-sm font-semibold mb-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Visualize</h2>

            {/* Slider for Structures and Algorithms */}
            <div className="flex mb-4 bg-gray-200 dark:bg-gray-700 rounded-md p-1">
              <button
                className={`flex-1 py-1 px-2 rounded-md text-sm ${
                  activeTab === "structures"
                    ? "bg-white dark:bg-gray-600 shadow-sm"
                    : "hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={() => setActiveTab("structures")}
              >
                Structures
              </button>
              <button
                className={`flex-1 py-1 px-2 rounded-md text-sm ${
                  activeTab === "algorithms"
                    ? "bg-white dark:bg-gray-600 shadow-sm"
                    : "hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={() => setActiveTab("algorithms")}
              >
                Algorithms
              </button>
            </div>

            {/* Conditional Rendering for Structures or Algorithms */}
            {activeTab === "structures" && (
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/"
                    className={`w-full flex items-center px-3 py-2 rounded-md ${
                      location.pathname === "/"
                        ? darkMode
                          ? "bg-gray-800 text-white"
                          : "bg-gray-200 text-black"
                        : darkMode
                        ? "text-gray-400 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="ml-2">Home</span>
                  </Link>
                </li>
                {dataStructures.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "-")}s`} 
                      className={`w-full flex items-center px-3 py-2 rounded-md ${
                        location.pathname === `/${item.toLowerCase().replace(" ", "-")}s`
                          ? darkMode
                            ? "bg-gray-800 text-white"
                            : "bg-gray-200 text-black"
                          : darkMode
                          ? "text-gray-400 hover:text-white hover:bg-gray-800"
                          : "text-gray-600 hover:text-black hover:bg-gray-200"
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="ml-2">{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "algorithms" && (
              <ul className="space-y-1">
                {algorithms.map((algo) => (
                  <li key={algo}>
                    <button
                      className={`w-full flex items-center px-2 py-1.5 rounded-md ${
                        location.pathname === `/${algo.toLowerCase().replace(" ", "-")}`
                          ? "bg-gray-800 text-white"
                          : "hover:bg-gray-200 dark:hover:bg-gray-800"
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="ml-2">{algo}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto bg-blue-100 dark:bg-blue-900">
        <Outlet />
      </main>
    </div>
  )
}

export default App
