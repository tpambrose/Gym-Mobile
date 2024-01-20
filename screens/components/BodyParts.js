import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { bodyParts } from "../../constants/constants";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function BodyParts() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Exercises</Text>

      <FlatList
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => (
          <BodyPartCard navigation={navigation} index={index} item={item} />
        )}
      />
    </View>
  );
}

const BodyPartCard = ({ navigation, item, index }) => {
  return (
    <Animated.View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("exercises", { item: item })}
        style={styles.cardTouchable}
      >
        <Image
          source={item.image}
          resizeMode="cover"
          style={styles.cardImage}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.gradientOverlay}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Text style={styles.cardText}>{item?.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = {
  container: {
    marginLeft: wp(0),
    marginRight: wp(0),
  },
  titleText: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "black",
  },
  listContainer: {
    paddingBottom: hp(5),
    paddingTop: hp(2),
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cardContainer: {
    marginBottom: hp(2),
  },
  cardTouchable: {
    width: wp(42),
    height: wp(42),
    borderRadius: wp(52) / 2,
    overflow: "hidden",
  },
  cardImage: {
    width: wp(44),
    height: wp(52),
    borderRadius: wp(44) / 2, // Make the image inside the card full circle
  },
  gradientOverlay: {
    width: wp(44),
    height: hp(15),
    position: "absolute",
    bottom: 0,
    borderRadius: wp(44) / 2, // Match the border radius of the card
  },
  cardText: {
    fontSize: hp(2.3),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    bottom: hp(3),
    width: wp(44),
  },
};
