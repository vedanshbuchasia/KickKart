import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const ProductCard = ({ product, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      height: 380,
      width: 300,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 6,
      },
      p: 2,
      borderRadius: "20px",
      backgroundColor: "#fff",
    }}
  >
    <Box
      sx={{
        height: 200,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        mb: 2,
      }}
    >
      <Box
        component="img"
        src={product.thumbnail}
        alt={product.title}
        sx={{
          height: "100%",
          width: "auto",
          objectFit: "contain",
        }}
      />
    </Box>

    <CardContent sx={{ textAlign: "center", p: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {product.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        ${product.price}
      </Typography>
    </CardContent>
  </Card>
);

export default ProductCard;

