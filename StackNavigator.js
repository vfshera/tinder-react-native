import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import getState from "./hooks/appState";
import SetUpModal from "./screens/modals/SetUpModal";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  // @ts-ignore
  const { user } = getState();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Group>
          {/* MODALS */}
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="setUp" component={SetUpModal} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
