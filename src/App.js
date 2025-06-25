import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./pages/favourites.js";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Nav from "./components/NavBar";
import { useDispatch } from "react-redux";
import { loadUserFavourites } from "./store/favouritesSlice";
import Address from "./pages/address.js";
import OrderSummary from "./pages/OrderSummary.js";
import OrderHistory from "./pages/OrderHistory.js";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFavourites()); // ✅ load on app mount (or refresh)
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Box sx={{ minHeight: "100vh", bgcolor: "#fbeee6", color: "#fff" }}>
        <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Routes>
          <Route
            path="/"
            element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/address" element={<Address />} />
          <Route path="/OrderSummary" element={<OrderSummary />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
