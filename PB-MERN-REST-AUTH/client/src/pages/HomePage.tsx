// Home page content goes here
import React from "react";
import { useAuthStore } from "../store/authStore";
import { Box, Button, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
const HomePage = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  return (
   
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to the Home Page
        </h2>
        <p>This is the main landing page of the blog application.</p>
      
      <Box sx={{ p: 4 }}>
        {isAuthenticated ? (
          <Box>
            <Typography variant="h4">Welcome, {user?.username}!</Typography>
            <Button variant="contained" onClick={logout} sx={{ mt: 2 }}>
              Logout
            </Button>
          </Box>
        ) : (
          <>
            <LoginForm />
            <RegisterForm />
          </>
        )}
      </Box>
    </div>
  );
};

export default HomePage;
