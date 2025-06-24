// store/favouritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helpers
const getCurrentUser = () => localStorage.getItem("currentUser");

const loadFavourites = () => {
  const user = getCurrentUser();
  if (!user) return []; // ✅ Ensure no user = no favourites
  const allFavs = JSON.parse(localStorage.getItem("favourites")) || {};
  return allFavs[user] || [];
};

const saveFavourites = (favs) => {
  const user = getCurrentUser();
  if (!user) return;
  const all = JSON.parse(localStorage.getItem("favourites")) || {};
  all[user] = favs;
  localStorage.setItem("favourites", JSON.stringify(all));
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: loadFavourites(), // ✅ loads only for logged-in user
  reducers: {
    addFavourite: (state, action) => {
      const exists = state.some((item) => item.id === action.payload.id);
      if (!exists) {
        const updated = [...state, action.payload];
        saveFavourites(updated);
        return updated;
      }
      return state;
    },
    removeFavourite: (state, action) => {
      const updated = state.filter((item) => item.id !== action.payload);
      saveFavourites(updated);
      return updated;
    },
    loadUserFavourites: () => {
      return loadFavourites(); // ✅ only loads if user exists
    },
    clearFavourites: () => {
      return []; // ✅ clears on logout
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  loadUserFavourites,
  clearFavourites,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
