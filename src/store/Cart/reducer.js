import { ADD_TO_CART, REMOVE_FROM_CART } from "./action-types";

export const initialState = {
  products: []
};

export function cartReducer(state, actionResult) {
  switch (actionResult.type) {
    case ADD_TO_CART: {
      const newProduct = actionResult.payload;
      const newState = {
        products: [...state.products, newProduct]
      };

      return newState;
    }
    case REMOVE_FROM_CART: {
      const itemIdToRemove = actionResult.payload;
      const newState = {
        products: state.products.filter(
          (product) => product.id !== itemIdToRemove
        )
      };
      return newState;
    }
    default:
      return state;
  }
}
