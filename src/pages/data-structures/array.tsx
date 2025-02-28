"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface ArrayItem {
  value: number
  key: number
  isNew: boolean
}

const ArraysPage: React.FC = () => {
  const [array, setArray] = useState<ArrayItem[]>([
    { value: 5, key: 1, isNew: false },
    { value: 2, key: 2, isNew: false },
    { value: 8, key: 3, isNew: false },
    { value: 1, key: 4, isNew: false },
    { value: 9, key: 5, isNew: false },
  ])
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setArray(array.map((item) => ({ ...item, isNew: false })))
    }, 500)
    return () => clearTimeout(timer)
  }, [array])

  const handleAdd = () => {
    const newValue = Number.parseInt(inputValue)
    if (!isNaN(newValue)) {
      setArray([...array, { value: newValue, key: Date.now(), isNew: true }])
      setInputValue("")
    }
  }

  const handleRemove = () => {
    if (array.length > 0) {
      setArray(array.slice(0, -1))
    }
  }

  const handleSearch = () => {
    const searchNum = Number.parseInt(searchValue)
    if (!isNaN(searchNum)) {
      const index = array.findIndex((item) => item.value === searchNum)
      setHighlightIndex(index)
      setTimeout(() => setHighlightIndex(null), 2000)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Array Visualization</h2>
      <div className="flex space-x-2 mb-4">
        {array.map((item, index) => (
          <div
            key={item.key}
            className={`w-12 h-12 flex items-center justify-center border-2 transition-all duration-300 ${
              index === highlightIndex ? "border-yellow-500 bg-yellow-200" : "border-gray-300"
            } ${item.isNew ? "scale-110" : "scale-100"}`}
          >
            {item.value}
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="px-2 py-1 border rounded text-black"
          placeholder="Enter a number"
        />
        <button onClick={handleAdd} className="px-4 py-2 bg-green-500 text-white rounded">
          Add
        </button>
        <button onClick={handleRemove} className="px-4 py-2 bg-red-500 text-white rounded">
          Remove
        </button>
      </div>
      <div className="flex space-x-2">
        <input
          type="number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="px-2 py-1 border rounded text-black"
          placeholder="Search for a number"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </div>
    </div>
  )
}


export default ArraysPage
