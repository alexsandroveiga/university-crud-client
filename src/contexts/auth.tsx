import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
  useEffect
} from 'react'
import { toast } from 'react-toastify'

type Customer = {
  id: string
  name: string
  email: string
  gender: string
  identifier: string
  address: string
  phone: string
  state: string
  city: string
  zip_code: string
  avatar_url: string
}

type AuthContextData = {
  login(customer: Customer): void
  logout(): void
  customer: Customer | undefined
}

const AuthContext = createContext<AuthContextData | null>(null)

type AuthProviderProps = {
  children: React.ReactNode
}

function AuthProvider ({ children }: AuthProviderProps) {
  const [customer, setCustomer] = useState<Customer>()

  useEffect(() => {
    const customerStorage = localStorage.getItem('@CRUD:customer')

    if (customerStorage) {
      setCustomer(JSON.parse(customerStorage))
    }
  }, [])

  const logout = useCallback(() => {
    setCustomer(undefined)
    localStorage.removeItem('@CRUD:customer')
    toast('Você saiu do sistema!', { type: 'success' })
  }, [])

  const login = useCallback((customer: Customer) => {    
    setCustomer(customer)
    localStorage.setItem('@CRUD:customer', JSON.stringify(customer))
    toast('Login feito com sucesso!', { type: 'success' })
  }, [])

  const value = React.useMemo(() => ({
    customer, 
    login,
    logout
  }), [customer, login, logout])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

function useAuth (): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }