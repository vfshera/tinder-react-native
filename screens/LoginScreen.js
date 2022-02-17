import { StyleSheet, Text, View } from "react-native";
import React from "react";
import getState from "../hooks/appState";

const LoginScreen = () => {
  // @ts-ignore
  const { user } = getState();
  return (
    <View>
      <Text>LoginScreen: {user.name}</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
