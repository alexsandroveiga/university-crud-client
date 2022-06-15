import { Container, SubNav, Items } from "./styles"
import { useCart } from "@/contexts"
import { api } from "@/services"
import { Header } from "@/components"

import { FiLogOut, FiMenu, FiMinusCircle, FiPlusCircle, FiShoppingBag, FiShoppingCart, FiTrash, FiTrash2, FiUsers, FiXCircle } from "react-icons/fi"
import { formatValue } from "@/utils"
import { Link, useLocation } from "react-router-dom"
import { toast } from "react-toastify"

export function Cart() {
  const { pathname } = useLocation();
  const { cart, increaseQuantity, decreaseQuantity, total, removeFromCart, emptyCart } = useCart();

  async function order() {
    await api.post('/orders', {
      customer: 'b4e05039-3fb3-4dc0-8e22-a23c7cf1308d',
      motorcycles: cart.map((cartItem) => ({
        motorcycle: cartItem.item.id,
        quantity: cartItem.quantity,
        price: Number(cartItem.item.price) * cartItem.quantity
      }))
    })
    emptyCart();
    toast('Motocicleta adicionada com sucesso!', { type: 'success' })
  }

  return (
    <Container>      
      <Header />
      <SubNav>
        <div className="menu">
          <FiMenu size={22} /> Menu
        </div>
        <a href="">Dashboard</a>
      </SubNav>
      <main>
        <Items>
          {!cart.length && (
            <div className="empty">
              <FiShoppingBag size={22} /> Carrinho vazio
            </div>
          )}
          {cart.map((cartItem, index) => (
            <div key={cartItem.item.id} className="item">
              <div className="image">
                <img src={!cartItem.item.image_url ? `https://picsum.photos/id/${index + 1}/500/500` : cartItem.item.image_url} />
              </div> 
              <div className="info">
                <h1>{cartItem.item.brand} - {cartItem.item.model}</h1>
                <p>{formatValue(Number(cartItem.item.price) * cartItem.quantity)}</p>
              </div>
              <div className="actions">
                <button onClick={() => decreaseQuantity(cartItem.item.id)} disabled={cartItem.quantity === 1}><FiMinusCircle  size={22} /></button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => increaseQuantity(cartItem.item.id)}><FiPlusCircle size={22} /></button>
                <button onClick={() => removeFromCart(cartItem.item.id)}><FiTrash2 size={22} /></button>
              </div>
            </div>
          ))}
          <div className="order">
            <div>
              <span>Total</span>
              <h1>{formatValue(Number(total))}</h1>
            </div>
            <Link to="/store">Continuar comprando</Link>
            <button onClick={order} disabled={cart.length === 0}>Finalizar compra</button>
          </div> 
        </Items>  
      </main>
    </Container>
  )
}