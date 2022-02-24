import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  inputValue: string;
  onChange: any;
}

const InputField: FC<InputProps> = ({
  label,
  placeholder,
  inputValue,
  onChange,
  ...otherProps
}) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={onChange}
        placeholder={placeholder}
        {...otherProps}
      />
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
