import React from "react";
import { globalStyles } from "../../assets/style/globalStyle";
import { StyleSheet, Text, View } from "react-native-web";

export default function Header() {
  return (
    <View style={globalStyles.header}>
      <p>Header</p>
    </View>
  );
}