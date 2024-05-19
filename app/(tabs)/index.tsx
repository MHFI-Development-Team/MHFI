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
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row", gap: 25 }}>
            <TouchableOpacity
              style={{ flexDirection: "column", alignItems: "center" }}
            >
              <CircularCard
                imageUri="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg"
                size={150}
              />
              <Text style={[globalStyles.text, { fontWeight: "500"}]}>
                Physical Activity
              </Text>
              <Text style={[globalStyles.text, { fontWeight: "500"}]}>
                0 / 1 Task
              </Text>
            </TouchableOpacity>
            <Link href="/dailyGoalsTasks" asChild>
              <TouchableOpacity
                style={{ flexDirection: "column", alignItems: "center" }}
              >
                <CircularCard
                  imageUri="https://cdn.mos.cms.futurecdn.net/7GCPeSkqz3duhcXkg7E6H7-320-80.jpg"
                  size={150}
                />
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </View>
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
