import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View style={styles.parent}>
      <Text style={styles.txt}>Loading...</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  parent: {
    display: "flex",
    padding: 50,
    backgroundColor: "#9a444e",
  },
  txt: {
    color: "white",
    fontSize: 32,
  },
});
