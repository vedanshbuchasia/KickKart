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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearFavourites } from "../store/favouritesSlice"; 

export default function OrderSummary() {
  const [favourites, setFavourites] = useState([]);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("currentUserName");
    if (!user) {
      navigate("/login");
      return;
    }

    const allFavs = JSON.parse(localStorage.getItem("favourites")) || {};
    setFavourites(allFavs[user] || []);

    const selected = JSON.parse(localStorage.getItem("selectedAddress"));
    setAddress(selected);
  }, [navigate]);

  const total = favourites.reduce((sum, item) => sum + item.price, 0);

  const handleConfirm = () => {
    const user = localStorage.getItem("currentUserName");
    if (!user) return;

    if (!paymentMethod) {
      setPaymentError("Please select a payment method.");
      return;
    }

    
    const allOrders = JSON.parse(localStorage.getItem("orderHistory")) || {};
    const userOrders = allOrders[user] || [];

    const newOrder = {
      id: Date.now(),
      items: favourites,
      address: address,
      total: total,
      paymentMethod: paymentMethod,
      date: new Date().toLocaleString(),
    };

    const updatedOrders = {
      ...allOrders,
      [user]: [...userOrders, newOrder],
    };
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));

    
    const allFavs = JSON.parse(localStorage.getItem("favourites")) || {};
    allFavs[user] = [];
    localStorage.setItem("favourites", JSON.stringify(allFavs));

    
    dispatch(clearFavourites());

    
    setFavourites([]);
    alert("🎉 Order placed successfully!");
    navigate("/OrderHistory");
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

      {}
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

      {}
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

      {}
      <Paper sx={{ p: 3, mb: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">💳 Payment Method</FormLabel>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setPaymentError("");
            }}
          >
            <FormControlLabel value="Cash on Delivery" control={<Radio />} label="Cash on Delivery (COD)" />
            <FormControlLabel value="UPI" control={<Radio />} label="UPI (Google Pay, PhonePe, etc.)" />
          </RadioGroup>
        </FormControl>
        {paymentError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {paymentError}
          </Alert>
        )}
      </Paper>

      {}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">💰 Total: ${total.toFixed(2)}</Typography>
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
