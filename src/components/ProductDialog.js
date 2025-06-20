import React, { useState, useEffect } from "react";
import { addToFavourites, isFavourite } from "../utils/favouritestorage.js";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
  Box,
  Rating
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProductDialog = ({ product, onClose }) => {
  const [added, setAdded] = useState(false);

  // Refresh `added` state whenever product changes or dialog is reopened
  useEffect(() => {
    if (product && product.id) {
      const checkFavourite = () => {
        const fav = isFavourite(product.id);
        setAdded(fav);
      };
      checkFavourite();
    }
  }, [product]);

  const handleAddToFavourites = () => {
  if (!product) return;

  const user = localStorage.getItem("currentUser");
  if (!user) {
    alert("Please log in to add favourites.");
    return;
  }

  const success = addToFavourites(product);
  if (success) {
    setAdded(true);
  } else {
    setAdded(true);
  }
};

  return (
    <Dialog open={!!product} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {product?.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            height: 300,
            backgroundColor: "#f5f5f5",
            borderRadius: 2
          }}
        >
          <Box
            component="img"
            src={product?.thumbnail}
            alt={product?.title}
            sx={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain"
            }}
          />
        </Box>

        <DialogContentText sx={{ color: "text.primary" }}>
          <strong>Description:</strong> {product?.description}
          <br />
          <strong>Price:</strong> ${product?.price}
          <br />
          <strong>Rating:</strong>{" "}
          <Rating
            value={product?.rating}
            precision={0.5}
            readOnly
            sx={{ verticalAlign: "middle" }}
          />
          <br />
          <strong>Brand:</strong> {product?.brand}
        </DialogContentText>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography
            sx={{
              fontSize: "2rem",
              textAlign: "center",
              cursor: "pointer",
              userSelect: "none",
              "&:hover": {
                color: "brown"
              }
            }}
            onClick={handleAddToFavourites}
          >
            {added ? "✅ Added to Favourites" : "❤️ Add to Favourites"}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
