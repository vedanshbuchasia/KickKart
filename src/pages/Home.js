import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import ProductGrid from "../components/ProductGrid";
import ProductDialog from "../components/ProductDialog";
import Slideshow from "../components/Slideshow"; // ✅ import the slideshow

export default function Home({ searchTerm, setSearchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://my-api-7fu2.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ padding: 4 }}>
      {/* ✅ Centered Slideshow with max width */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <Box sx={{ width: "100%", maxWidth: 1000 }}>
          <Slideshow />
        </Box>
      </Box>

      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <ProductGrid
          products={filteredProducts}
          onProductClick={setSelectedProduct}
        />
      )}

      <ProductDialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Container>
  );
}
