"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { motion, AnimatePresence } from "framer-motion"
import { div } from "framer-motion/client"

interface ArrayPageProps {
  darkMode: boolean
}

interface ArrayVisualizationProps {
  operation: string | null
  codeExample: string
}

const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({ operation, codeExample }) => {
  const [array, setArray] = useState([1, 2, 3, 4, 5])
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null)

  useEffect(() => {
    if (operation) {
      performOperation(operation)
    }
  }, [operation])

  const performOperation = (op: string) => {
    switch (op) {
      case "Access":
        const randomIndex = Math.floor(Math.random() * array.length)
        setHighlightIndex(randomIndex)
        setTimeout(() => setHighlightIndex(null), 1500)
        break
      case "Insert":
        const newValue = Math.floor(Math.random() * 100) + 1
        const insertIndex = Math.floor(Math.random() * (array.length + 1))
        setArray([...array.slice(0, insertIndex), newValue, ...array.slice(insertIndex)])
        setHighlightIndex(insertIndex)
        setTimeout(() => setHighlightIndex(null), 1500)
        break
      case "Remove":
        if (array.length > 0) {
          const removeIndex = Math.floor(Math.random() * array.length)
          setHighlightIndex(removeIndex)
          setTimeout(() => {
            setArray(array.filter((_, i) => i !== removeIndex))
            setHighlightIndex(null)
          }, 1000)
        }
        break
      case "Iterate":
        let i = 0
        const interval = setInterval(() => {
          if (i < array.length) {
            setHighlightIndex(i)
            i++
          } else {
            clearInterval(interval)
            setHighlightIndex(null)
          }
        }, 500)
        break
      case "Search":
        const target = array[Math.floor(Math.random() * array.length)]
        let j = 0
        const searchInterval = setInterval(() => {
          if (j < array.length) {
            setHighlightIndex(j)
            if (array[j] === target) {
              clearInterval(searchInterval)
              setTimeout(() => setHighlightIndex(null), 1000)
            } else {
              j++
            }
          } else {
            clearInterval(searchInterval)
            setHighlightIndex(null)
          }
        }, 500)
        break
    }
  }

  return (
    <div className="flex-col items-center w-screen">
    <div className="flex-col items-center w-full">
      <div className=" flex-wrap gap-3 justify-center bg-gray-900 p-6 rounded-lg shadow-lg  h-full flex items-center w-2/4">
        <AnimatePresence>
          {array.map((value, index) => (
            <motion.div
              key={`${index}-${value}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                backgroundColor: highlightIndex === index ? "#fbbf24" : "#3b82f6",
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="w-16 h-16 flex items-center justify-center text-white text-lg font-bold rounded-lg shadow-md"
            >
              {value}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {operation && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md w-full">
          <SyntaxHighlighter language="python" style={vscDarkPlus} className="rounded-lg">
            {codeExample}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
    </div>
  )
}

const ArrayPage: React.FC<ArrayPageProps> = ({ darkMode }) => {
  const [currentOperation, setCurrentOperation] = useState<string | null>(null)
  const [codeExample, setCodeExample] = useState("")

  const operations = [
    { name: "Access", description: "Retrieve an element from an array using an index.", code: "my_array[2]" },
    { name: "Insert", description: "Insert an element at a specific position in the array.", code: "my_array.insert(2, 10)" },
    { name: "Remove", description: "Remove an element from the array by index.", code: "my_array.pop(2)" },
    { name: "Iterate", description: "Loop through each element in the array.", code: "for element in my_array:\n    print(element)" },
    { name: "Search", description: "Find an element in the array and return its index.", code: "my_array.index(target)" },
  ]

  const handleOperationClick = (op: { name: string; code: string }) => {
    setCurrentOperation(op.name)
    setCodeExample(op.code)
  }

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} w-full min-h-screen flex flex-col items-center p-8`}> 
      <h2 className="text-4xl font-bold mb-6 text-center">Array Visualization</h2>
      <ArrayVisualization operation={currentOperation} codeExample={codeExample} />
      <div className="mt-6 flex flex-wrap gap-3 justify-center w-full max-w-5xl">
        {operations.map((op) => (
          <button
            key={op.name}
            onClick={() => handleOperationClick(op)}
            className="px-5 py-2 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white w-40"
          >
            {op.name}
          </button>
        ))}
      </div>
      <div className="mt-12 w-full max-w-5xl">
        <h3 className="text-3xl font-bold mb-4 text-center">Operation Summaries</h3>
        {operations.map((op) => (
          <div key={op.name} className="mb-6 p-6 bg-gray-700 text-white rounded-lg shadow-md border border-gray-600">
            <h4 className="text-2xl font-bold mb-2">{op.name}</h4>
            <p className="mb-2 text-lg">{op.description}</p>
            <SyntaxHighlighter language="python" style={vscDarkPlus} className="rounded-lg">
              {op.code}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArrayPage

