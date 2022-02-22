import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fontisto, Ionicons, Entypo } from "@expo/vector-icons";

const Loader = () => {
  return (
    <View style={styles.parent}>
      <Fontisto name="tinder" size={86} color="#ff5865" />

      <Text style={styles.txt}>Loading...</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  parent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  txt: {
    color: "#ff5865",
    fontSize: 22,
  },
});
