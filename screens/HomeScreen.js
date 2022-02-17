import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
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
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    display: "flex",
  },
});
