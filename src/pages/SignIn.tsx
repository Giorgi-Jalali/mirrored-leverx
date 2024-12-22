import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../sass/pages/_sign-in.scss";
import { useLoadUsersQuery, useCheckPasswordMutation } from "../services/signInApi";
import { IEmployee } from "src/types/EmployeeTypes";
import { useSnackbar } from "../hooks/useSnackbar";

const SignIn: React.FC = () => {
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const { data: users = [], isLoading, isError } = useLoadUsersQuery();
  const [checkPassword] = useCheckPasswordMutation();

  const { showSnackbar } = useSnackbar();

  const validateInputs = (): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      showSnackbar("Please enter a valid email address.");
      return false;
    }

    if (password.length < 2) {
      showSnackbar("Password must be at least 2 characters long.");
      return false;
    }

    return true;
  };

  const signIn = async () => {
    if (!validateInputs()) return;

    if (isLoading) {
      showSnackbar("Loading user data...");
      return;
    }

    if (isError) {
      showSnackbar("Failed to load user data. Please try again later.");
      return;
    }

    const user = users.find((user: IEmployee) => user.email === email);

    if (!user) {
      showSnackbar("User not found. Please sign up.");
      return;
    }

    try {
      const isPasswordValid = await checkPassword({
        password,
        hash: user.passwordHash,
      }).unwrap();

      if (isPasswordValid) {
        setIsAuthenticated(true);

        if (remember) {
          localStorage.setItem("userEmail", email);
        } else {
          sessionStorage.setItem("userEmail", email);
        }
        window.location.href = "/";
        showSnackbar("Login successful!");
      } else {
        showSnackbar("Invalid password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      showSnackbar("An error occurred while processing your login.");
    }
  };

  return (
    <div className="sign-in-main">
      <form
        id="sign-in-form"
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="John@john.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember">Remember Me</label>
        </div>

        <button type="submit" id="sign-in-button">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
