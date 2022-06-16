import { useAuth, useCart } from "@/contexts";
import { FiLogOut, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";
import { Container } from "./styles";

export function Header() {
  const { pathname } = useLocation();
  const { cart } = useCart();
  const { logout, login, customer } = useAuth()

  return (
    <Container>
      <Link to="/" className="logo">
        <h1>crud</h1>
        <span>Alex & Felipe</span>
      </Link>
      <em />
      <Link to={pathname.includes('/cart') ? '/' : '/cart'} className="button">
        {pathname.includes('/cart') ? <FiShoppingBag size={22} /> : (
          <>
            <FiShoppingCart size={22} />
            {cart.length > 0 && <span>{cart.reduce((acumulator, { quantity }) => acumulator + quantity, 0)}</span>}
          </>
        )}
      </Link>       
      {customer && (
        <>
          <a onClick={logout } className="button"><FiLogOut size={22} /></a>
          <div className="avatar">
            <img src={customer.avatar_url} alt={customer.name} />
          </div>
        </>
      )}
    </Container>
  )
}