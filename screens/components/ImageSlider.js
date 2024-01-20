import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ImageSlider = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require("../../assets/images/slide1.png")}
          style={styles.singleImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  singleImage: {
    marginTop: hp(3),
    width: wp(90),
    height: hp(30),
  },
};

export default ImageSlider;
