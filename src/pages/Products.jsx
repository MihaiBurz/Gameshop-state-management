import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CartContext } from "../store/Cart/context";
import { addToCart } from "../store/Cart/actions";
import { ThemeContext } from "../store/Theme/context";
import { addToFavourites } from "../store/Favourites/actions";
import { FavouriteContext } from "../store/Favourites/context";

export function Products() {
  const { themeState } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const { cartState, dispatch } = useContext(CartContext);
  const { favouriteDispatch } = useContext(FavouriteContext);

  function handleAddToFavorites(product) {
    const actionResult = addToFavourites(product);
    favouriteDispatch(actionResult);
  }

  const clickHandler = (product) => {
    const productToAdd = {
      id: product.dealID,
      thumb: product.thumb,
      title: product.title,
      price: product.salePrice
    };
    const actionResult = addToCart(productToAdd);
    dispatch(actionResult);
  };
  useEffect(() => {
    fetch("https://www.cheapshark.com/api/1.0/deals")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  return (
    <div className={themeState.theme === "light" ? "bg-light" : "bg-dark"}>
      <div className="d-flex flex-column align-items-center">
        <p>Nr de produse in cos : {cartState.products.length}</p>
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
                onClick={() => {
                  clickHandler(product);
                }}
                variant="success"
              >
                Adauga in Cos
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
      </div>
    </div>
  );
}
