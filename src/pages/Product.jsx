import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { CartContext } from "../store/Cart/context";
import { addToCart } from "../store/Cart/actions";
import { FavouriteContext } from "../store/Favourites/context";
import { addToFavourites } from "../store/Favourites/actions";

export function Product() {
  const { dispatch } = useContext(CartContext);
  const { favouriteDispatch } = useContext(FavouriteContext);
  let { id } = useParams();
  id = decodeURI(id);
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?id=${id}`)
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      });
  }, [id]);

  function handleAddToCart(product) {
    const actionResult = addToCart(product);
    dispatch(actionResult);
  }

  function handleAddToFavorites(product) {
    const actionResult = addToFavourites(product);
    favouriteDispatch(actionResult);
  }

  const productInfo = product.gameInfo || {};
  const { thumb, name, salePrice, retailPrice } = productInfo;
  console.log(productInfo);

  return (
    <div className="d-flex my-3">
      <div className="w-50">
        <div>
          <img src={thumb} alt="" />
        </div>
        <h1>{name}</h1>
      </div>
      <div className="w-50">
        <p>Preț întreg: {retailPrice}$</p>
        <p>
          Preț redus: <span className="text-danger">{salePrice}$</span>
        </p>
        <Button
          variant="success"
          onClick={() => {
            handleAddToCart({
              id,
              image: thumb,
              name: name,
              price: retailPrice
            });
          }}
        >
          Adaugă în coș
        </Button>
        <Button
          variant="outline-success"
          onClick={() => {
            handleAddToFavorites({
              id,
              image: thumb,
              name: name,
              price: retailPrice
            });
          }}
        >
          Adaugă la favorite
        </Button>
      </div>
    </div>
  );
}
