import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native-web";
import { globalStyles } from "../../assets/style/globalStyle";
import { homeStyles } from "../../assets/style/homeStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import BmiIcon from "../../assets/svg/bmiIcon";
import GeoLocatorIcon from "../../assets/svg/geolocatorIcon";

export default function SuggestedTools() {
    return(
        <View style={homeStyles.header}>
            <View style={homeStyles.headerSuggested}>
                <Text style={homeStyles.headerTitle}>Suggested tools</Text>
                <SafeAreaView style={homeStyles.SuggestedTools}>
                    <ScrollView style={homeStyles.flatList} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={homeStyles.TouchableOpacityStyleSuggested}>
                            <BmiIcon />
                            <Text style={homeStyles.colorLight}>BMI Calculator</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={homeStyles.TouchableOpacityStyleSuggested}>
                            <GeoLocatorIcon />
                            <Text style={homeStyles.colorLight}>GeoLocator</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
  }