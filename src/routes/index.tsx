import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard, Home } from '@/pages'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}