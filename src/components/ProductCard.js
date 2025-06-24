import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

const ProductCard = ({ product, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      height: 350,
      width: 300,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 6,
      },
      p: 1,
    }}
  >
    <Box
      sx={{
        height: 200,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={product.thumbnail}
        alt={product.title}
        sx={{
          maxHeight: "100%",
          maxWidth: "100%",
          objectFit: "contain",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      />
    </Box>
    <CardContent sx={{ width: "100%", textAlign: "center" }}>
      <Typography variant="h6" noWrap>
        {product.title}
      </Typography>
      <Typography color="text.secondary">
        ${product.price}
      </Typography>
    </CardContent>
  </Card>
);

export default ProductCard;
