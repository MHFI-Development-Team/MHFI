import React from "react";
import { View } from "react-native";
import { globalStyles } from "../assets/style/globalStyle";
import Header from "../components/common/header";

export default function HomeScreen() {
  return (
    <View style={globalStyles.mainPageContainer}>
      <Header />
      
    </View>
  );
}