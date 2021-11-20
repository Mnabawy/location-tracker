import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"

const PlaceDetailScreen = props => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
      <Image
        style={{ width: 70, height: 70 }}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
    </View>
  )
}

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  }
}

export default PlaceDetailScreen
