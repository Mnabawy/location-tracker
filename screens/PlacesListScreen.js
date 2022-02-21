import React, { useEffect } from "react";
import { View, Platform, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import PlaceItem from "../components/PlaceItem";
import Colors from "../constants/Colors";
import * as placesActions from "../store/places-action";

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places);

  console.log("places", places);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <View>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <PlaceItem
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={itemData.item.address}
            onSelect={() =>
              props.navigation.navigate("PlaceDetail", {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id,
              })
            }
          />
        )}
      />
    </View>
  );
};

PlacesListScreen.navigationOptions = props => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <Icon
        name="md-add"
        size={30}
        color={Platform.OS === "android" ? "white" : Colors.primary}
        onPress={() => {
          props.navigation.navigate("NewPlace");
        }}
      />
    ),
  };
};

export default PlacesListScreen;
