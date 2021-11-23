import React, { useState } from "react"
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from "react-native"
import { useDispatch } from "react-redux"
import ImagePickerComponent from "../components/ImagePicker"
import LocationPicker from "../components/LocationPicker"

import Colors from "../constants/Colors"
import * as placesActions from "../store/places-action"

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState("")
  const [image, setImage] = useState()
  const [location, setLocation] = useState()

  const dispatch = useDispatch()

  const titleChangeHandler = text => {
    setTitleValue(text)
  }

  const selectImageHandler = imagePath => {
    setImage(imagePath)
  }

  const savePlaceHnadler = () => {
    dispatch(placesActions.addPlace(titleValue, image))
    props.navigation.goBack()
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />

        <ImagePickerComponent imageSelectHandler={selectImageHandler} />
        <LocationPicker />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHnadler}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
})

export default NewPlaceScreen
