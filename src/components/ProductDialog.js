import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
  Box,
  Rating,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite } from "../store/favouritesSlice";

const ProductDialog = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product && product.id) {
      const fav = favourites.some((p) => p.id === product.id);
      setAdded(fav);
    }
  }, [product, favourites]);

  const handleAddToFavourites = () => {
    if (!product) return;

    const user = localStorage.getItem("currentUserName");
    if (!user) {
      alert("Please log in to add favourites.");
      return;
    }

    dispatch(addFavourite(product));
    setAdded(true);
  };

  const originalPrice = product
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

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
            color: (theme) => theme.palette.grey[500],
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
            borderRadius: 2,
          }}
        >
          <Box
            component="img"
            src={product?.thumbnail}
            alt={product?.title}
            sx={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        <DialogContentText sx={{ color: "text.primary" }}>
          <strong>Description:</strong> {product?.description}
          <br />
          <strong>Price:</strong>{" "}
          <Typography component="span" sx={{ textDecoration: "line-through", mr: 1, color: "gray" }}>
            ${originalPrice}
          </Typography>
          <Typography component="span" sx={{ color: "green", fontWeight: "bold", mr: 1 }}>
            ${product?.price}
          </Typography>
          <Typography component="span" sx={{ color: "red", fontWeight: 500 }}>
            ({product?.discountPercentage}% OFF)
          </Typography>
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
                color: "brown",
              },
            }}
            onClick={handleAddToFavourites}
          >
            {added ? "✅ Added to Cart" : "🛒 Add to Cart"}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
