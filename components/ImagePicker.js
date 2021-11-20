import React, { useState, useEffect } from "react"
import { Button, Image, View, Platform, StyleSheet, Text } from "react-native"

import * as ImagePicker from "expo-image-picker"
import Colors from "../constants/Colors"

export default function ImagePickerComponent(props) {
  const [image, setImage] = useState(null)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
  }, [])

  const pickImageHandler = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
    props.imageSelectHandler(image)
    // console.log("imagePickerComponentimage", image)
    // console.log("imagePickerComponentresult", result)
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
