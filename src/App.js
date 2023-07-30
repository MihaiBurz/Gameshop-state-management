import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { Header } from "./components/Header";
import { Favourites } from "./pages/Favourites";
import { CartContext } from "./store/Cart/context";
import { useReducer } from "react";
import { cartReducer, initialState } from "./store/Cart/reducer";
import {
  themeReducer,
  initialState as themeInitialState
} from "./store/Theme/reducer";
import { ThemeContext } from "./store/Theme/context";
import {
  FavouritesReducer,
  InitialFavouriteState
} from "./store/Favourites/reducer";
import { FavouriteContext } from "./store/Favourites/context";

export default function App() {
  const [favouriteState, favouriteDispatch] = useReducer(
    FavouritesReducer,
    InitialFavouriteState
  );
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    themeInitialState
  );
  const cartContext = {
    cartState,
    dispatch
  };

  const themeContext = {
    themeState,
    themeDispatch
  };
  const favouriteContext = {
    favouriteState,
    favouriteDispatch
  };
  return (
    <div className="App primary">
      <CartContext.Provider value={cartContext}>
        <FavouriteContext.Provider value={favouriteContext}>
          <ThemeContext.Provider value={themeContext}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favourites" element={<Favourites />} />
            </Routes>
          </ThemeContext.Provider>
        </FavouriteContext.Provider>
      </CartContext.Provider>
    </div>
  );
}
