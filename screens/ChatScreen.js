import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.main}>
      <Text>ChatScreen</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            // @ts-ignore
            "Home"
          )
        }
      >
        <Text>Back To Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  main: {
    display: "flex",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
