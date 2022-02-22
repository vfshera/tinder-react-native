import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

import getState from "../../hooks/appState";
import InputField from "../../components/form-inputs/InputField";

const SetUpModal = () => {
  // @ts-ignore
  const { user } = getState();
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={{ uri: "https://links.papareact.com/2pf" }}
        />

        <Text style={styles.welcomeTxt}>Welcome {user.displayName}</Text>

        <InputField
          label="Stap 1 : Profile Picture"
          placeholder="Enter Profile Picture URL"
        />

        <InputField
          label="Stap 2 : Occupation"
          placeholder="Enter Your Occupation"
        />

        <InputField label="Stap 3 : Age" placeholder="Enter Your Age" />

        <TouchableOpacity style={styles.updateBtn}>
          <Text style={styles.updateBtnTxt}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SetUpModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  updateBtnTxt: {
    textAlign: "center",
    color: "white",
    fontWeight: "900",
  },
  updateBtn: {
    width: 200,
    backgroundColor: "#ff5865",
    padding: 15,
    position: "absolute",
    bottom: 40,
    borderRadius: 12,
  },
  logo: {
    width: "100%",
    height: 80,
  },
  welcomeTxt: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#6b7280",
  },
  header: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
});
