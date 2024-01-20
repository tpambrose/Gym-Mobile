import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { StyleSheet } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { registerMember } from "../api/index";
import { useNavigation } from "@react-navigation/native";
import DisplayError from "./components/DisplayError";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workoutTime, setWorkoutTime] = useState(""); // New state for time
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const userData = await registerMember({
        name,
        email,
        password,
        workoutTime,
      });
      console.log(userData);
      await AsyncStorage.setItem("id", userData?.memberId);
      navigation.navigate("home");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.error || "Registration failed");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background Image */}
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.backgroundImage}
      />

      {/* Black Gradient Cover */}
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.3)", "transparent"]}
        style={styles.gradientOverlay}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
      >
        {/* Title */}
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              Best <Text style={styles.roseText}>Workouts</Text>
            </Text>
            <Text style={styles.titleText}>For You</Text>
          </View>
        </View>

        {/* Registration Form */}
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {/* Time Input */}
          <TextInput
            placeholder="Workout Time (e.g., 22:40)"
            style={styles.input}
            value={workoutTime}
            onChangeText={(text) => setWorkoutTime(text)}
          />

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            style={styles.registerButton}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <DisplayError error={error} />

          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    width: wp(100),
    height: hp(70),
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: hp(12),
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: hp(8),
  },
  titleText: {
    fontSize: hp(5),
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  roseText: {
    color: "#E83D66",
  },
  formContainer: {
    paddingHorizontal: wp(6),
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  registerButton: {
    height: hp(7),
    width: wp(80),
    backgroundColor: "#E83D66",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "rgba(16, 16, 16, 0.83)",
    padding: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: hp(2),
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default Register;
