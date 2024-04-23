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
import SearchBarIcon from "../../assets/svg/searchbar-icon";
import { useResponsive } from "react-native-responsive-hook";
import FeedCards from "./FeedCards";

const FeedHeader = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  return (
    <View>
      <View style={styles.FeedHeaderWrapper}>
        <View style={styles.searchbarBarWrapper}>
          <SearchBarIcon style={styles.searchIcon} />
          <TextInput
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            placeholder="Search articles, videos and more"
            style={styles.searchBarInput}
          />
        </View>
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
    </View>
  );
};

const useStyles = (vh) =>
  StyleSheet.create({
    searchbarBarWrapper: {
      borderRadius: 100,
      flexDirection: "row",
      paddingHorizontal: vh(1.93),
      paddingVertical: vh(1.0729),
      alignItems: "center",
      borderWidth: 1,
      borderColor: "rgba(108, 92, 231, 0.25)",
      backgroundColor: "rgba(21, 43, 134, 0.2)",
    },
    searchBarInput: {
      width: "100%",
      height: "100%",
      flexShrink: 1,
      color: "#fff",
    },
    searchIcon: {
      opacity: "0.7",
      marginRight: vh(1),
    },
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
      marginTop: vh(1.6),
      flexDirection: "row",
      alignItems: "center",
      gap: vh(1.4),
      marginBottom: vh(1.6),
    },
  });

export default FeedHeader;
