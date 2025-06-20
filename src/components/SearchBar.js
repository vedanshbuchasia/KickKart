import React from "react";
import { Box, TextField } from "@mui/material";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <Box sx={{ textAlign: "center", width: "100%", maxWidth: 600 }}>
    <TextField
      variant="outlined"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{
        backgroundColor: "#fff",
        borderRadius: 1,
        input: { color: "#000" },
        width: "100%",
        maxWidth: 400,
      }}
    />
  </Box>
);

export default SearchBar;
