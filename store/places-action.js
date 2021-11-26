import * as FileSystem from "expo-file-system"
import * as Location from "expo-location"

import { insertPlace, fetchData } from "../helper/db"

export const ADD_PLACE = "ADD_PLACE"
export const SET_PLACES = "SET_PLACES"

export const addPlace = (title, image, location) => {
  return async dispatch => {
    const response = await Location.reverseGeocodeAsync(location)

    if (!response) {
      throw new Error("something went wrong")
    }

    const address = response[0].street + " " + response[0].region
    const fileName = image.split("/").pop()
    const newPath = FileSystem.documentDirectory + fileName

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      })
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.latitude,
        location.longitude
      )
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        },
      })
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchData()
      dispatch({ type: SET_PLACES, places: dbResult.rows._array })
    } catch (err) {
      throw err
    }
  }
}
