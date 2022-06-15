import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard, Home, Cart, Store } from '@/pages'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}