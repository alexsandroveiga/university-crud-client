import { api } from "@/services";
import { formatValue } from "@/utils";
import { Container } from "./styles";
import { Modal, Input } from "@/components";
import { useDebounce } from "@/hooks";

import { useState, useCallback, useEffect } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle, FiEdit3, FiInfo, FiLoader, FiMinusCircle, FiPlusCircle, FiSearch, FiXCircle } from "react-icons/fi"
import { useCart } from "@/contexts";

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

type FormData = {
  brand: string
  model: string
  price: number
  engine_capacity: number
  maximum_power: number
  image_url: string
  quantity: number
}

export function StoreColumn() {
  const { cart, decreaseQuantity, increaseQuantity, total, removeFromCart } = useCart()

  return (
    <Container>
      <div className="column-header">
        <h1><span>&bull;</span> Carrinho</h1>
      </div>
      {cart.map((cart, index) => (
        <div key={cart.item.id} className="item">
          <div className="content">
            <img src={!cart.item.image_url ? `https://picsum.photos/id/${index + 100}/500/500` : cart.item.image_url} width="100" height="auto" />
            
          </div>    
          <div className="info">
            <h1>{cart.item.brand} - {cart.item.model}</h1>
            <p>{cart.quantity} unidade{cart.quantity > 1 && 's'}</p>
            <p className="featured">{formatValue(Number(cart.item.price) * cart.quantity)}</p>
          </div>
          <em />      
          <div className="actions">
            <button onClick={() => increaseQuantity(cart.item.id)}><FiPlusCircle size={22} /></button>
            <button onClick={() => decreaseQuantity(cart.item.id)} disabled={cart.quantity === 1}><FiMinusCircle  size={22} /></button>
            <button onClick={() => removeFromCart(cart.item.id)}><FiXCircle size={22} /></button>
          </div>
        </div>
      ))}
      <div className="column-footer">
        <span>Total</span>
        <h1>{formatValue(Number(total))}</h1>
      </div>      
    </Container>
  )
}