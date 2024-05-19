import { Stack } from "expo-router";
import TabBarIcon from "@/components/navigation/TabBarIcon";
import { View } from "react-native";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";

const HeaderLeftIcon = () => (
  <TouchableOpacity>
    <Link href="(tabs)">
      <View>
        <TabBarIcon name="leftcircleo" color="white" />
      </View>
    </Link>
  </TouchableOpacity>
);

export default HeaderLeftIcon;
