import React from "react";
import { useRouter } from "next/router";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useAppState } from "@/store";

const ViewProfile: React.FC = () => {
  const router = useRouter();
  const { users, token } = useAppState();

  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.username === token)
    : null;
console.log("loggedInUser:", loggedInUser);

  if (!loggedInUser) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error: Unable to load user profile. Please log in again.
      </Typography>
    );
  }

  const handleDelete = () => {
    if (!loggedInUser.id) {
      console.error("User ID is not available. Cannot delete the user.");
      return;
    }

    fetch(`https://fakestoreapi.com/users/${loggedInUser.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete user: ${response.statusText}`);
        }
        return response.json();
      })
      .then((deletedUser) => {
        console.log("Deleted User:", deletedUser);
        alert("User deleted successfully!");
        router.push("/login");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Profile Details
      </Typography>
      <Box>
        <Typography>
          <strong>Email:</strong> {loggedInUser.email}
        </Typography>
        <Typography>
          <strong>Username:</strong> {loggedInUser.username}
        </Typography>
        <Typography>
          <strong>First Name:</strong> {loggedInUser.name?.firstname}
        </Typography>
        <Typography>
          <strong>Last Name:</strong> {loggedInUser.name?.lastname}
        </Typography>
        <Typography>
          <strong>City:</strong> {loggedInUser.address?.city}
        </Typography>
        <Typography>
          <strong>Street:</strong> {loggedInUser.address?.street}{" "}
          {loggedInUser.address?.number}
        </Typography>
        <Typography>
          <strong>Zipcode:</strong> {loggedInUser.address?.zipcode}
        </Typography>
        <Typography>
          <strong>Phone:</strong> {loggedInUser.phone}
        </Typography>
      </Box>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={() => router.push("/edit-profile")}>
          Edit Profile
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Profile
        </Button>
      </Box>
    </Paper>
  );
};

export default ViewProfile;
