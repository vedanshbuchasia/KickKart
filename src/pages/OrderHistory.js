import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUserName");
    if (!user) {
      navigate("/login");
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orderHistory")) || {};
    setOrders(allOrders[user] || []);
  }, [navigate]);

  if (orders.length === 0) {
    return (
      <Box mt={5} textAlign="center">
        <Alert severity="info">
          No past orders found. Start shopping to place your first order.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#4a148c" }}>
        📦 Order History
      </Typography>

      {orders
        .slice() 
        .reverse() 
        .map((order) => (
          <Paper key={order.id} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6">
              Order ID: #{order.id} — {order.date}
            </Typography>

            <Typography variant="subtitle1">
              💳 Payment Method: {order.paymentMethod || "Not specified"}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              💰 Total: ${order.total.toFixed(2)}
            </Typography>

            {}
            <Grid container spacing={2}>
              {order.items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card sx={{ display: "flex", backgroundColor: "#fafafa" }}>
                    <CardMedia
                      component="img"
                      image={item.thumbnail}
                      alt={item.title}
                      sx={{ width: 100, objectFit: "contain", p: 1 }}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">
                        {item.title}
                      </Typography>
                      <Typography variant="body2">
                        ${item.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2">📍 Shipping Address:</Typography>
            <Typography>{order.address.line1}</Typography>
            {order.address.line2 && <Typography>{order.address.line2}</Typography>}
            <Typography>
              {order.address.state} - {order.address.zipCode}
            </Typography>
          </Paper>
        ))}
    </Box>
  );
}
