import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import ContentCard from '../ContentCard';
import globalStyles from '@/constants/globalStyles';
import contentForYou from '@/components/ContentForYou/contentForYouData';

const ContentForYou = () => {
  return (
    <>
      <View>
        <Text style={[globalStyles.textHeader, { fontWeight: 'bold', fontSize: 20 }]}>
          Content for you
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', gap: 25 }}>
          {contentForYou.map((content, index) => (
            <Link key={index} href="#" asChild>
              <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }}>
                <ContentCard imageUri={content.image} size={150} text={content.name} />
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ContentForYou;
