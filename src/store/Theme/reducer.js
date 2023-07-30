export const initialState = {
    theme: "dark"
  };
  
  export function themeReducer(state, actionResult) {
    switch (actionResult.type) {
      case "CHANGE_TO_DARK": {
        const newState = {
          theme: "dark"
        };
        return newState;
      }
      case "CHANGE_TO_LIGHT": {
        const newState = {
          theme: "light"
        };
        return newState;
      }
      default: {
        return state;
      }
    }
  }
  