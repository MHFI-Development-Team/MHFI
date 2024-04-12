import React from "react";
import { View } from "react-native";
import { globalStyles } from "../assets/style/globalStyle";
import Header from "../components/common/header";
import DailyGoals from "../components/home/DailyGoals";
import SuggestedTools from "../components/home/SuggestedTools";

export default function HomeScreen() {
  return (
    <View style={globalStyles.mainPageContainer}>
      <Header />
      <DailyGoals />
      <SuggestedTools />
    </View>
  );
}