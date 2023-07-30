import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { addToCart } from "../store/Cart/actions";
import { CartContext } from "../store/Cart/context";
import { ThemeContext } from "../store/Theme/context";
import { FavouriteContext } from "../store/Favourites/context";
import { changeToDark, changeToLight } from "../store/Theme/actions";
import { addToFavourites } from "../store/Favourites/actions";

export function Home() {
  const { dispatch } = useContext(CartContext);
  const { themeState, themeDispatch } = useContext(ThemeContext);
  const { favouriteDispatch } = useContext(FavouriteContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://www.cheapshark.com/api/1.0/deals?pageSize=4")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  function handleAddToFavorites(product) {
    const actionResult = addToFavourites(product);
    favouriteDispatch(actionResult);
  }

  function handleAddToCart(product) {
    const actionResult = addToCart(product);
    dispatch(actionResult);
  }
  const changeThemeHandler = () => {
    if (themeState.theme === "light") {
      const actionResult = changeToDark();
      themeDispatch(actionResult);
    } else {
      const actionResult = changeToLight();
      themeDispatch(actionResult);
    }
  };

  return (
    <div className={themeState.theme === "light" ? "bg-light" : "bg-dark"}>
      <div className="d-flex flex-column align-items-center">
        <Button className="mt-3" onClick={changeThemeHandler}>
          Schimba Tema
        </Button>
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: "18rem" }}
              className="m-3"
            >
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button
                variant="success"
                onClick={() => {
                  handleAddToCart({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice
                  });
                }}
              >
                Adaugă în coș
              </Button>
              <Button
                variant="outline-success"
                onClick={() => {
                  handleAddToFavorites({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice
                  });
                }}
              >
                Adaugă la favorite
              </Button>
            </Card>
          );
        })}
        <Link to="/products">Vezi toate produsele</Link>
      </div>
    </div>
  );
}
