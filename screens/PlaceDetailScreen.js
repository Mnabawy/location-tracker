import React from "react"
import { View, Text, StyleSheet, Image, Dimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useSelector } from "react-redux"
import MapPreview from "../components/MapPreview"

const PlaceDetailScreen = props => {
  const placeId = props.navigation.getParam("placeId")
  const selectedPlace = useSelector(state =>
    state.places.places.find(place => place.id === placeId)
  )

  const initialRegion = {
    latitude: 26.8206,
    longitude: 30.8025,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  const selectedLocation = {
    latitude: selectedPlace.latitude,
    longitude: selectedPlace.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const showMapHandler = () => {
    props.navigation.navigate("Map", {
      readOnly: true,
      selectedLocation: selectedLocation,
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: selectedPlace.imageUri,
        }}
      />
      <View style={styles.imgTextContainer}>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.titleText}>Title: {selectedPlace.title}</Text>
          <Text style={{ marginRight: 5 }}>
            Address: {selectedPlace.address}
          </Text>
        </View>
        <MapPreview
          region={!selectedLocation ? initialRegion : selectedLocation}
          style={styles.map}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  )
}

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  }
}

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  image: {
    width: Dimensions.get("window").width,
    height: 200,
    marginBottom: 10,
  },
  imgTextContainer: { alignItems: "flex-start" },
  titleText: { fontWeight: "bold", fontSize: 17, marginVertical: 10 },
  map: {
    width: Dimensions.get("window").width,
    height: 250,
    marginVertical: 10,
  },
})

export default PlaceDetailScreen
