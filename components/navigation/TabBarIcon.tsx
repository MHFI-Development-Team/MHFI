import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

export type TabBarIconName = React.ComponentProps<typeof AntDesign>['name'];

export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof AntDesign>["name"]>) {
    return <AntDesign size={20} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

export default TabBarIcon;