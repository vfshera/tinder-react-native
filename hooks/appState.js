// @ts-ignore
import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect } from "react";
import * as Google from "expo-google-app-auth";
import gservice from "../google-services.json";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

const AppContext = createContext({});

export const StateProvider = ({ children }) => {
  const config = {
    androidClientId: gservice.client[0].oauth_client[0].client_id,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
  };

  const [Error, setError] = useState(null);
  const [appUser, setAppUser] = useState(null);
  const [isLoding, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);

    await Google.logInAsync(config)
      .then(
        // @ts-ignore
        async ({ type, accessToken, idToken, user }) => {
          if (type === "success") {
            console.log("Success");
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
  // @ts-ignore
  return (
    <AppContext.Provider
      value={{
        user: appUser,
        isLoding,
        signInWithGoogle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default function getState() {
  return useContext(AppContext);
}
