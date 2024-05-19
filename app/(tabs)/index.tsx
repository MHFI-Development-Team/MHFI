import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import CircularCard from "@/components/CircularCard";
import { Link } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from "@/constants/globalStyles";
import SquareCard from "@/components/SquareCard";
import ContentCard from "@/components/ContentCard"


type dailyGoalsTasks = {
  task: string;
  maxtaskcount: number;
  image: string;
};

type SuggestedTools = {
  image: string;
  name: string;
  link: typeof Link;
};

type ContentForYou = {
  image: string;
  name: string;
  link: typeof Link;
};

const dailyGoalsTasksArray: dailyGoalsTasks[] = [
  {
    task: "Jogging",
    maxtaskcount: 3,
    image: "https://randomwordgenerator.com/img/picture-generator/54e7d14b4250a414f1dc8460962e33791c3ad6e04e50744172297cdc924cc3_640.jpg"
  },
  {
    task: "Reading",
    maxtaskcount: 1,
    image: "https://randomwordgenerator.com/img/picture-generator/54e4d2444855a814f1dc8460962e33791c3ad6e04e507440762879dc974fcd_640.jpg"
  },
  {
    task: "Meditation",
    maxtaskcount: 2,
    image: "https://randomwordgenerator.com/img/picture-generator/52e3d2424355ac14f1dc8460962e33791c3ad6e04e507440762e79d09548c6_640.jpg"
  }
];

const suggestedToolsArray: SuggestedTools[] = [
  {
    image: "https://randomwordgenerator.com/img/picture-generator/action-3810699_640.jpg",
    name: "Tool 1",
    link: Link
  },
  {
    image: "https://randomwordgenerator.com/img/picture-generator/boards-2040575_640.jpg",
    name: "Tool 2",
    link: Link
  },
  {
    image: "https://randomwordgenerator.com/img/picture-generator/55e8d7444e57a814f1dc8460962e33791c3ad6e04e5074417c2e7dd29744c7_640.jpg",
    name: "Tool 3",
    link: Link
  }
];

const contentForYouArray: ContentForYou[] = [
  {
    image: "https://randomwordgenerator.com/img/picture-generator/54e2d3475754a809ea898279c02132761022dfe05a50704f742c73dc_640.jpg",
    name: "Content 1",
    link: Link
  },
  {
    image: "https://randomwordgenerator.com/img/picture-generator/57e2dd424251ac14f1dc8460962e33791c3ad6e04e50744077297bd59448c2_640.jpg",
    name: "Content 2",
    link: Link
  },
  {
    image: "https://randomwordgenerator.com/img/picture-generator/57e2dd424251ac14f1dc8460962e33791c3ad6e04e50744077297bd59448c2_640.jpg",
    name: "Content 3",
    link: Link
  }
];

const homeScreen = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header />
      <View style={styles.DailyGoalscontent}>
        <View>
          <Text style={[globalStyles.textHeader, { fontWeight: "bold", fontSize: 20 }]}>
            Your Daily Goals
          </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 25 }}>
            {dailyGoalsTasksArray.map((goal, index) => (
              <Link key={index} href="/dailyGoalsTasks" asChild>
                <TouchableOpacity key={index} style={{ flexDirection: "column", alignItems: "center" }}>
                  <CircularCard imageUri={goal.image} size={150} />
                  <Text style={[globalStyles.text, { fontWeight: "500" }]}>{goal.task}</Text>
                  <Text style={[globalStyles.text, { fontWeight: "500" }]}>
                    0 / {goal.maxtaskcount} Task{goal.maxtaskcount > 1 ? 's' : ''}
                  </Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </ScrollView>
      </View>
      <View>
        <Text style={[globalStyles.textHeader, { fontWeight: "bold", fontSize: 20 }]}>Suggested tools</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 25 }}>
          {suggestedToolsArray.map((tool, index) => (
            <Link key={index} href="#" asChild>
              <TouchableOpacity style={{ flexDirection: "column", alignItems: "center" }}>
                <SquareCard imageUri={tool.image} size={150} text={tool.name} />
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
      <View>
        <Text style={[globalStyles.textHeader, { fontWeight: "bold", fontSize: 20 }]}>Content for you</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 25 }}>
          {contentForYouArray.map((content, index) => (
            <Link key={index} href="#" asChild>
              <TouchableOpacity style={{ flexDirection: "column", alignItems: "center" }}>
                <ContentCard imageUri={content.image} size={150} text={content.name} />
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  DailyGoalscontent: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
});

export default homeScreen;
