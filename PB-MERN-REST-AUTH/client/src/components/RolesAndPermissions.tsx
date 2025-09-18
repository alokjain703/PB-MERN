import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const RolesAndPermissions = () => {
  const [userId, setUserId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [operation, setOperation] = useState("add");
  const [availableRoles, setAvailableRoles] = useState([]); 
  const [assignedRoles, setAssignedRoles] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/roles`);
      const data = await response.json();
      if (response.ok) {
        console.log("Available roles:", data);
        setAvailableRoles(data); // Assuming the API returns { roles: [...] }
      } else {
        console.error("Failed to fetch roles:", data.message);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchRolesForUser = async (userId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/user-roles/${userId}`);
      const data = await response.json();
      if (response.ok) {
        console.log(`Roles for user ${userId}:`, data);
        setAssignedRoles(data);
        // Handle user roles as needed
      } else {
        console.error("Failed to fetch user roles:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleUserIdBlur = () => {
    if (userId) {
      fetchRolesForUser(userId);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("operation:", operation);
    let api_route = `${BASE_URL}/auth/assign-role`;
    if (operation === "add") {
      api_route = `${BASE_URL}/auth/assign-role`;
    } else if (operation === "remove") {
      api_route = `${BASE_URL}/auth/remove-role`;
    }
    try {
      // Replace with actual API call
      console.log("userId, roleName:", userId, roleName);
      console.log("api_route:", api_route);
      const response = await fetch(api_route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, roleName }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("data from Roles assignment:", data);
        console.log("userId:", data.userId);
        setAssignedRoles(data.roles); // Update assigned roles after operation
      } else {
        console.error(`${operation} Role failed:`, data.message);
      }
    } catch (error) {
      console.error("Error during role assignment:", error);
    }
  };

  // const removeRoles = () => {
  //   // Implement remove roles functionality
  //   console.log("Remove roles functionality to be implemented");
  // };
  return (
    <>
      <div className="mt-4">
        <p>Manage user roles and permissions from this section.</p>
        {/* Add more admin functionalities as needed */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Add Role
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="user Id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onBlur={handleUserIdBlur}
          />
          <Typography variant="h5" gutterBottom>Assigned Roles</Typography>
          <ul>
            {assignedRoles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>

          {/** Dropdown for role selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role Name</InputLabel>
            <Select
              labelId="role-label"
              value={roleName}
              label="Role Name"
              onChange={(e) => setRoleName(e.target.value)}
            >
              {availableRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" gap={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setOperation("add")}
            >
              Add Role
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setOperation("remove")}
            >
              Remove Role
            </Button>
          </Box>
        </Box>
        {/* <Box component="form" onSubmit={removeRoles} sx={{ mt: 3 }}>
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
        </Box> */}
      </div>
    </>
  );
};

export default RolesAndPermissions;
