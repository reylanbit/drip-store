import cartIcon from "../../assets/mini-cart.svg";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

const CartIcon = () => {
  const { getCartItemsCount } = useCart();
  const itemsCount = getCartItemsCount();

  return (
    <Link to="/pedidos" className="relative inline-flex items-center justify-center w-[44px] h-[44px]">
      <img
        src={cartIcon}
        alt="Carrinho"
        style={{ width: "24px", height: "24px" }}
      />
      {itemsCount > 0 && (
        <span className="absolute -top-[6px] -right-[8px] min-w-[18px] h-[18px] px-[4px] rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
          {itemsCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
