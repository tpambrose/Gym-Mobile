import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
      <StatusBar style="light" />

      {/* Background Image */}
      <Image
        source={require("../assets/images/welcome.png")}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      />

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent"]}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: hp(12),
          paddingHorizontal: wp(5),
          width: "100%", // Ensure gradient covers entire width
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: hp(4.5),
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1,
            textAlign: "center", // Center-align text
            marginBottom: hp(5), // Add margin to space it from the button
          }}
        >
          Discover a New Way to{" "}
          <Text style={{ color: "#E83D66" }}>Stay Fit</Text>
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("register")}
          style={{
            height: hp(7),
            width: wp(80), // Wider button
            backgroundColor: "#E83D66",
            borderRadius: hp(3.5),
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderWidth: 2,
            borderColor: "#fff",
            marginTop: hp(2), // Add margin to space it from the bottom
          }}
        >
          <Text
            style={{
              fontSize: hp(3),
              color: "white",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
