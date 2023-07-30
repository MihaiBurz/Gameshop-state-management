import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../store/Cart/context";
import { ThemeContext } from "../store/Theme/context";
import { FavouriteContext } from "../store/Favourites/context";

export function Header() {
  const { themeState } = useContext(ThemeContext);
  const { cartState } = useContext(CartContext);
  const { favouriteState } = useContext(FavouriteContext);
  return (
    <header className={themeState.theme === "light" ? "bg-light " : "bg-dark"}>
      <div className="d-flex justify-content-between mx-4 ">
        <Link
          className={
            themeState.theme === "light" ? "text-primary" : "text-white"
          }
          to="/"
        >
          Acasa
        </Link>
        <div>
          <Link
            to="/products"
            className={
              themeState.theme === "light"
                ? "text-primary p-3"
                : "text-white p-3"
            }
          >
            Produse
          </Link>
          <Link
            className={
              themeState.theme === "light" ? "text-primary" : "text-white"
            }
            to="/cart"
          >
            Cos({cartState.products.length})
          </Link>
          <Link
            className={
              themeState.theme === "light"
                ? "text-primary p-3"
                : "text-white p-3"
            }
            to="/favourites"
          >
            Favorite({favouriteState.products.length})
          </Link>
        </div>
      </div>
    </header>
  );
}
