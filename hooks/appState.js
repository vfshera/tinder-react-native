import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";

const AppContext = createContext({});

export const StateProvider = ({ children }) => {
  // @ts-ignore
  return (
    <AppContext.Provider
      value={{
        user: {
          name: "Franklin Shera",
          auth: true,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default function getState() {
  return useContext(AppContext);
}
