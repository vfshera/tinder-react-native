import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const InputField = ({
  label = "Input Label",
  placeholder = "Input Placeholder",
}) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputWrapper: {},
  label: {
    fontWeight: "700",
    textAlign: "center",
    padding: 15,
    color: "#ff5865",
  },
  input: {
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 20,
  },
});
