import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { HeaderButtons } from "react-navigation-header-buttons";


import Colors from "../constants/Colors";

const CustomHeaderButton = props => {
  return (
    <HeaderButtons
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
