import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Platform, Image } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import { useDispatch, useSelector } from "react-redux"

import PlaceItem from "../components/PlaceItem"
import Colors from "../constants/Colors"
import * as PlacesActions from "../store/places-action"

function PlacesListScreen(props) {
  const places = useSelector(state => state.places.places)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(PlacesActions.loadPlaces())
  }, [dispatch])

  return (
    <View>
      <Image
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <PlaceItem
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={itemData.item.address}
            onSelect={() =>
              props.navigation.navigate("PlaceDetail", {
                placeId: itemData.item.id,
              })
            }
          />
        )}
      />
    </View>
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
