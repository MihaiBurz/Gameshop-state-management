import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { CartContext } from "../store/Cart/context";
import { removeFromCart } from "../store/Cart/actions";
import { ThemeContext } from "../store/Theme/context";

export function Cart() {
  const { themeState } = useContext(ThemeContext);
  const { cartState, dispatch } = useContext(CartContext);

  const deleteHandler = (id) => {
    const actionResult = removeFromCart(id);
    dispatch(actionResult);
  };

  const imagedStyle = {
    width: 120,
    height: 80
  };

  return (
    <div className={themeState.theme === "light" ? "bg-light" : "bg-dark"}>
      {cartState.products.length === 0 ? (
        <p>Nu ai produse in cos.</p>
      ) : (
        cartState.products.map((product) => {
          const totalProductPrice = product.price * product.quantity;
          return (
            <div key={product.id} className="m-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <img style={imagedStyle} src={product.image} alt="" />
                <strong
                  className={
                    themeState.theme === "light" ? "text-dark" : "text-light"
                  }
                >
                  {product.name}
                </strong>
                <p
                  className={
                    themeState.theme === "light" ? "text-dark" : "text-light"
                  }
                >
                  {product.quantity} X {product.price}$ = {totalProductPrice}$
                </p>
              </div>
              <Button
                variant="danger"
                onClick={() => deleteHandler(product.id)}
              >
                Remove
              </Button>
            </div>
          );
        })
      )}
    </div>
  );
}
