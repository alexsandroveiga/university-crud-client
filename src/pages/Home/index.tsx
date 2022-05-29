import { api } from "@/services"
import { Header } from "@/components"
import { Container, Content, Cart } from "./styles"
import { useCart } from "@/contexts"

import { useEffect, useState } from "react"
import { FiArrowDownCircle, FiArrowUpCircle, FiShoppingCart, FiXCircle } from 'react-icons/fi'

type Motorcycle = {
  id: string
  brand: string
  model: string
  price: string
  engine_capacity: string
  maximum_power: string
  image_url: string
}

export function Home() {
  const { addToCart, cart, increaseQuantity, decreaseQuantity, removeFromCart, total } = useCart()
  const [motos, setMotos] = useState<Motorcycle[]>([])
  const [cartIsVisible, setCartIsVisible] = useState(false)

  useEffect(() => {
    async function loadMotos() {
      const { data } = await api.get('/motorcycles')
      setMotos(data)
    }
    loadMotos()
  }, [])

  return (
    <Container>
      <Header>
        <h1>loja &bull;&bull;&bull;</h1> 
        <a className="cart" onClick={() => setCartIsVisible(!cartIsVisible)}>
          <FiShoppingCart />
          {cart.length > 0 && <span>{cart.reduce((acumulator, { quantity }) => acumulator + quantity, 0)}</span>}
        </a>
      </Header>

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
      <Content>
        <h1>Loja</h1>
        {motos?.map(moto => (
          <div key={moto.id}>
            <img src={moto.image_url} width="100" height="auto" />
            <h1>{moto.brand} - {moto.price}</h1>
            <p>{moto.price}</p>

            <button onClick={() => addToCart(moto)}>Adicionar ao carrinho</button>
          </div>
        ))}
      </Content>
    </Container>
  )
}