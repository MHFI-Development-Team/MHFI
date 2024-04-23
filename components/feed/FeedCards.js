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
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const FeedCards = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  return (
    <SafeAreaView>
        <View style={styles.cardContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/article-image-1.png")}
          />
          <View style={styles.textContainer}>
            <Text style={styles.titleCard}>What is testicular cancer?</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur...
            </Text>
            <TouchableOpacity onPress={() => console.log('Read More pressed')} style={styles.titleRead}>
              <Text style={styles.titleTextRead}>Read More</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/article-image-1.png")}
          />
          <View style={styles.textContainer}>
            <Text style={styles.titleCard}>What is testicular cancer?</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur...
            </Text>
            <TouchableOpacity onPress={() => console.log('Read More pressed')} style={styles.titleRead}>
              <Text style={styles.titleTextRead}>Read More</Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
};

const useStyles = (vh) =>
  StyleSheet.create({
    cardContainer: {
      marginBottom: vh(1.6),
      backgroundColor: 'blue',
      borderRadius: 20,
      overflow: "hidden",
    },
    image: {
      height: 'auto',
      width: '100%',      
      aspectRatio: 16 / 9,
      backgroundColor: "grey",
    },
    textContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      padding: 10,
    },
    description: {
      fontWeight: "400",
      fontSize: 13,
      color: "#767676",
    },
    titleCard: {
        fontWeight: '700',
        fontSize: 16,
        color: 'white'
    },
    titleRead: {
      alignSelf: 'center',
      marginTop: 10,
    },
    titleTextRead: {
      color: '#9AA8E2',
      fontSize: 12,
      fontWeight: '500'
    }
  });

export default FeedCards;
