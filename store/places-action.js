import * as FileSystem from "expo-file-system"

import { insertPlace, fetchData } from "../helper/db"

export const ADD_PLACE = "ADD_PLACE"
export const SET_PLACES = "SET_PLACES"

export const addPlace = (title, image) => {
  return async dispatch => {
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
        "Dummy address",
        15.6,
        12.3
      )
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title: title, image: newPath },
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
      console.log("loadPlaces", dbResult)
      dispatch({ type: SET_PLACES, places: dbResult.rows._array})
    } catch (err) {
      throw err
    }
  }
}
