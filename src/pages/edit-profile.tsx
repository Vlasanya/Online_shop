import React from "react";
import { useRouter } from "next/router";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useAppState } from "@/store";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const profileSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  city: yup.string().required("City is required"),
  street: yup.string().required("Street is required"),
  number: yup.number().typeError("Must be a number").required("Street Number is required"),
  zipcode: yup.string().required("Zipcode is required"),
  phone: yup.string().required("Phone is required"),
});

interface ProfileFormValues {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  city: string;
  street: string;
  number: number;
  zipcode: string;
  phone: string;
}

const EditProfile: React.FC = () => {
  const router = useRouter();
  const { users, token } = useAppState();

  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.username === token)
    : null;

  const defaultValues: ProfileFormValues = {
    email: loggedInUser?.email || "",
    username: loggedInUser?.username || "",
    firstname: loggedInUser?.name?.firstname || "",
    lastname: loggedInUser?.name?.lastname || "",
    city: loggedInUser?.address?.city || "",
    street: loggedInUser?.address?.street || "",
    number: loggedInUser?.address?.number || 0,
    zipcode: loggedInUser?.address?.zipcode || "",
    phone: loggedInUser?.phone || "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues,
  });

  const handleSave = (data: ProfileFormValues) => {
    if (!loggedInUser || !loggedInUser.id) {
      console.error("User ID is not available. Cannot update the profile.");
      return;
    }
    fetch(`https://fakestoreapi.com/users/${loggedInUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        name: {
          firstname: data.firstname,
          lastname: data.lastname,
        },
        address: {
          city: data.city,
          street: data.street,
          number: data.number,
          zipcode: data.zipcode,
        },
        phone: data.phone,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update user: ${response.statusText}`);
        }
        return response.json();
      })
      .then((updatedUser) => {
        console.log("Updated User:", updatedUser);
        router.push("/");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleSave)}
      >
        {[
          { name: "email", label: "Email", type: "email" },
          { name: "username", label: "Username" },
          { name: "firstname", label: "First Name" },
          { name: "lastname", label: "Last Name" },
          { name: "city", label: "City" },
          { name: "street", label: "Street" },
          { name: "number", label: "Street Number", type: "number" },
          { name: "zipcode", label: "Zipcode" },
          { name: "phone", label: "Phone" },
        ].map(({ name, label, type = "text" }) => (
          <Controller
            key={name}
            name={name as keyof ProfileFormValues}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label={label}
                type={type}
                error={!!errors[name as keyof ProfileFormValues]}
                helperText={errors[name as keyof ProfileFormValues]?.message}
              />
            )}
          />
        ))}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => router.push("/")} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EditProfile;
