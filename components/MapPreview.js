import * as React from "react"
import MapView from "react-native-maps"
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native"

export default function MapPreview(props) {

  return (
    <TouchableOpacity style={styles.container} onPress={ props.onPress}>
      <MapView style={styles.map} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 350,
    height: 150,
  },
})
