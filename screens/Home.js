import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageSlider from "./components/ImageSlider";
import BodyParts from "./components/BodyParts";
import { useNavigation } from "@react-navigation/native";
import DisplayError from "./components/DisplayError";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />

      <View style={styles.headerContainer}>
        <Text style={styles.punchlineText}>Gym App</Text>
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("update")} 
          >
            <Image
              source={require("../assets/images/avatar.png")}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Slider */}
      <View style={styles.imageSliderContainer}>
        <ImageSlider />
      </View>

      {/* Body Parts List */}
      <View style={styles.bodyPartsContainer}>
        <BodyParts />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: wp(3),
  },
  heading: {
    fontSize: hp(4),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around ",
    alignItems: "center",
  },
  punchlineContainer: {
    spaceY: hp(2.5),
  },
  punchlineText: {
    fontSize: hp(4.5),
    fontWeight: "bold",
    color: "#333333", // Change to your preferred color
  },
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 5,
  },
  avatarImage: {
    height: hp(6),
    width: hp(6),
    borderRadius: hp(3),
  },
  imageSliderContainer: {
    marginBottom: hp(35),
  },
  bodyPartsContainer: {
    flex: 1,
  },
};

export default Home;
