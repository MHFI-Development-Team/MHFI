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
  SafeAreaView,
} from "react-native";
import SearchBarIcon from "../../assets/svg/searchbar-icon";
import { useResponsive } from "react-native-responsive-hook";

const FeedCards = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity style={styles.cardContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/article-image-1.png")}
          />
          <View style={styles.textContainer}>
            <View style={styles.line} />
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur ... more
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/article-image-1.png")}
          />
          <View style={styles.textContainer}>
            <View style={styles.line} />
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur ... more
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = (vh) =>
  StyleSheet.create({
    cardContainer: {
      marginTop: vh(1.6),
      overflow: "hidden",
      marginBottom: 10,
    },
    image: {
      height: "auto",
      width: "100%",
      aspectRatio: 16 / 9,
      backgroundColor: "grey", // Placeholder color
    },
    textContainer: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 10,
      borderLeftWidth: 2,
      borderLeftColor: "#9AA8E1",
      marginLeft: 4,
    },
    description: {
      flex: 1,
      fontWeight: "400",
      fontSize: 15,
      color: "#DFE2EB",
    },
  });

export default FeedCards;
