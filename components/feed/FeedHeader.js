import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useResponsive } from "react-native-responsive-hook";
import FeedCards from "./FeedCards";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const FeedHeader = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  return (
    <View style={{backgroundColor: "lightgreen", marginBottom: vh(1.6), marginTop: vh(1.6)}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Liked</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const useStyles = (vh) =>
  StyleSheet.create({
    FeedHeaderWrapper: {
      marginTop: vh(1.5),
      paddingHorizontal: vh(1.93),
    },
    button: {
      backgroundColor: "blue",
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignSelf: "center",
    },
    text: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 15,
    },
    buttonContainer: {
      backgroundColor: "red",
      flexDirection: "row",
    },
  });

export default FeedHeader;
