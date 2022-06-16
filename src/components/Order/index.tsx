import { api } from "@/services";

import { useQuery } from "react-query";
import { FiAlertCircle, FiInfo, FiXCircle } from "react-icons/fi"
import { toast } from "react-toastify";
import { Form } from "@unform/web";
import { ImSpinner8 } from "react-icons/im";

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

type Order = {
  id: string
  customer: Customer
  motorcycles: Array<{
    motorcycle: Motorcycle
    quantity: number
  }>
}

type FormData = {
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

export function Order() {
  const { data, refetch, isLoading, error } = useQuery(['orderData'], async () => {
    return api.get<Order[]>('/orders', {
      params: { per_page: 50 }
    })
  })
  
  const handleDelete = async (id: string) => {
    try {      
      await api.delete(`/orders/${id}`)
      refetch()
      toast('Compra cancelada com sucesso!', { type: 'success' })
    } catch(err) {
      toast('Erro ao cancelar cliente!', { type: 'error' })
    }
  }

  const orders = data?.data || []

  return (
    <>
      {error && (
        <div className="message">
          <FiAlertCircle size={32} /> Ocorreu um erro inesperado.
        </div>
      )}
      {!error && isLoading && (
        <div className="message">
          <ImSpinner8 size={32} className="loading" /> Carregando...
        </div>
      )}
      {!error && !isLoading && !orders.length ? (
        <div className="message">
          <FiInfo size={32} /> Nenhuma compra feita.
        </div>
      ) : orders?.map((order, index) => (
        <div key={order.id} className="item">
          <div className="content">
            <img src={!order.customer.avatar_url ? `https://picsum.photos/id/${index + 1}/500/500` : order.customer.avatar_url} width="100" height="auto" />
            <div className="info">
              <h1>{order.customer.name}</h1>
              <p>{order.customer.email}</p>
              <p className="featured">Compras</p>
              {order.motorcycles.map(({ motorcycle: moto, quantity }) => (
                <div key={moto.id} className="moto">
                  <img src={!moto.image_url ? `https://picsum.photos/id/${index + 1}/500/500` : moto.image_url} width="100" height="auto" />
                  <div>
                    <h1>{moto.brand} - {moto.model}</h1>
                    <span>{quantity} {quantity > 1 ? 'unidades' : 'unidade'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="actions">
            <button onClick={() => handleDelete(order.id)}><FiXCircle size={22} /></button>
          </div>
        </div>
      ))}
    </>
  )
}