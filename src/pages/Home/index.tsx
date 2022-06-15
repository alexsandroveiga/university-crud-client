import { api } from "@/services"
import { Header } from "@/components"
import { Container, Content, Cart, Grid, Heading } from "./styles"
import { useCart } from "@/contexts"

import { useState } from "react"
import { FiArrowDownCircle, FiArrowUpCircle, FiShoppingBag, FiShoppingCart, FiXCircle } from 'react-icons/fi'
import { useQuery } from "react-query";
import { useDebounce } from "@/hooks"
import { formatValue } from "@/utils"

type Motorcycle = {
  id: string
  brand: string
  model: string
  price: string
  engine_capacity: string
  maximum_power: string
  image_url: string
  quantity: number
}

export function Home() {
  const [page] = useState(1)
  const { addToCart, cart, increaseQuantity, decreaseQuantity, removeFromCart, total } = useCart()
  const [cartIsVisible, setCartIsVisible] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearchTerm = useDebounce(search, 500)

  const { data, refetch, isLoading, error } = useQuery(['motorcycleDataStore', page, debouncedSearchTerm], async () => {
    return api.get<Motorcycle[]>('/motorcycles', {
      params: { per_page: 6, page: 1, search: debouncedSearchTerm }
    })
  })
  const motos = data?.data || []

  return (
    <Container>
      <Header />

      <Cart className={cartIsVisible ? 'visible' : ''} >
        <h1>Carrinho</h1>
        <div className="cart-items">
        {cart.map(({ item: moto, quantity }) => (
          <div key={moto.id}>
            <div className="item-header">
              <img src={moto.image_url} alt={moto.model} />
              <div className="actions">
                <button onClick={() => decreaseQuantity(moto.id)} disabled={quantity === 1}>
                  <FiArrowDownCircle />
                </button>
                <span>{quantity}</span>
                <button onClick={() => increaseQuantity(moto.id)}>
                  <FiArrowUpCircle />
                </button>
              </div>              
              <button onClick={() => removeFromCart(moto.id)}><FiXCircle size={24} /></button>
            </div>
            <h1>{moto.brand} - {moto.price}</h1>
            <p>{moto.price}</p>            
          </div>
        ))}
        </div>        
      </Cart>

      <Heading>
        <h1><span>Motos</span>Destaques</h1>
      </Heading>
      <Grid>
        {motos.map((moto, index) => {
          const quantity = moto.quantity - (cart.find(({ item: { id } }) => id === moto.id)?.quantity ?? 0)
          return (
            <div className="item" key={moto.id}>
              <div className="item-image">
                <img src={!moto.image_url ? `https://picsum.photos/id/${index + 30}/500/500` : moto.image_url} />
              </div>
              <div className="item-info">
                <h1>{moto.brand} - {moto.model}</h1>
                <span className="quantity">
                  {quantity === 0 ? 'Produto esgotado' : `${quantity} em estoque`}
                </span>
                <div>
                  <span>Preço</span>
                  <p>{formatValue(Number(moto.price))}</p>
                </div>
                <button onClick={() => addToCart(moto)} className="add-to-cart" disabled={quantity === 0}>
                  <FiShoppingBag size={32} />
                </button>
              </div>
            </div>
          )
        })}
      </Grid>
    </Container>
  )
}