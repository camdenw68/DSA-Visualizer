"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Link } from "react-router-dom"
import { Sun, Moon, ChevronRight, Code, Zap, BookOpen, Cpu } from "lucide-react"
import ArraysPage from "./data-structures/array"

function App() {
  const [selectedItem, setSelectedItem] = useState("Array")
  const [activeTab, setActiveTab] = useState("structures")
  const [darkMode, setDarkMode] = useState(false)

  // On initial load, check localStorage for theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      // Default to dark mode
      setDarkMode(true)
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }, [])

  // Toggle dark mode and save preference in localStorage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", !darkMode ? "dark" : "light")
  }

  // Lists for Data Structures and Algorithms
  const dataStructures = ["Array", "Linked List", "Stack", "Queue", "Binary Tree", "Hash Table", "Graph"]
  const algorithms = ["Bubble Sort", "Merge Sort", "Quick Sort", "Binary Search", "Dijkstra's Algorithm"]

  const exploreItems = [
    { title: "Data Structures", icon: <Code className="h-4 w-4" /> },
    { title: "Algorithms", icon: <Zap className="h-4 w-4" /> },
    { title: "Tutorials", icon: <BookOpen className="h-4 w-4" /> },
    { title: "Complexity Analysis", icon: <Cpu className="h-4 w-4" /> },
  ]

  return (
    <div className="flex h-screen w-screen text-gray-900 dark:text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">DataViz Explorer</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Explore Section */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">Explore</h2>
            <ul className="space-y-1">
              {exploreItems.map((item) => (
                <li key={item.title}>
                  <button className="w-full flex items-center px-2 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Visualize Section */}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">Visualize</h2>
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
                {dataStructures.map((item) => (
                  <li key={item}>
                    <Link
                      to={item === "Array" ? "/arrays" : "#"}
                      className={`w-full flex items-center px-2 py-1.5 rounded-md ${
                        selectedItem === item
                          ? "bg-gray-300 dark:bg-gray-700"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setSelectedItem(item)}
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
                        selectedItem === algo
                          ? "bg-gray-300 dark:bg-gray-700"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setSelectedItem(algo)}
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
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2 className="text-3xl font-bold mb-6">Data Structures & Algorithms Visualization</h2>
                <div className="h-[70vh] w-full bg-gray-300 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <h3 className="text-xl text-gray-600 dark:text-gray-400">Graph Visualization Placeholder</h3>
                </div>
              </div>
            }
          />
          <Route path="/arrays" element={<ArraysPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App


