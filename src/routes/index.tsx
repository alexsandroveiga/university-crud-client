import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Admin, Cart, Store } from '@/pages'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}