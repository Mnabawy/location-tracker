import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Platform,
} from "react-native";
import { withNavigation } from "react-navigation";
import * as Location from "expo-location";

import Colors from "../constants/Colors";

function MapViewComponent(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  // target get my curren tlocation on map
  // get my location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []); 

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // when locate btn clicked the map chould be located to my location

  // then i get me location data
  // store the location data in state

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsMyLocationButton={true}
        showsUserLocation={true}
        followsUserLocation={true}
        showsIndoors={true}
        zoomEnabled={true}
        
      />
      <View style={styles.btnContainer}>
        <Button
          title="Locate"
          color={Colors.primary}
          // onPress={() => }
        />
        <Button
          title="Chose on Map"
          color={Colors.primary}
          onPress={() => props.navigation.navigate("Map")}
          style={{ marginLeft: 10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 300,
    height: 300,
  },
  btnContainer: {
    display: "flex",
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});

export default withNavigation(MapViewComponent);
