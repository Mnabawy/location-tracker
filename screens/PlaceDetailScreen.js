import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";

import MapPreview from "../components/MapPreview";

const PlaceDetailScreen = props => {
  const placeId = props.navigation.getParam("placeId");

  const selectedPlace = useSelector(state =>
    state.places.places.find(place => place.id === placeId)
  );

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const showMapHandler = () => {
    props.navigation.navigate("Map", {
      readOnly: true,
      initialLocation: selectedLocation,
    });
  };

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
          style={styles.map}
          location={selectedLocation}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  imgTextContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 10,
  },
  map: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
