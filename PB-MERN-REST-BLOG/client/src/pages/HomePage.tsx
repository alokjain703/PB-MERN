// Home page content goes here

import { useAuthStore } from "../store/AuthStore";
import { Box, Button, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import React, { useState } from "react";

const HomePage = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [showRegister, setShowRegister] = useState(false);

  const handleShowRegister = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowRegister(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome to Auth and Blog Demo - MERN(MongoDB, Express, React, Node.js)
        Stack with REST API
      </h2>
      <p>This is the main landing page of the blog application.</p>
      <Box sx={{ p: 4 }}>
        {isAuthenticated ? (
          <Box>
            <Typography variant="h4">Welcome, {user?.userId}!</Typography>
            <Button variant="contained" onClick={logout} sx={{ mt: 2 }}>
              Logout
            </Button>
          </Box>
        ) : (
          <>
            <LoginForm />
            {!showRegister && (
              <>
                Not registered yet?{" "}
                <a href="#register" onClick={handleShowRegister}>
                  Register
                </a>
              </>
            )}
            {showRegister && <RegisterForm />}
          </>
        )}
      </Box>
    </div>
  );
};

export default HomePage;
