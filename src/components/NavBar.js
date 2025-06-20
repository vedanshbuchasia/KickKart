import React from "react";
import logo from "../logo.png";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("currentUser"); // updated key name

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
    window.location.reload(); // ensures navbar updates
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#ff007f" }}>
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
            onClick={() => navigate("/favourites")}
            sx={{ fontSize: "2rem" }}
          >
            🤍
          </Button>

          {username ? (
            <>
              <Typography variant="body1" sx={{ mx: 2 }}>
                Welcome, {username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
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
