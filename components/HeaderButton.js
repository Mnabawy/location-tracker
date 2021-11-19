import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";


import Colors from "../constants/Colors";

const CustomHeaderButton = props => {
  return (
    <HeaderButtons
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
    />
  );
};

export default CustomHeaderButton;
