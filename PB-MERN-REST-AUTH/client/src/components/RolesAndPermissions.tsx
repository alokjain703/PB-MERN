import { Box, Button, Typography, TextField } from "@mui/material";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

const RolesAndPermissions = () => {
  
  const login = useAuthStore((state) => state.login);
  const [userId, setUserId] = useState("");
  const [roleName, setRoleName] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const addRoles = () => async (event: React.FormEvent) => {
          event.preventDefault();
          // Simulate API call for login
          try {
            // Replace with actual API call
            const response = await fetch(`${BASE_URL}/auth/assign-role`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, roleName }),
            });
            const data = await response.json();
            if (response.ok) {
              console.log("data from login:", data);
              console.log('userId:', data.user.userId);
              login(data.token, data.user.userId);
              
            } else {
              console.error('Add Role failed:', data.message);
            }
          } catch (error) {
            console.error('Error during login:', error);
          }
        };

  const removeRoles = () => {
    // Implement remove roles functionality
    console.log("Remove roles functionality to be implemented");
  };
  return (
    <>

      <div className="mt-4">
        
        <p>Manage user roles and permissions from this section.</p>
        {/* Add more admin functionalities as needed */}
        <Box component="form" onSubmit={addRoles} sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="user Id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Role
          </Button>
        </Box>
        <Box component="form" onSubmit={removeRoles} sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Remove Role
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="user Id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Remove Role
          </Button>
        </Box>
      </div>
    </>
  );
};

export default RolesAndPermissions;
