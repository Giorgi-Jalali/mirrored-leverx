import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../sass/pages/_sign-in.scss";
import { dbUrl } from "../App";

const SignIn: React.FC = () => {
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);


  const loadUsers = async (): Promise<any[]> => {
    const response = await fetch(`${dbUrl}`);
    if (!response.ok) {
      throw new Error("Failed to load user data.");
    }
    return await response.json();
  };

  const validateInputs = (): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (password.length < 2) {
      alert("Password must be at least 2 characters long.");
      return false;
    }

    return true;
  };

  const signIn = async () => {
    if (!validateInputs()) return;

    try {
      const users = await loadUsers();
      const user = users.find((user: any) => user.email === email);

      if (!user) {
        alert("User not found. Please sign up.");
        return;
      }

      const checkRequest = await fetch(
        "https://www.toptal.com/developers/bcrypt/api/check-password.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `password=${encodeURIComponent(password)}&hash=${encodeURIComponent(
            user.passwordHash
          )}`,
        }
      );

      const checkData = await checkRequest.json();

      if (checkData.ok) {

        setIsAuthenticated(true);


        if (remember) {
          localStorage.setItem("userEmail", email);
        } else {
          sessionStorage.setItem("userEmail", email);
        }

        // alert("Login successful!");
        window.location.href = "/";
      } else {
        alert("Invalid password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while processing your login.");
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
