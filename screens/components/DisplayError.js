import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DisplayError = ({ error }) => {
  if (!error) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E83D66",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignSelf: "center",
  },
  errorText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DisplayError;
