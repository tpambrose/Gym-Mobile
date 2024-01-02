import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Exercises from "./screens/Exercises";
import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import { createTable } from "./sqlite";
import Update from "./screens/Update";

const App = () => {
  useEffect(() => {
    createTable();
  });

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="update" component={Update} />
        <Stack.Screen name="exercises" component={Exercises} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
AppRegistry.registerComponent("main", () => App);
