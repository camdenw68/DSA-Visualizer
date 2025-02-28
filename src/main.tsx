import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import ArraysPage from "./pages/data-structures/array"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arrays" element={<ArraysPage />} />
      </Routes>
    </Router>
  </StrictMode>,
)
