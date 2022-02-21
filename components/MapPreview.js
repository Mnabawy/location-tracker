import * as React from "react"
import MapView, { Marker } from "react-native-maps"
import { Image, StyleSheet, TouchableOpacity } from "react-native"

import { vars } from "../env"

export default function MapPreview(props) {
  let imagePreviewUrl
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat}
    ,${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${vars.googleKey}`
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
})
