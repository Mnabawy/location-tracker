import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PlacesNavigator from "./navigation/PlacesNavigator";
import PlaceDetailScreen from "./screens/PlaceDetailScreen";
import "react-native-gesture-handler";

export default function App() {
  return <PlacesNavigator />;
}