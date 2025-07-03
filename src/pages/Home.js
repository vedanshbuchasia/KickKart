import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Slider,
  Button,
} from "@mui/material";
import ProductGrid from "../components/ProductGrid";
import ProductDialog from "../components/ProductDialog";
import Slideshow from "../components/Slideshow";
import Footer from "../components/Footer";

export default function Home({ searchTerm, setSearchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedReturns, setSelectedReturns] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [userPrice, setUserPrice] = useState({ min: 0, max: 0 });
  const [appliedPrice, setAppliedPrice] = useState({ min: 0, max: Infinity });

  useEffect(() => {
    fetch("https://my-api-7fu2.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
        const prices = data.products.map((p) => p.price);
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));
        setPriceRange({ min, max });
        setUserPrice({ min, max });
        setAppliedPrice({ min, max });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const allBrands = [...new Set(products.map((p) => p.brand))];

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleReturnChange = (policy) => {
    setSelectedReturns((prev) =>
      prev.includes(policy)
        ? prev.filter((p) => p !== policy)
        : [...prev, policy]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const price = product.price;
    const matchesPrice =
      price >= appliedPrice.min && price <= appliedPrice.max;
    const matchesReturn =
      selectedReturns.length === 0 ||
      selectedReturns.includes(product.returnPolicy.toLowerCase());

    return matchesSearch && matchesBrand && matchesPrice && matchesReturn;
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#fceee6", // your page bg
      }}
    >
      <Container sx={{ flex: 1, py: 4 }}>
        {/* Slideshow */}
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
          <Box sx={{ display: "flex" }}>
            {/* Sidebar Filters */}
            <Box sx={{ width: 250, mr: 4, color: "black" }}>
              {/* Brand Filter */}
              <Typography variant="h6" gutterBottom>
                Filter by Brand
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <FormGroup>
                {allBrands.map((brand) => (
                  <FormControlLabel
                    key={brand}
                    control={
                      <Checkbox
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                      />
                    }
                    label={brand}
                  />
                ))}
              </FormGroup>

              {/* Price Filter */}
              <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
                Filter by Price
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ px: 1, color: "black" }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  ${userPrice.min} – ${userPrice.max}
                </Typography>
                <Slider
                  value={[userPrice.min, userPrice.max]}
                  onChange={(e, newValue) =>
                    setUserPrice({ min: newValue[0], max: newValue[1] })
                  }
                  min={priceRange.min}
                  max={priceRange.max}
                  valueLabelDisplay="auto"
                  sx={{ color: "#006666", mb: 1 }}
                />
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setAppliedPrice({ ...userPrice })}
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      fontWeight: 500,
                    }}
                  >
                    Go
                  </Button>
                </Box>
              </Box>

              {/* Return Policy */}
              <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
                Filter by Return Policy
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <FormGroup sx={{ ml: 1 }}>
                {[
                  "No return policy",
                  "7-day return policy",
                  "14-day return policy",
                  "30-day return policy",
                ].map((policy) => (
                  <FormControlLabel
                    key={policy}
                    control={
                      <Checkbox
                        size="small"
                        checked={selectedReturns.includes(policy.toLowerCase())}
                        onChange={() => handleReturnChange(policy.toLowerCase())}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                        {policy}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            </Box>

            {/* Product Grid */}
            <Box sx={{ flexGrow: 1 }}>
              <ProductGrid
                products={filteredProducts}
                onProductClick={setSelectedProduct}
              />
            </Box>
          </Box>
        )}

        <ProductDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </Container>

      {/* ✅ Footer placed outside container and fills full width */}
      <Footer />
    </Box>
  );
}
