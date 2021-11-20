import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

export default function PlaceItem(props) {

  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: props.image }} />

        <View style={styles.textContainer}>
          <Text style={{ fontWeight: "bold" }}>{props.title}</Text>
          <Text>{props.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "gray",
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    padding: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "gray",
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginLeft: 15,
  },
})
