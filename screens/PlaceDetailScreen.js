import React from "react"
import { View, Text, StyleSheet } from "react-native"

const PlaceDetailScreen = props => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  )
}

PlaceDetailScreen.navigationOptions = navData => {
  console.log(navData.navigation)
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  }
}

export default PlaceDetailScreen
