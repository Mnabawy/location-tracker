import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { withNavigation } from "react-navigation"
import * as Permissions from "expo-permissions"

import Colors from "../constants/Colors"
import MapPreview from "./MapPreview"
import * as Location from "expo-location"

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false)
  const [location, setLocation] = useState()
  const [intialRegion, setIntialRegion] = useState()

  const pickedLocation = props.navigation.getParam("pickedLocation")
  console.log(pickedLocation)

  useEffect(() => {
    if (pickedLocation) {
      setLocation(pickedLocation)
    }
  }, [pickedLocation])

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION)
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      )
      return false
    }
    return true
  }

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map")
  }

  const getLocationHandler = async () => {
    const hansPermission = await verifyPermissions()

    if (hansPermission)
      try {
        setIsFetching(false)
        const location = await Location.getCurrentPositionAsync()

        // send the location to the newPlace Screen
        props.locationSelectHandler(location.coords)

        setLocation({
          lat: location.coords.altitude,
          lng: location.coords.longitude,
        })
      } catch (err) {
        Alert.alert(
          "could not fetch location!",
          "please try again later or pich it on the map",
          [{ text: "Okay" }]
        )
      }
    else Alert.alert("you dont have permissions to use location")
    setIsFetching(true)
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {!isFetching ? (
          <Text>No Location chosen yet</Text>
        ) : (
          <View>
            <TouchableOpacity onPress={pickOnMapHandler}>
              <MapPreview location={location} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.btnsContainer}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick On Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnsContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
})

export default withNavigation(LocationPicker)
