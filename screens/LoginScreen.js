import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import getState from "../hooks/appState";

const LoginScreen = () => {
  // @ts-ignore
  const { signInWithGoogle, isLoading } = getState();

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.imgBg}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity style={styles.signin} onPress={signInWithGoogle}>
          <Text style={styles.signTxt}>Sign In & Get Swiping</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    flex: 1,
  },
  signin: {
    position: "absolute",
    bottom: 140,
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignSelf: "center",
    borderRadius: 15,
  },
  signTxt: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
