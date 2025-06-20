import React, { useState } from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./pages/favourites.js";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Nav from "./components/NavBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favourites" element={<Favourites />} /> {/* ✅ Add this */}
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
