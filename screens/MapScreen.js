import React, { useCallback, useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native"
import MapView, { Marker } from "react-native-maps"
import Colors from "../constants/Colors"

const MapScreen = props => {
  const initialLocation = props.navigation.getParam("selectedLocation")
  const readOnly = props.navigation.getParam("readOnly")

  const [selectedLocation, setSelecctedLocation] = useState(initialLocation)

  const mapRegion = {
    latitude: 31.205753,
    longitude: 29.924526,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const savedLocationHandler = useCallback(() => {
    if (!selectedLocation) return

    props.navigation.navigate("NewPlace", {
      pickedLocation: selectedLocation,
    })
  }, [selectedLocation])

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savedLocationHandler })
  }, [savedLocationHandler])

  let markerCondition
  if (selectedLocation)
    markerCondition = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    }

  const pickLocationHanlder = e => {
    if (readOnly) return

    setSelecctedLocation({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    })
  }

  return (
    <View>
      <MapView
        showsUserLocation={true}
        style={styles.map}
        region={mapRegion}
        onPress={pickLocationHanlder}
      >
        {markerCondition.latitude && markerCondition.longitude && (
          <Marker title="Picked Location" coordinate={markerCondition} />
        )}
      </MapView>
    </View>
  )
}

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam("saveLocation")
  const readOnly = navData.navigation.getParam("readOnly")
  if (readOnly) return {}

  return {
    headerRight: () => (
      <TouchableOpacity onPress={saveFn} style={styles.save}>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  save: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
})

export default MapScreen
