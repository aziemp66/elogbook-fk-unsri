import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const AuthContext = React.createContext({
  userData: {},
  userDataHandler: () => {},
  register: (
    email,
    username,
    password,
    confirmPassword,
    firstName,
    lastName
  ) => {},
  login: (username, password) => {},
  logout: () => {},
});

const BASE_URL =
  (import.meta.env.VITE_API_URL &&
    `${import.meta.env.VITE_API_URL}/api/auth`) ||
  "http://localhost:5000/api/auth";

export const AuthProvider = (props) => {
  const [userData, setUserData] = useState(null);

  const register = async (
    email,
    username,
    password,
    confirmPassword,
    firstName,
    lastName
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        email,
        username,
        password,
        confirmPassword,
        firstName,
        lastName,
      });
      if (response.data.error) {
        console.log(response.data.error);
        return { error: response.data.error };
      }
    } catch (error) {
      return error;
    }

    return {
      message: "Successfully registered",
    };
  };

  const login = async (username, password) => {
    let response;
    try {
      response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });
      if (response.data.error) {
        console.log(response.data.error);
        return { error: response.data.error };
      }
    } catch (error) {
      return error;
    }

    localStorage.setItem("token", response.data.accessToken);
    const decoded = jwtDecode(response.data.accessToken);
    setUserData(decoded);

    return {
      message: "Successfully logged in, redirecting...",
      role: decoded.role,
    };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  const userDataHandler = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return logout();
      }
      setUserData(decoded);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        userData,
        userDataHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
