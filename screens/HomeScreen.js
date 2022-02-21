import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import getState from "../hooks/appState";

const HomeScreen = () => {
  // @ts-ignore
  const { logOut } = getState();
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <Text>Welcome to home</Text>
      <Button
        title="Chat with Us"
        onPress={() => {
          // @ts-ignore
          navigation.navigate("Chat");
        }}
      />
      <Text>Logout Below</Text>
      <Button title="Logout" onPress={logOut} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    display: "flex",
    padding: 20,
  },
});
