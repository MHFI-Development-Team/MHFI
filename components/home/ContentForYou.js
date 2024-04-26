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
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const ContentForYou = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Content for you</Text>
        <TouchableOpacity>
          <Text style={styles.subTitleText}>View more</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 10}}>
          <View style={styles.imageWrapper}>
            <Image
              // source={require("../../assets/article-image-1.png")} Image Goes Here
              style={styles.articleImage}
            />
            <Text style={styles.articleTitle}>
              Boost Your Mind Fitness! 🧠💪
            </Text>
          </View>

          {/* TODO: use flatlist */}
          <View style={styles.imageWrapper}>
            <Image
              // source={require("../../assets/article-image-1.png")} Image Goes Here
              style={styles.articleImage}
            />
            <Text style={styles.articleTitle}>
              Boost Your Mind Fitness! 🧠💪
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const useStyles = (vh) =>
  StyleSheet.create({
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    titleText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
    },
    subTitleText: {
      fontSize: 12,
      textDecorationLine: "underline",
      color: "#D17842",
      paddingRight: screenWidth * 0.05
    },
    scrollViewContent: {
      alignItems: "flex-start",
    },
    // imageWrapper: {
    // },
    articleImage: {
      width: 233,
      height: 141,
      borderRadius: 30,
      resizeMode: "cover",
      backgroundColor: "red",
    },
    articleTitle: {
      color: "#FFFFFF",
      fontSize: 14,
      marginTop: vh(0.429),
      width: 233,
      fontWeight: "600",
      textAlign: "center",
    },
  });

export default ContentForYou;
