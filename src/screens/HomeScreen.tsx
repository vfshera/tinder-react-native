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
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Fontisto, Ionicons, Entypo } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import getState from "../hooks/appState";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "../services/firebaseAuth";

const HomeScreen = () => {
  // @ts-ignore
  const { logOut, user } = getState();

  const navigation = useNavigation();

  const swiperRef = useRef<any>(null);

  interface IProfile {
    id: string;
    photo: string;
    displayName: string;
    job: string;
    age: string;
  }

  const [profiles, setProfiles] = useState<DocumentData[]>([]);

  const PASSED = "passed";
  const MATCHED = "matched";

  const swipeHandler = async (cardIndex: number, action: string) => {
    //GETS PASSED OR MATCHED USER
    const profile = profiles[cardIndex];

    if (!profile) return;

    setDoc(doc(db, "users", user.uid, action, profile.id), profile);
  };

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          // @ts-ignore
          navigation.navigate("setUp");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const getCards = async () => {
      // @ts-ignore
      // const passedIDs = getDocs(
      //   collection(db, "users", user.uid, "passed")
      // ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      // @ts-ignore
      // console.log("PASSED LENGTH", passedIDs.length);

      unsub = onSnapshot(
        // @ts-ignore
        // query(
        collection(db, "users"),
        // where("id", "not-in", [...passedIDs])),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((fildoc) => fildoc.id != user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    getCards();

    return unsub;
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={logOut}>
          <Image style={styles.profile} source={{ uri: user.photoURL }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              // @ts-ignore
              "setUp"
            )
          }
        >
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
          cards={profiles}
          stackSize={profiles.length > 1 ? 5 : 1}
          cardIndex={0}
          animateCardOpacity
          backgroundColor="white"
          swipeBackCard
          verticalSwipe={false}
          horizontalSwipe={profiles.length > 0 ? true : false}
          onSwipedLeft={(cardIndex) => swipeHandler(cardIndex, PASSED)}
          onSwipedRight={(cardIndex) => swipeHandler(cardIndex, MATCHED)}
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
          renderCard={(card) =>
            card ? (
              <View key={card.id} style={styles.card}>
                <Image style={styles.cardImg} source={{ uri: card.photo }} />

                <View style={styles.cardInfo}>
                  <View style={styles.infoGroup}>
                    <Text style={styles.nameInfo}>{card.displayName}</Text>
                    <Text>{card.job}</Text>
                  </View>

                  <Text style={styles.ageInfo}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.noCard}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 24,
                    marginBottom: 10,
                  }}
                >
                  No More Cards!
                </Text>
                <Image
                  style={{
                    height: 100,
                    width: 100,
                  }}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
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
  noCard: {
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 0,
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
