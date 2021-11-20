import React, { useState, useEffect } from "react"
import { Button, Image, View, Platform, StyleSheet, Text } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

import Colors from "../constants/Colors"

export default function ImagePickerComponent(props) {
  const [image, setImage] = useState()

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      )
      return false
    }
    return true
  }

  const pickImageHandler = async () => {
    const hansPermission = await verifyPermissions()
    if (!hansPermission) {
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    setImage(result.uri)
    props.imageSelectHandler(result.uri)
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Text>No Image Picked yet</Text>
        )}
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button
          title="Take Image"
          color={Colors.primary}
          onPress={pickImageHandler}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
})
