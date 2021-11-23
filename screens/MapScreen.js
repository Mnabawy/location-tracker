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
  const [selectedLocation, setSelecctedLocation] = useState()

  const mapRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  // goal how to pick a place
  //create a selected location state var done
  // set tha selected location to the location from the map done
  // create a markerCondition done

  // goal add save btn in the mapscreen
  // when clicked close the map screen

  const savedLocationHandler = useCallback(() => {
    if (!selectedLocation) return

    props.navigation.navigate("NewPlace", {
      pickedLocation: selectedLocation,
    })
  }, [selectedLocation])

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savedLocationHandler })
  }, [setSelecctedLocation])

  let markerCondition
  if (selectedLocation)
    markerCondition = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    }

  const pickLocationHanlder = e => {
    setSelecctedLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude,
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
        {markerCondition && (
          <Marker title="Picked Location" coordinate={markerCondition} />
        )}
      </MapView>
    </View>
  )
}

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam("saveLocation")
  return {
    headerRight: () => (
      <TouchableOpacity onPress={saveFn}>
        <Text>Save</Text>
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
})

export default MapScreen
