import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserFavourites } from "../store/favouritesSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getUsers = () => JSON.parse(localStorage.getItem("users")) || {};
  const getUserNames = () => JSON.parse(localStorage.getItem("userNames")) || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    isRegistering ? handleRegister() : handleLogin();
  };

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required.");
      setSuccess("");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Invalid email format.");
      setSuccess("");
      return;
    }

    const users = getUsers();
    const userNames = getUserNames();

    if (!users[trimmedEmail]) {
      setError("User not found. Please register first.");
      setSuccess("");
    } else if (users[trimmedEmail] !== trimmedPassword) {
      setError("Incorrect password.");
      setSuccess("");
    } else {
      localStorage.setItem("currentUser", trimmedEmail);
      localStorage.setItem("currentUserName", userNames[trimmedEmail] || "User");
      setError("");
      setSuccess("Login successful!");
      dispatch(loadUserFavourites());
      navigate("/");
    }
  };

  const handleRegister = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = fullName.trim();

    if (!trimmedEmail || !trimmedPassword || !trimmedName) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Invalid email format.");
      setSuccess("");
      return;
    }

    const users = getUsers();
    const userNames = getUserNames();

    if (users[trimmedEmail]) {
      setError("User already exists. Please login.");
      setSuccess("");
    } else {
      const updatedUsers = { ...users, [trimmedEmail]: trimmedPassword };
      const updatedNames = { ...userNames, [trimmedEmail]: trimmedName };

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("userNames", JSON.stringify(updatedNames));
      localStorage.setItem("currentUser", trimmedEmail);
      localStorage.setItem("currentUserName", trimmedName);
      setError("");
      setSuccess("Registration successful!");
      dispatch(loadUserFavourites());
      navigate("/");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 10 }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "black" }}>
        {isRegistering ? "Register" : "Login"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {isRegistering && (
        <TextField
          fullWidth
          label="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "white",
            input: { color: "black" },
            label: { color: "black" },
          }}
        />
      )}

      <TextField
        fullWidth
        label="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          mb: 2,
          backgroundColor: "white",
          input: { color: "black" },
          label: { color: "black" },
        }}
      />

      <TextField
        fullWidth
        label="Enter your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          mb: 2,
          backgroundColor: "white",
          input: { color: "black" },
          label: { color: "black" },
        }}
      />

      <Button fullWidth variant="contained" type="submit" sx={{ mb: 1 }}>
        {isRegistering ? "Register" : "Login"}
      </Button>

      <Button
        fullWidth
        variant="text"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setError("");
          setSuccess("");
          setEmail("");
          setPassword("");
          setFullName("");
        }}
      >
        {isRegistering
          ? "Already have an account? Login"
          : "New user? Register here"}
      </Button>
    </Box>
  );
}
