import { CustomerColumn, MotorcycleColumn, StoreColumn } from "@/components"
import { Container, Sidebar, Navigation, Store } from "./styles"
import { useCart } from "@/contexts"
import { useDebounce } from "@/hooks"
import { api } from "@/services"

import { FiCamera, FiShoppingBag, FiShoppingCart, FiUsers } from "react-icons/fi"
import { FaMotorcycle } from "react-icons/fa"
import { useState } from "react"
import { useQuery } from "react-query"
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

export function Dashboard() {
  const [tab, setTab] = useState('');
  const [page] = useState(1)
  const [search, setSearch] = useState('')
  const debouncedSearchTerm = useDebounce(search, 500)
  const { cart, addToCart } = useCart()
  const { data, refetch, isLoading, error } = useQuery(['motorcycleDataStore', page, debouncedSearchTerm], async () => {
    return api.get<Motorcycle[]>('/motorcycles', {
      params: { per_page: 5, page: page, search: debouncedSearchTerm }
    })
  })
  const motos = data?.data || []

  return (
    <Container>      
      <Navigation>
        <div className="logo">
          <h1>&bull; Crud &bull;</h1>
          <h2>Alex & Felipe</h2>
        </div>
        <ul>
          <li className={tab === 'motorcycles' ? 'active' : ''} onClick={() => setTab('motorcycles')}><FaMotorcycle size={32} /></li>
          <li className={tab === 'customers' ? 'active' : ''} onClick={() => setTab('customers')}><FiUsers size={32} /></li>
          <li className={tab === 'store' ? 'active' : ''} onClick={() => setTab('store')}>
            <FiShoppingCart size={32} />
            {cart.length > 0 && <span>{cart.reduce((acumulator, { quantity }) => acumulator + quantity, 0)}</span>}
          </li>
        </ul>
      </Navigation>
      <Sidebar className={tab !== '' ? 'active' : ''}>
        {tab === 'motorcycles' && <MotorcycleColumn />}
        {tab === 'customers' && <CustomerColumn />}
        {tab === 'store' && <StoreColumn />}
      </Sidebar>
      <Store>
        <div className="section-header">
          <h1><span>&bull;</span> Loja</h1>
        </div>
        <div className="section-content">
          <div className="items">
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
          </div>
        </div>
      </Store>
    </Container>
  )
}