import React, { useEffect, useState } from "react";
import {
  getFavourites,
  removeFromFavourites
} from "../utils/favouritestorage.js";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button
} from "@mui/material";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  // Load favourites on mount and when tab regains focus
  useEffect(() => {
    const loadFavourites = () => {
      const favs = getFavourites();
      setFavourites(favs);
    };

    loadFavourites();

    // Refresh favourites when tab regains focus
    window.addEventListener("focus", loadFavourites);

    return () => {
      window.removeEventListener("focus", loadFavourites);
    };
  }, []);

  const handleRemove = (productId) => {
    removeFromFavourites(productId);
    setFavourites((prev) => prev.filter((item) => item.id !== productId));
  };

  if (favourites.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography sx={{ color: "black" }} variant="h5">
          No favourites yet 💔
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography sx={{ color: "black" }} variant="h4" gutterBottom>
        ❤️ Your Favourites
      </Typography>

      <Grid container spacing={3}>
        {favourites.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ backgroundColor: "#fff", color: "#000" }}>
              <CardMedia
                component="img"
                image={product.thumbnail}
                alt={product.title}
                height="200"
                sx={{
                  objectFit: "contain",
                  backgroundColor: "#f5f5f5"
                }}
              />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2">${product.price}</Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemove(product.id)}
                >
                  ❌ Remove
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
