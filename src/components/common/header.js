import React from "react";
import { globalStyles } from "../../assets/style/globalStyle";
import { StyleSheet, Text, View } from "react-native-web";
import ProfileIcon from '../../assets/svg/profileIcon';


export default function Header() {
  return (
    <View style={globalStyles.headerContainer}>
      <ProfileIcon style={globalStyles.headerImage} />
      <Text style={globalStyles.headerText}>Good Morning, <Text style={{fontStyle: 'italic'}}>Abdul</Text></Text>
    </View>
  );
}