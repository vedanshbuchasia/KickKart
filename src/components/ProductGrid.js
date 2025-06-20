import React from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onProductClick }) => (
  <Grid container spacing={3} justifyContent="center">
    {products.length > 0 ? (
      products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} onClick={() => onProductClick(product)} />
        </Grid>
      ))
    ) : (
      <Typography textAlign="center" sx={{ width: "100%", color:"black"}}>
        No products found.
      </Typography>
    )}
  </Grid>
);

export default ProductGrid;
