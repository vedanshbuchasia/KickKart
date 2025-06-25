import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  const [l1, setl1] = useState("");
  const [l2, setl2] = useState("");
  const [zip, setzip] = useState("");
  const [state, setstate] = useState("");
  const [error, setError] = useState("");

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  useEffect(() => {
    if (!currentUser) {
      setNotLoggedIn(true);
      return;
    }

    const allAddresses = JSON.parse(localStorage.getItem("addresses")) || {};
    setAddresses(allAddresses[currentUser] || []);
  }, [currentUser]);

  const saveAddresses = (updatedList) => {
    const all = JSON.parse(localStorage.getItem("addresses")) || {};
    all[currentUser] = updatedList;
    localStorage.setItem("addresses", JSON.stringify(all));
    setAddresses(updatedList);
  };

  const handleAddAddress = () => {
    if (!l1 || !zip || !state) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^\d{5,6}$/.test(zip)) {
      setError("Please enter a valid 5 or 6 digit zip code.");
      return;
    }

    const newAddress = {
      line1: l1,
      line2: l2,
      zipCode: zip,
      state: state,
    };

    const updatedList = [...addresses, newAddress];
    saveAddresses(updatedList);

    setShowForm(false);
    setError("");
    setl1("");
    setl2("");
    setzip("");
    setstate("");
  };

  if (notLoggedIn) {
    return (
      <Dialog open>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography>Please log in to continue to checkout.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/login")} variant="contained">
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, bgcolor: "#fff", p: 4, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, color: "black" }}>
        Select Shipping Address
      </Typography>

      {}
      {addresses.map((addr, idx) => (
        <Card
          key={idx}
          variant="outlined"
          sx={{
            mb: 2,
            backgroundColor: selectedAddressIndex === idx ? "#d1ffd1" : "#f9f9f9",
          }}
        >
          <CardContent>
            <Typography sx={{ color: "black" }}>{addr.line1}</Typography>
            {addr.line2 && (
              <Typography sx={{ color: "black" }}>{addr.line2}</Typography>
            )}
            <Typography sx={{ color: "black" }}>
              {addr.state} - {addr.zipCode}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => setSelectedAddressIndex(idx)}
            >
              {selectedAddressIndex === idx ? "Selected" : "Use this address"}
            </Button>

            {selectedAddressIndex === idx && (
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => {
                  const selectedAddress = addresses[idx];
                  localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
                  navigate("/OrderSummary");
                }}
              >
                Proceed to Order Summary
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      {}
      {!showForm ? (
        <Button
          variant="contained"
          fullWidth
          onClick={() => setShowForm(true)}
          sx={{ mt: 3 }}
        >
          Add New Address
        </Button>
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: 4, color: "black" }}>
            Add New Address
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            required
            label="Address Line 1"
            value={l1}
            onChange={(e) => setl1(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Address Line 2 (Optional)"
            value={l2}
            onChange={(e) => setl2(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            label="Zip Code"
            value={zip}
            onChange={(e) => setzip(e.target.value)}
            sx={{ mb: 2 }}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />

          <TextField
            fullWidth
            required
            select
            label="State"
            value={state}
            onChange={(e) => setstate(e.target.value)}
            sx={{ mb: 3 }}
          >
            {states.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" fullWidth onClick={handleAddAddress}>
            Save Address
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => setShowForm(false)}
            sx={{ mt: 1 }}
          >
            Cancel
          </Button>
        </>
      )}
    </Box>
  );
}
