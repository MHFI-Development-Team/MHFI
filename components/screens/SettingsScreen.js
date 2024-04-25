import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons} from "@expo/vector-icons";

const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{
      flex: 1
      
    }}>
      <View style={{
        marginHorizontal: 12,
        flexDirection: "row" ,
        justifyContent: "center"
      }}>
        <TouchableOpacity
         onPress={()=>navigation.goBack()}
         style={{
          position: "absolute",
          left: 0

         }}
        >

          <MaterialIcons
          name="keyboard-arrow-left"
          size={24}
          />
          <Text>Settings</Text>



        </TouchableOpacity>
        


      </View>

      





</SafeAreaView>

  )
}

export default SettingsScreen