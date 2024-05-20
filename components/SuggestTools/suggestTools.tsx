import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import SquareCard from '../SquareCard';
import globalStyles from '@/constants/globalStyles';
import suggestedTools from '@/components/SuggestTools/suggestToolsData';

const SuggestedTools = () => {
  return (
    <>
      <View>
        <Text style={[globalStyles.textHeader, { fontWeight: 'bold', fontSize: 20 }]}>
          Suggested tools
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', gap: 25 }}>
          {suggestedTools.map((tool, index) => (
            <Link key={index} href="#" asChild>
              <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }}>
                <SquareCard
                  imageUri={tool.image}
                  SvgComponent={tool.SvgComponent}
                  size={150}
                  text={tool.name}
                />
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default SuggestedTools;
