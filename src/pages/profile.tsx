import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { AccountCircle, Edit, Delete } from "@mui/icons-material";
import { useAppState } from "@/store";

const ViewProfile: React.FC = () => {
  const router = useRouter();
  const { users, token } = useAppState();

  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.username === token)
    : null;

  if (!loggedInUser) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Error: Unable to load user profile
        </Typography>
        <Typography>Please log in again to access your profile.</Typography>
      </Box>
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
    <Paper
      elevation={6}
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 4,
        backgroundColor: "#fafafa",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            mx: "auto",
            mb: 2,
            bgcolor: "primary.main",
            fontSize: 40,
          }}
        >
          <AccountCircle fontSize="inherit" />
        </Avatar>
        <Typography variant="h4" fontWeight={700}>
          Welcome, {loggedInUser.name?.firstname}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here is your profile information
        </Typography>
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Personal Details
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {loggedInUser.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Username:</strong> {loggedInUser.username}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>First Name:</strong> {loggedInUser.name?.firstname}
              </Typography>
              <Typography variant="body1">
                <strong>Last Name:</strong> {loggedInUser.name?.lastname}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Address Information
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>City:</strong> {loggedInUser.address?.city}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Street:</strong> {loggedInUser.address?.street}{" "}
                {loggedInUser.address?.number}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Zipcode:</strong> {loggedInUser.address?.zipcode}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {loggedInUser.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<Edit />}
          color="primary"
          onClick={() => router.push("/edit-profile")}
          sx={{
            minWidth: "150px",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Edit Profile
        </Button>
        <Button
          variant="contained"
          startIcon={<Delete />}
          color="error"
          onClick={handleDelete}
          sx={{
            minWidth: "150px",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Delete Profile
        </Button>
      </Box>
    </Paper>
  );
};

export default ViewProfile;
