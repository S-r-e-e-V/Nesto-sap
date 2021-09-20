import React, { createContext, useState } from "react";

const initialAuthState = {
  authStateLoading: true,
  access_token: "",
  access_token_timestamp: "",
};

export const AuthContext = createContext({
  authState: initialAuthState,
});

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialAuthState);

  const updateAuthStateContext = (access_token, access_token_timestamp) => {
    window.localStorage.setItem("auth", access_token);
    setAuthState({
      authStateLoading: false,
      access_token,
      access_token_timestamp,
    });
  };

  const logOutUser = () => {
    if (window.localStorage.getItem("auth") != null) {
      window.localStorage.removeItem("auth");
    }
    setAuthState({
      ...initialAuthState,
      authStateLoading: false,
    });
  };

  const checkAuthState = async () => {
    const access_token = window.localStorage.getItem("auth");
    if (access_token !== null) {
      const access_token_timestamp = new Date();
      updateAuthStateContext(access_token, access_token_timestamp);
    } else {
      logOutUser();
    }
  };

  const logInUser = (access_token) => {
    const access_token_timestamp = new Date();
    updateAuthStateContext(access_token, access_token_timestamp);
  };

  const isLoggedIn = authState.access_token !== "";

  const value = {
    authState,
    checkAuthState,
    logInUser,
    logOutUser,
    isLoggedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
