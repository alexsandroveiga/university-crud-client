import { useDebounce } from "@/hooks"
import { Container, SubNav, Items, Heading } from "./styles"
import { useCart } from "@/contexts"
import { api } from "@/services"
import { CustomerColumn, Header, MotorcycleColumn, Order } from '@/components'

import { FiAlertCircle, FiInfo, FiMenu, FiShoppingBag } from "react-icons/fi"
import { formatValue } from "@/utils"
import { useQuery } from "react-query"
import { useCallback, useState } from "react"
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

export function Admin() {
  const [tab, setTab] = useState('motorcycles')
  const [search, setSearch] = useState('')
  const debouncedSearchTerm = useDebounce(search, 500)

  const handleTabChange = (tab: string) => {
    setTab(tab)
    setSearch('')
  }

  return (
    <Container>      
      <Header />
      <SubNav>
        <div className="menu">
          <FiMenu size={22} /> Menu
        </div>
        <Link to="/">Loja de motos</Link>
      </SubNav>

      <Heading>
        <button onClick={() => handleTabChange('motorcycles')} className={tab === 'motorcycles' ? 'active' : ''}>Motos</button>
        <button onClick={() => handleTabChange('customers')} className={tab === 'customers' ? 'active' : ''}>Clientes</button>
        <button onClick={() => handleTabChange('sales')} className={tab === 'sales' ? 'active' : ''}>Vendas</button>
        <em />
        <input type="text" placeholder="Buscar" onChange={e => setSearch(e.target.value)} value={search} />
      </Heading>

      <main>
        <Items>
          {tab === 'motorcycles' && <MotorcycleColumn debouncedSearchTerm={debouncedSearchTerm} />}
          {tab === 'customers' && <CustomerColumn debouncedSearchTerm={debouncedSearchTerm} />}
          {tab === 'sales' && <Order />}
        </Items>      
      </main>
    </Container>
  )
}