// @ts-ignore
import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import * as Google from "expo-google-app-auth";
import gservice from "../../google-services.json";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import Loader from "../components/Loader";

const AppContext = createContext({});

export const StateProvider = ({ children }) => {
  const config = {
    androidClientId: gservice.client[0].oauth_client[0].client_id,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
  };

  const [error, setError] = useState(null);
  const [appUser, setAppUser] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const setStatus = (status) => {
    setLoading(status);
  };
  const signInWithGoogle = async () => {
    setLoading(true);

    await Google.logInAsync(config)
      .then(
        // @ts-ignore
        async ({ type, accessToken, idToken, user }) => {
          if (type === "success") {
            // @ts-ignore
            const credentials = GoogleAuthProvider.credential(
              idToken,
              accessToken
            );

            await signInWithCredential(auth, credentials);
          }

          return Promise.reject();
        }
      )
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAppUser(user);
      } else {
        setAppUser(null);
      }
    });
  }, []);
  //CAHING
  const memoState = useMemo(
    () => ({
      user: appUser,
      isLoading,
      setStatus,
      error,
      signInWithGoogle,
      logOut,
    }),
    [appUser, isLoading, error]
  );
  // @ts-ignore
  return (
    <AppContext.Provider value={memoState}>
      {isLoading ? <Loader /> : children}
    </AppContext.Provider>
  );
};

export default function getState() {
  return useContext(AppContext);
}
