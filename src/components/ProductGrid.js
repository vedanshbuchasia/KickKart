import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onProductClick }) => {
  return products.length > 0 ? (
    <Box sx={{ px: 2 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ProductCard product={product} onClick={() => onProductClick(product)} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <Typography textAlign="center" sx={{ width: "100%", mt: 4, color: "black" }}>
      No products found.
    </Typography>
  );
};

export default ProductGrid;
