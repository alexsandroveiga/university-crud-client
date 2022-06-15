import { useCart } from "@/contexts";
import { FiLogOut, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";
import { Container } from "./styles";

export function Header() {
  const { pathname } = useLocation();
  const { cart } = useCart();

  return (
    <Container>
      <div className="logo">
        <h1>crud</h1>
        <span>Alex & Felipe</span>
      </div>
      <em />
      <Link to={pathname.includes('/cart') ? '/store' : '/cart'}>
        {pathname.includes('/cart') ? <FiShoppingBag size={22} /> : (
          <>
            <FiShoppingCart size={22} />
            {cart.length > 0 && <span>{cart.reduce((acumulator, { quantity }) => acumulator + quantity, 0)}</span>}
          </>
        )}
      </Link>       
      <a href=""><FiLogOut size={22} /></a>
      <div className="avatar">
        <img src="https://pbs.twimg.com/profile_images/1519479660714856448/_s4llcJw_400x400.jpg" alt="Alexsandro Veiga" />
      </div>
    </Container>
  )
}