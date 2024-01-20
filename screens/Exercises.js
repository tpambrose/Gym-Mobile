import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchExercisesByBodypart } from "../api/exerciseDB";
import { demoExercises } from "../constants/constants";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ExerciseList from "./components/ExerciseList";
import { useRoute } from "@react-navigation/native";

export default function Exercises() {
  const navigation = useNavigation();
  const route = useRoute();
  const [exercises, setExercises] = useState([]);
  const item = route.params?.item || {};

  useEffect(() => {
    if (item) getExercises(item.name);
  }, [item]);

  const getExercises = async (bodypart) => {
    let data = await fetchExercisesByBodypart(bodypart);
    setExercises(data);
  };

  return (
    <ScrollView>
      <StatusBar style="light" />
      <Image source={item.image} style={styles.image} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        {/* <Ionicons name="caret-back-outline" size={hp(4)} color="white" /> */}
      </TouchableOpacity>

      {/* Exercises */}
      <View style={styles.exercisesContainer}>
        <Text style={styles.exercisesTitle}>{item.name} exercises</Text>
        <View style={styles.exerciseListContainer}>
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: wp(100),
    height: hp(45),
    borderRadius: 40,
  },
  backButton: {
    backgroundColor: "#E83D66",
    width: hp(5.5),
    height: hp(5.5),
    marginTop: hp(7),
    borderRadius: hp(5.5) / 2,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: hp(2),
  },
  exercisesContainer: {
    margin: wp(4),
    marginTop: hp(4),
    marginBottom: hp(10),
  },
  exercisesTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#333", // Change this to your desired text color
  },
  exerciseListContainer: {
    marginBottom: hp(10),
  },
});
