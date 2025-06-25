import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavourite } from "../store/favouritesSlice";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Favourites() {
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUserName");
    if (!user) {
      setNotLoggedIn(true);
    }
  }, []);

  const handleRemove = (productId) => {
    dispatch(removeFavourite(productId));
  };

  const total = favourites.reduce((sum, item) => sum + item.price, 0);

  
  if (notLoggedIn) {
    return (
      <Dialog open>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography>Please log in to view your favourites.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            color="primary"
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  
  if (favourites.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography sx={{ color: "black" }} variant="h5">
          Your cart is empty 💔
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        p: 4,
      }}
    >
      {}
      <Box sx={{ flex: 3 }}>
        <Typography sx={{ color: "black", mb: 2 }} variant="h4">
          Your Favourites
        </Typography>
        <Grid container spacing={3}>
          {favourites.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "#fff",
                  color: "#000",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  height="200"
                  sx={{
                    objectFit: "contain",
                    backgroundColor: "#f5f5f5",
                    p: 1,
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemove(product.id)}
                  >
                    ❌ REMOVE
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {}
      <Box
        sx={{
          flex: 1,
          position: { md: "sticky" },
          top: { md: 100 },
          alignSelf: "flex-start",
          minWidth: 250,
        }}
      >
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
          elevation={3}
        >
          <Typography variant="h6" sx={{ color: "black", mb: 2 }}>
            Cart Summary
          </Typography>
          {favourites.map((item) => (
            <Typography key={item.id} sx={{ color: "black" }}>
              • {item.title} — ${item.price.toFixed(2)}
            </Typography>
          ))}
          <Divider sx={{ my: 1 }} />
          <Typography sx={{ color: "black", fontWeight: "bold", mb: 2 }}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/address")}
            sx={{
              backgroundColor: "#4a148c",
              fontSize: "0.9rem",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#6d4c41",
              },
            }}
          >
            ✅ Proceed to Checkout
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
