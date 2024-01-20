import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  getAllExercises,
  addExercise,
  removeExercise,
  updateExerciseDay,
} from "../../sqlite/index";

const ExerciseList = ({ data }) => {
  const navigation = useNavigation();
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [showDayModal, setShowDayModal] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [displaySaved, setDisplaySaved] = useState(false);

  useEffect(() => {
    // Fetch exercises when the component mounts
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const result = await getAllExercises();
      setExercises(result.rows._array);
      console.log("Exercises fetched successfully");
      console.log(result.rows._array);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const handleLikePress = async (exercise) => {
    console.log("exercise liked");
    try {
      // Save the exercise and reload data after saving
      await addExercise(exercise);
      await fetchExercises();
      console.log("Exercise liked and saved successfully");
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  const handleUnlikePress = (exercise) => {
    // Remove the exercise and reload data after removing
    removeExercise(
      exercise.id,
      () => {
        console.log("Exercise unliked and removed successfully");
        fetchExercises();
      },
      (error) => {
        console.error("Error removing exercise:", error);
      }
    );
  };

  const handleUpdateDayPress = (exercise) => {
    setSelectedExercise(exercise);
    setShowDayModal(true);
  };

  const handleDaySelect = async () => {
    if (selectedExercise?.liked) {
      try {
        // Update the day only if the exercise is liked
        await updateExerciseDay(selectedExercise.id, selectedDay);
        // Reload the exercise data after updating the day
        await fetchExercises();
        console.log("Exercise day updated successfully");
      } catch (error) {
        console.error("Error updating exercise day:", error);
      }
    }
    // Close the modal after updating the day
    setShowDayModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, !displaySaved && styles.activeTab]}
          onPress={() => setDisplaySaved(false)}
        >
          <Text style={[styles.tabText, !displaySaved && styles.activeTabText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, displaySaved && styles.activeTab]}
          onPress={() => setDisplaySaved(true)}
        >
          <Text style={[styles.tabText, displaySaved && styles.activeTabText]}>
            Saved
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displaySaved ? exercises.filter((e) => e.liked) : data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => (
          <ExerciseCard
            navigation={navigation}
            index={index}
            item={item}
            onLikePress={() => handleLikePress(item)}
            onUnlikePress={() => handleUnlikePress(item)}
            onUpdateDayPress={() => handleUpdateDayPress(item)}
          />
        )}
      />

      {/* Day selection modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDayModal}
        onRequestClose={() => setShowDayModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Select a day:</Text>
            <Picker
              selectedValue={selectedDay}
              onValueChange={(itemValue) => setSelectedDay(itemValue)}
            >
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
            </Picker>
            <TouchableOpacity
              onPress={handleDaySelect}
              style={styles.modalButton}
            >
              <Text style={styles.likeText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ExerciseCard = ({
  navigation,
  item,
  index,
  onLikePress,
  onUnlikePress,
  onUpdateDayPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.cardTouchable}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.gifUrl }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>

        <Text style={styles.cardText}>
          {item?.name?.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
        </Text>
      </TouchableOpacity>

      {item.liked ? (
        <View>
          <Text style={styles.day}>Done on: {item.day}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={onUnlikePress}
              style={styles.unlikeButton}
            >
              <Text style={styles.likeText}>Unlike</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onUpdateDayPress}
              style={styles.updateButton}
            >
              <Text>Update Day</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={onLikePress} style={styles.likeButton}>
          <Text style={styles.likeText}>Like</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  activeTab: {
    borderBottomColor: "#D23631",
  },
  tabText: {
    color: "#333",
    fontSize: 16,
  },
  activeTabText: {
    color: "#D23631",
  },
  listContainer: {
    paddingBottom: 60,
    paddingTop: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cardContainer: {
    margin: wp(2),
  },
  cardTouchable: {
    flex: 1,
    paddingTop: hp(1.5),
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: wp(4),
    overflow: "hidden",
  },
  image: {
    width: wp(44),
    height: wp(52),
    borderRadius: wp(4),
  },
  cardText: {
    fontSize: hp(1.7),
    color: "black",
    fontWeight: "bold",
    marginLeft: wp(1),
    marginTop: hp(0.5),
    letterSpacing: 0.5,
  },
  day: {
    fontSize: hp(1.7),
    color: "#D23631",
    fontWeight: "bold",
    marginLeft: wp(1),
    marginTop: hp(0.5),
    letterSpacing: 0.5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  likeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#D23631",
    borderRadius: 5,
    alignItems: "center",
    color: "white",
  },
  likeText: {
    color: "white",
  },
  unlikeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  updateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
  },
  // New styles for the modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#D23631",
    borderRadius: 5,
    alignItems: "center",
  },
});

export default ExerciseList;
