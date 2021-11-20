import React, { useState } from "react"
import { View, Text, StyleSheet, Platform } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import { useSelector } from "react-redux"

import PlaceItem from "../components/PlaceItem"
import Colors from "../constants/Colors"

function PlacesListScreen(props) {
  const places = useSelector(state => state.places.places)

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          title={itemData.item.title}
          image={itemData.item.imageUri}
          address="address"
          onSelect={() =>
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            })
          }
        />
      )}
    />
  )
}

PlacesListScreen.navigationOptions = props => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <Icon
        name="md-add"
        size={30}
        color={Platform.OS === "android" ? "white" : Colors.primary}
        onPress={() => {
          props.navigation.navigate("NewPlace")
        }}
      />
    ),
  }
}

export default PlacesListScreen
