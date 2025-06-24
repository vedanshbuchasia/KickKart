import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {
  const [favourites, setFavourites] = useState([]);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser"); // ✅ Fixed key
    if (!user) {
      navigate("/login");
      return;
    }

    // ✅ Load favourites for current user
    const allFavs = JSON.parse(localStorage.getItem("favourites")) || {};
    setFavourites(allFavs[user] || []);

    // ✅ Load selected address
    const selected = JSON.parse(localStorage.getItem("selectedAddress"));
    setAddress(selected);
  }, [navigate]);

  const total = favourites.reduce((sum, item) => sum + item.price, 0);

  const handleConfirm = () => {
    alert("🎉 Order placed successfully!");
    navigate("/");
  };

  if (!favourites.length || !address) {
    return (
      <Box mt={5} textAlign="center">
        <Alert severity="info">
          No order data found. Please add items to cart and select an address.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#4a148c" }}>
        Order Summary
      </Typography>

      {/* Product List */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          🛍 Products
        </Typography>
        <Grid container spacing={2}>
          {favourites.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ display: "flex", backgroundColor: "#fafafa" }}>
                <CardMedia
                  component="img"
                  image={item.thumbnail}
                  alt={item.title}
                  sx={{ width: 100, objectFit: "contain", p: 1 }}
                />
                <CardContent>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography variant="body2">₹{item.price.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Address */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          🚚 Shipping Address
        </Typography>
        <Typography>{address.line1}</Typography>
        {address.line2 && <Typography>{address.line2}</Typography>}
        <Typography>
          {address.state} - {address.zipCode}
        </Typography>
      </Paper>

      {/* Total & Confirm */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">💰 Total: ₹{total.toFixed(2)}</Typography>
        <Divider sx={{ my: 2 }} />
        <Button
          variant="contained"
          fullWidth
          color="success"
          onClick={handleConfirm}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            py: 1.5,
            fontSize: "1rem",
          }}
        >
          ✅ Confirm Order
        </Button>
      </Paper>
    </Box>
  );
}
