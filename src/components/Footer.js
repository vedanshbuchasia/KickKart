import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height:"150px",
        bgcolor: "black",
        color: "white",
        px: { xs: 4, sm: 10 },
        py: 6,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            KickKart
          </Typography>
          <Typography variant="body2">
            Your go-to destination for the latest sneakers and vintage kicks.
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Link
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer", mb: 1, color: "white" }}
              underline="hover"
            >
              Home
            </Link>
            <Link
              onClick={() => navigate("/favourites")}
              sx={{ cursor: "pointer", color: "white" }}
              underline="hover"
            >
              Cart
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">
            Email: support@kickkart.com <br />
            Phone: +91 98765 43210
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
          <Typography variant="body2">
            123 Sneaker Street, Fashion City,<br />
            Trendland, 999999
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
