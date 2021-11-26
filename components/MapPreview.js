import * as React from "react"
import MapView, { Marker } from "react-native-maps"
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native"

export default function MapPreview(props) {
  const intialRegion = {
    latitude: 31.2500243,
    longitude: 29.9709028,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <MapView
        style={props.style}
        region={props.region ? props.region : intialRegion}
      >
        {props.region.latitude && props.region.longitude ? (
          <Marker
            coordinate={{
              latitude: props.region.latitude,
              longitude: props.region.longitude,
            }}
          />
        ) : null}
      </MapView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
