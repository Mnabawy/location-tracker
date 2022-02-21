import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const PlaceItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.container}>
      <Image style={styles.image} source={{ uri: props.image }} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "gray",
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginLeft: 15,
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: "#666",
    fontSize: 16,
  },
});
