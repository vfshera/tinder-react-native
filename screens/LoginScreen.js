import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import getState from "../hooks/appState";

const LoginScreen = () => {
  // @ts-ignore
  const { signInWithGoogle, isLoading } = getState();

  return (
    <View style={styles.container}>
      {isLoading && <Text style={styles.loadTxt}>Loading...</Text>}
      <Text style={styles.otherTxt}>Sign In with Google!</Text>
      <Button title="SIgn In" onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loadTxt: {
    fontSize: 42,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  otherTxt: {
    fontSize: 20,
    marginBottom: 10,
  },
});
