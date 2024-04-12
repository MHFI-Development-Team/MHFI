import { StyleSheet, Text, View } from "react-native-web";
import { globalStyles } from "../../assets/style/globalStyle";
import { homeStyles } from "../../assets/style/homeStyle";

export default function SuggestedTools() {
    return(
        <View style={homeStyles.goalContainer}>
            <View style={homeStyles.header}>
                <Text style={homeStyles.headerTitle}>Suggested Tools</Text>
            </View>
        </View>
    );
  }