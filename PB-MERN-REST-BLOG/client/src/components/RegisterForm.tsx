// src/components/RegisterForm.tsx
    import React, { useState } from 'react';
    import { TextField, Button, Box, Typography } from '@mui/material';
    import { useAuthStore } from '../store/authStore';

    
    const RegisterForm = () => {
      const [userId, setUserId] = useState('johndoe5');
      const [password, setPassword] = useState('abc$123$');
      const [name, setName] = useState('John Doe 5');
      const [email, setEmail] = useState('johndoe5@example.com');

      const login = useAuthStore((state) => state.login);
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Simulate API call for registration
        try {
          // Replace with actual API call
          const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, userId }),
          });
          const data = await response.json();
          if (response.ok) {
            login(data.token, data.username); // Log in after successful registration
            console.log('Registration successful');
          } else {
            console.error('Registration failed:', data.message);
          }
        } catch (error) {
          console.error('Error during registration:', error);
        }
      };

      return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>Register</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="UserId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            Register
          </Button>
        </Box>
      );
    };

    export default RegisterForm;