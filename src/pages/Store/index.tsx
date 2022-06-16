import { useDebounce } from "@/hooks"
import { Container, SubNav, Items, Heading } from "./styles"
import { useCart } from "@/contexts"
import { api } from "@/services"
import { Header } from '@/components'

import { FiAlertCircle, FiInfo, FiMenu, FiShoppingBag } from "react-icons/fi"
import { formatValue } from "@/utils"
import { useQuery } from "react-query"
import { useState } from "react"
import { ImSpinner8 } from "react-icons/im"
import { Link } from "react-router-dom"

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

export function Store() {
  const [search, setSearch] = useState('')
  const debouncedSearchTerm = useDebounce(search, 500)
  const { cart, addToCart } = useCart();

  const { data, refetch, isLoading, error } = useQuery(['storeMotoData', debouncedSearchTerm], async () => {
    return api.get<Motorcycle[]>('/motorcycles', {
      params: { per_page: 50, search: debouncedSearchTerm }
    })
  })
  const motos = data?.data || []

  return (
    <Container>      
      <Header />
      <SubNav>
        <div className="menu">
          <FiMenu size={22} /> Menu
        </div>
        <Link to="/dashboard">Dashboard</Link>
      </SubNav>

      <Heading>
        <h1>{debouncedSearchTerm == '' ? 'Motos' : `Resultados para ${debouncedSearchTerm}`} <span>{motos.length}</span></h1>
        <input type="text" placeholder="Buscar" onChange={e => setSearch(e.target.value)} />
      </Heading>

      <main>        
        <Items>
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
          {!error && !isLoading && !motos.length ? (
            <div className="message">
              <FiInfo size={32} /> Nenhuma motocicleta encontrada.
            </div>
          ) : motos.map((moto, index) => {
            const quantity = moto.quantity - (cart.find(({ item: { id } }) => id === moto.id)?.quantity ?? 0)
            return (
              <div className="item" key={moto.id}>
                <div className="image">
                  <img src={!moto.image_url ? `https://picsum.photos/id/${index + 30}/500/500` : moto.image_url} />
                </div>
                <div className="info">
                  <h1>{moto.brand} - {moto.model}</h1>
                  <span className="quantity">
                    {quantity === 0 ? 'Produto esgotado' : `${quantity} em estoque`}
                  </span>
                  <div>
                    <span>Preço</span>
                    <p>{formatValue(Number(moto.price))}</p>
                  </div>
                  <button onClick={() => addToCart(moto)} className="add-to-cart" disabled={quantity === 0}>
                    <FiShoppingBag size={24} />
                  </button>
                </div>
              </div>
            )
          })}          
        </Items>  
      </main>
    </Container>
  )
}