import { CustomerColumn, MotorcycleColumn } from "@/components"
import { Container, Sidebar, Items } from "./styles"

export function Dashboard() {
  return (
    <Container>      
      <Sidebar>
        <h1>Menu</h1>
        <p>Em breve...</p>
      </Sidebar>
      <main>
        <h1>Dashboard</h1>
        <Items>
          <MotorcycleColumn />
          <CustomerColumn /> 
        </Items>              
      </main>
      
    </Container>
  )
}