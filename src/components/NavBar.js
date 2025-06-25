import React, { useState } from "react";
import logo from "../logo.png";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function NavBar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("currentUserName");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserName");
    window.location.reload();
  };

  const handleCartClick = () => {
    const currentUser = localStorage.getItem("currentUserName");
    if (currentUser) {
      navigate("/favourites");
    } else {
      alert("Please log in to access your cart.");
      navigate("/login");
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOrderHistory = () => {
    navigate("/OrderHistory");
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: "#ff007f" }}>
        <Toolbar sx={{ justifyContent: "center", gap: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton onClick={() => navigate("/")}>
              <Avatar src={logo} alt="ShopNest Logo" sx={{ marginRight: 2 }} />
            </IconButton>
          </Box>

          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <Button
            color="inherit"
            size="large"
            onClick={handleCartClick}
            sx={{ fontSize: "2rem" }}
          >
            <ShoppingCartIcon />
          </Button>

          {fullName ? (
            <>
              <Typography
                variant="body1"
                sx={{ mx: 2, cursor: "pointer" }}
                aria-controls="user-menu"
                aria-haspopup="true"
                onMouseEnter={handleMenuOpen}
              >
                Welcome, {fullName}
              </Typography>

              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                  onMouseLeave: handleMenuClose,
                }}
              >
                <MenuItem onClick={handleOrderHistory}>📦 Order History</MenuItem>
                <MenuItem onClick={handleLogout}>🚪 Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton color="inherit" onClick={() => navigate("/login")}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
