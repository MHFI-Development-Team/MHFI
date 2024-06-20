import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import SquareCard from '../SquareCard';
import globalStyles from '@/constants/globalStyles';
import suggestedTools from '@/components/SuggestTools/suggestToolsData';

import * as Haptics from 'expo-haptics';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SuggestedTools = () => {
  return (
    <>
      <View>
        <View>
          <Text style={[globalStyles.textHeader, { fontWeight: 'bold', fontSize: windowWidth * 0.04 }]}>
            Suggested tools
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10, overflow: 'visible' }}>
          <View style={{ flexDirection: 'row', gap: 25 }}>
            {suggestedTools.map((tool, index) => (
              <Link key={index} href={tool.href} asChild>
                <TouchableOpacity
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }}
                  style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <SquareCard
                    imageUri={tool.image}
                    SvgComponent={tool.SvgComponent}
                    size={windowHeight * 0.125}
                  />
                  <View style={{ marginTop: windowHeight * 0.005 }}>
                    <Text style={[globalStyles.text, { fontWeight: '500' }]}>{tool.name}</Text>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SuggestedTools;
