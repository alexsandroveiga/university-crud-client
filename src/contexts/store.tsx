import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
  useEffect
} from 'react'

type CartContextData = {
  cart: CartItem[]
  addToCart: (item: Motorcycle) => void
  removeFromCart: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  emptyCart: () => void
  total: number
}

const CartContext = createContext<CartContextData | null>(null)

type CartItem = {
  item: Motorcycle
  quantity: number
}

type Motorcycle = {
  id: string
  brand: string
  model: string
  price: string
  engine_capacity: string
  maximum_power: string
  image_url: string
}

type StoreProviderProps = {
  children: React.ReactNode
}

function StoreProvider ({ children }: StoreProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const cartStorage = localStorage.getItem('@CRUD:cart')

    if (cartStorage) {
      setCart(JSON.parse(cartStorage))
    }
  }, [])

  const total = useMemo(() => {
    return cart.reduce((acumulator, { item: { price }, quantity }) => acumulator + quantity * Number(price), 0)
  }, [cart])

  const increaseQuantity = useCallback((id: string) => {
    const updatedCart = cart.map(item => {
      if (item.item.id === id) {
        return {
          item: item.item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
    localStorage.setItem('@CRUD:cart', JSON.stringify(cart))
  }, [cart])

  const emptyCart = useCallback(() => {
    setCart([])
    localStorage.removeItem('@CRUD:cart')
  }, [])

  const removeFromCart = useCallback((id: string) => {
    const updatedCart = cart.filter(item => item.item.id !== id)
    setCart(updatedCart)
    localStorage.setItem('@CRUD:cart', JSON.stringify(updatedCart))
  }, [cart])

  const decreaseQuantity = useCallback((id: string) => {
    const findItem = cart.find(item => item.item.id === id)
    if (findItem?.quantity === 1) {
      removeFromCart(id)
    } else {
      const updatedCart = cart.map(item => {
        if (item.item.id === id) {
          if (item.quantity === 1) {
            cart.filter(item => item.item.id !== id)
          }
          return {
            item: item.item,
            quantity: item.quantity - 1
          }
        }
        return item
      })
      setCart(updatedCart)
      localStorage.setItem('@CRUD:cart', JSON.stringify(cart))
    }
  }, [cart, removeFromCart])

  const addToCart = useCallback((item: Motorcycle) => {    
    const itemExists = cart.find(cartItem => cartItem.item.id === item.id);

    if (itemExists) {
      setCart(cart.map(cartItem => cartItem.item.id === item.id ? { item, quantity: cartItem.quantity + 1 } : cartItem))
    } else {
      setCart([...cart, { item, quantity: 1 }])
    }

    localStorage.setItem('@CRUD:cart', JSON.stringify(cart))
  }, [cart])

  const value = React.useMemo(() => ({
    cart,
    total,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    emptyCart
  }), [addToCart, cart, decreaseQuantity, increaseQuantity, removeFromCart, total, emptyCart])

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

function useCart (): CartContextData {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

export { StoreProvider, useCart }