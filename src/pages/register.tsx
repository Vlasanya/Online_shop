import React from "react";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RegisterFormData = {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  city: string;
  street: string;
  number: number;
  zipcode: string;
  phone: string;
};

const registerSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  city: yup.string().required("City is required"),
  street: yup.string().required("Street is required"),
  number: yup.number().required("Street number is required"),
  zipcode: yup.string().required("Zipcode is required"),
  phone: yup.string().required("Phone number is required"),
});

const Register: React.FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      city: "",
      street: "",
      number: 0,
      zipcode: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
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
      });

      const newUser = await response.json();
      console.log("Registered User:", newUser);

      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {[
          { name: "email" as const, label: "Email", type: "email" },
          { name: "username" as const, label: "Username" },
          { name: "password" as const, label: "Password", type: "password" },
          { name: "firstname" as const, label: "First Name" },
          { name: "lastname" as const, label: "Last Name" },
          { name: "city" as const, label: "City" },
          { name: "street" as const, label: "Street" },
          { name: "number" as const, label: "Street Number", type: "number" },
          { name: "zipcode" as const, label: "Zipcode" },
          { name: "phone" as const, label: "Phone Number" },
        ].map(({ name, label, type = "text" }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={label}
                type={type}
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors[name]}
                helperText={errors[name as keyof RegisterFormData]?.message}
                autoComplete="off"
              />
            )}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link href="/login" passHref>
          <Typography
            component="span"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            Login here
          </Typography>
        </Link>
      </Typography>
    </Paper>
  );
};

export default Register;
