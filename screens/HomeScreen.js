import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  View,
  Platform,
  StatusBar,
} from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Fontisto, Ionicons, Entypo } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import getState from "../hooks/appState";

const HomeScreen = () => {
  // @ts-ignore
  const { logOut, user } = getState();
  const navigation = useNavigation();

  const swiperRef = useRef(null);

  const CARDS = [
    {
      id: 1,
      firstName: "Franklin",
      lastName: "Shera",
      occupation: "Software Engineer",
      photo: "https://picsum.photos/600/800",
      age: 25,
    },
    {
      id: 2,
      firstName: "Gregory",
      lastName: "Anthony",
      occupation: "Music Producer",
      photo: "https://picsum.photos/600/800",
      age: 22,
    },
    {
      id: 3,
      firstName: "Joshua",
      lastName: "Ngulo",
      occupation: "Graphic Designer",
      photo: "https://picsum.photos/600/800",
      age: 24,
    },
    {
      id: 4,
      firstName: "Winstone",
      lastName: "Avoze",
      occupation: "Film Director",
      photo: "https://picsum.photos/600/800",
      age: 22,
    },
    {
      id: 5,
      firstName: "Hillary",
      lastName: "Mujumba",
      occupation: "Wildlife Conservationist",
      photo: "https://picsum.photos/600/800",
      age: 34,
    },
  ];

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={logOut}>
          <Image style={styles.profile} source={{ uri: user.photoURL }} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Fontisto name="tinder" size={56} color="#ff5865" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              // @ts-ignore
              "Chat"
            )
          }
        >
          <Ionicons name="chatbubbles-sharp" size={30} color="#ff5865" />
        </TouchableOpacity>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={CARDS}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          backgroundColor="white"
          swipeBackCard
          verticalSwipe={false}
          onSwipedLeft={() => console.log("NOPE")}
          onSwipedRight={() => console.log("MATCH")}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4ded30",
                },
              },
            },
          }}
          renderCard={(card) => (
            <View key={card.id} style={styles.card}>
              <Image
                style={styles.cardImg}
                source={{ uri: card.photo + `?random=${card.id}` }}
              />

              <View style={styles.cardInfo}>
                <View style={styles.infoGroup}>
                  <Text style={styles.nameInfo}>
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.occupation}</Text>
                </View>

                <Text style={styles.ageInfo}>{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.btnsContainer}>
        <TouchableOpacity
          onPress={() => swiperRef.current.swipeLeft()}
          style={styles.crossBtn}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swiperRef.current.swipeRight()}
          style={styles.heartBtn}
        >
          <Entypo name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  crossBtn: {
    height: 64,
    width: 64,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    backgroundColor: "#ff000022",
  },
  heartBtn: {
    height: 64,
    width: 64,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    backgroundColor: "#00ff0022",
  },
  btnsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "20%",
  },
  swiperContainer: {
    flex: 1,
  },
  infoGroup: {
    display: "flex",
  },
  nameInfo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  ageInfo: {
    fontSize: 26,
    fontWeight: "bold",
  },
  cardInfo: {
    position: "absolute",
    paddingHorizontal: 24,
    paddingVertical: 10,
    bottom: 0,
    zIndex: 5,
    height: 80,
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardImg: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    zIndex: 0,
    borderRadius: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    height: "75%",
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1.3,
    elevation: 2,
  },
  main: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  header: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
