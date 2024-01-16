import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  updateMemberById,
  deleteMemberById,
  getMemberById,
} from "../api/index";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

export default function Update(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [workoutTime, setWorkoutTime] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("id");
        const response = await getMemberById(userId);
        console.log(response);
        const userData = response.member;

        setEmail(userData.email);
        setName(userData.name);
        setWorkoutTime(userData.workoutTime);

        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      await updateMemberById(userId, { name, email, workoutTime });
      setError(null);
      setName("");
      setEmail("");
      navigation.navigate("home");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      await deleteMemberById(userId);
      setError(null);
      navigation.navigate("welcome");
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");
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
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Update <Text style={styles.roseText}>Your</Text>
          </Text>
          <Text style={styles.titleText}>Profile</Text>
        </View>

        {/* Update Form */}
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
            placeholder="Workout Time (e.g., 22:40)"
            style={styles.input}
            value={workoutTime}
            onChangeText={(text) => setWorkoutTime(text)}
          />

          {/* Update Button */}
          <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

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
    width: "100%",
    height: "70%",
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: "12%",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: "8%",
  },
  titleText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  roseText: {
    color: "#E83D66",
  },
  formContainer: {
    paddingHorizontal: "6%",
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
  updateButton: {
    height: hp(7),
    width: wp(80),

    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#E83D66",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  deleteButton: {
    height: hp(7),
    width: wp(80),
    backgroundColor: "#E83D66",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    marginBottom: 10,
  },
});
