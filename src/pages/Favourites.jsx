import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { FavouriteContext } from "../store/Favourites/context";
import { removeFromFavourites } from "../store/Favourites/actions";
import { ThemeContext } from "../store/Theme/context";

export function Favourites() {
  const { favouriteState, favouriteDispatch } = useContext(FavouriteContext);
  const { themeState } = useContext(ThemeContext);

  const deleteHandler = (productId) => {
    const actionResult = removeFromFavourites(productId);
    favouriteDispatch(actionResult);
  };
  const imagedStyle = {
    width: 120,
    height: 80
  };

  return (
    <div className={themeState.theme === "light" ? "bg-light" : "bg-dark"}>
      {favouriteState.products.length === 0 ? (
        <p>Nu ai produse favorite.</p>
      ) : (
        favouriteState.products.map((product) => {
          return (
            <div key={product.id} className="my-3">
              <img style={imagedStyle} src={product.image} alt="" />
              <h2
                className={
                  themeState.theme === "light" ? "text-dark" : "text-light"
                }
              >
                {product.name}
              </h2>
              <div
                className={
                  themeState.theme === "light" ? "text-dark" : "text-light"
                }
              >
                <strong>{product.price}$</strong>
              </div>
              <Button
                variant="danger"
                onClick={() => deleteHandler(product.id)}
              >
                Șterge de la favorite
              </Button>
            </div>
          );
        })
      )}
    </div>
  );
}
