// src/components/LoginForm.tsx
    import React, { useState } from 'react';
    import { TextField, Button, Box, Typography } from '@mui/material';
    import { useAuthStore } from '../store/authStore';

    const LoginForm = () => {
      const [userId, setuserId] = useState('johndoe5');
      const [password, setPassword] = useState('abc$123$');
      const login = useAuthStore((state) => state.login);
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Simulate API call for login
        try {
          // Replace with actual API call
          const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password }),
          });
          const data = await response.json();
          if (response.ok) {
            login(data.token, data.userId);
            console.log('Login successful');
            console.log('data:', data);
          } else {
            console.error('Login failed:', data.message);
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      };

      return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>Login</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="user Id"
            value={userId}
            onChange={(e) => setuserId(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </Box>
      );
    };

    export default LoginForm;