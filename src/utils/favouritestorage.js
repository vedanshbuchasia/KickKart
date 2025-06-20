const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};

const getAllFavourites = () => {
  return JSON.parse(localStorage.getItem("favourites")) || {};
};

const saveAllFavourites = (favs) => {
  localStorage.setItem("favourites", JSON.stringify(favs));
};

export const getFavourites = () => {
  const user = getCurrentUser();
  const allFavs = getAllFavourites();
  return allFavs[user] || [];
};

export const addToFavourites = (product) => {
  const user = getCurrentUser();
  if (!user) return false;

  const allFavs = getAllFavourites();
  const userFavs = allFavs[user] || [];

  const exists = userFavs.some((p) => p.id === product.id);
  if (!exists) {
    allFavs[user] = [...userFavs, product];
    saveAllFavourites(allFavs);
    return true;
  }

  return false;
};



export const removeFromFavourites = (productId) => {
  const user = getCurrentUser();
  if (!user) return;

  const allFavs = getAllFavourites();
  allFavs[user] = (allFavs[user] || []).filter((p) => p.id !== productId);
  saveAllFavourites(allFavs);
};

export const isFavourite = (productId) => {
  const userFavs = getFavourites();
  return userFavs.some((p) => p.id === productId);
};
