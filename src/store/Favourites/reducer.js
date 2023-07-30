import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "./action-types";

export const InitialFavouriteState = {
  products: []
};

export function FavouritesReducer(state, actionResult) {
  switch (actionResult.type) {
    case ADD_TO_FAVOURITES: {
      const foundProduct = state.products.find((product) => {
        return product.id === actionResult.payload.id;
      });

      if (foundProduct) {
        return state;
      } else {
        return {
          products: [...state.products, actionResult.payload]
        };
      }
    }
    case REMOVE_FROM_FAVOURITES: {
      const filteredProducts = state.products.filter((product) => {
        return product.id !== actionResult.payload;
      });
      return {
        products: filteredProducts
      };
    }
    default:
      return state;
  }
}
