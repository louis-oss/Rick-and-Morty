import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  authenticated: false,
  username: '',
};

function storeReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FAVORITE': 
    return {
      ...state,
      favorites: [...state.favorites, action.favorite],
    };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites:state.favorites.filter(id => id !== action.favoriteId),
      };
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        authenticated: action.authenticated
      }
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.username,
      }
    default:
      return state;
  }
};

const Store = configureStore({
  reducer: {
    Store: storeReducer
  }
})

export { Store };