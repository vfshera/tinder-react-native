import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";

import getState from "../../hooks/appState";
import InputField from "../../components/form-inputs/InputField";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const SetUpModal = () => {
  const navigation = useNavigation();
  // @ts-ignore
  const { user } = getState();

  const [imageUrl, setImageUrl] = useState("");
  const [job, setJob] = useState("");
  const [age, setAge] = useState("");

  const formIncomplete = !imageUrl || !job || !age;

  const updateProfile = () => {
    console.log("UPDATE PROFILE CALLED");
    console.log(user);
    // @ts-ignore
    setDoc(
      // @ts-ignore
      doc(db, "users", user.uid),
      {
        id: user.uid,
        displayName: user.displayName,
        photo: imageUrl,
        job: job,
        timestamp: serverTimestamp(),
      }
      // @ts-ignore
    )
      // @ts-ignore
      .then(() => navigation.navigate("Home"))
      .catch((err) => {
        console.log("ENCOUTERED ERROR");
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={{ uri: "https://links.papareact.com/2pf" }}
            />

            <Text style={styles.welcomeTxt}>Welcome {user.displayName}</Text>

            <InputField
              label="Stap 1 : Profile Picture"
              placeholder="Enter profile picture url"
              inputValue={imageUrl}
              onChange={setImageUrl}
            />

            <InputField
              label="Stap 2 : Occupation"
              placeholder="Enter your occupation"
              inputValue={job}
              onChange={setJob}
            />

            <InputField
              label="Stap 3 : Age"
              placeholder="Enter your age"
              inputValue={age}
              onChange={setAge}
              // @ts-ignore
              keyboardType="numeric"
              maxLength={2}
            />

            <TouchableOpacity
              onPress={updateProfile}
              disabled={formIncomplete}
              style={[
                styles.updateBtn,
                formIncomplete
                  ? {
                      backgroundColor: "#9fa3ae",
                    }
                  : {
                      backgroundColor: "#ff5865",
                    },
              ]}
            >
              <Text style={styles.updateBtnTxt}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
