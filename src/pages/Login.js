import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || {};
  };

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    if (!trimmedUsername || !trimmedPassword) return;

    const users = getUsers();

    if (!users[trimmedUsername]) {
      setError("User not found. Please register first.");
      setSuccess("");
    } else if (users[trimmedUsername] !== trimmedPassword) {
      setError("Incorrect password.");
      setSuccess("");
    } else {
      localStorage.setItem("currentUser", trimmedUsername);
      setError("");
      setSuccess("Login successful!");
      navigate("/");
    }
  };

  const handleRegister = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    if (!trimmedUsername || !trimmedPassword) return;

    const users = getUsers();

    if (users[trimmedUsername]) {
      setError("User already exists. Please login.");
      setSuccess("");
    } else {
      const updatedUsers = {
        ...users,
        [trimmedUsername]: trimmedPassword,
      };
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", trimmedUsername);
      setError("");
      setSuccess("Registration successful!");
      navigate("/");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
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

      <TextField
        fullWidth
        label="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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

      <Button
        fullWidth
        variant="contained"
        onClick={isRegistering ? handleRegister : handleLogin}
        sx={{ mb: 1 }}
      >
        {isRegistering ? "Register" : "Login"}
      </Button>

      <Button
        fullWidth
        variant="text"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setError("");
          setSuccess("");
          setUsername("");
          setPassword("");
        }}
      >
        {isRegistering
          ? "Already have an account? Login"
          : "New user? Register here"}
      </Button>
    </Box>
  );
}
