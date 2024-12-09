import React from "react";
import { useAppDispatch, useAppState } from "@/store";
import { authenticateUser } from "@/services/api";
import { useRouter } from "next/router";
import { fetchUsers } from "@/services/api";
import Link from "next/link";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fetchCart } from "@/services/api";
import { User } from "@/store/reduser";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const { isAuthenticated, loading, error } = useAppState();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = await authenticateUser(data.username, data.password);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { username: data.username, token: response.token },
      });

      const userDetails = await fetchUsers();
      dispatch({ type: "SET_USER_DETAILS", payload: userDetails });

      const loggedInUser = userDetails.find(
        (user: User) => user.username === data.username
      );
      if (!loggedInUser || !loggedInUser.id) {
        throw new Error("User details not found");
      }

      const cart = await fetchCart(loggedInUser.id);
      dispatch({ type: "SET_CART", payload: cart });

      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: "An unknown error occurred",
        });
      }
    }
  };

  if (isAuthenticated) {
    return (
      <Typography variant="h6" align="center">
        You are already logged in.
      </Typography>
    );
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              fullWidth
              variant="outlined"
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
              autoComplete="username"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="current-password"
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don’t have an account?{" "}
        <Link href="/register" passHref>
          <Typography
            component="span"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            Register here
          </Typography>
        </Link>
      </Typography>
    </Paper>
  );
};

export default Login;
