import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { loginMember } from "../api/index";
import DisplayError from "./components/DisplayError";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userData = await loginMember({ email, password });
      console.log(userData);
      await AsyncStorage.setItem("id", userData?.userId);
      navigation.navigate("home");
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.error || "Login failed");
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
            Best <Text style={styles.roseText}>Workouts</Text>
          </Text>
          <Text style={styles.titleText}>For You</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
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

          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <DisplayError error={error} />

          <TouchableOpacity
            onPress={() => navigation.navigate("register")}
            style={styles.registerButton}
          >
            <Text style={styles.buttonText}>
              Don't have an account? Register
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
  loginButton: {
    height: hp(7),
    width: wp(80),
    backgroundColor: "#E83D66",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  registerButton: {
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

export default Login;
