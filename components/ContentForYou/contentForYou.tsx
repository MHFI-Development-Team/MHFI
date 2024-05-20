import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import ContentCard from '../ContentCard';
import globalStyles from '@/constants/globalStyles';
import contentForYou from '@/components/ContentForYou/contentForYouData';

const windowHeight = Dimensions.get('window').height;

const ContentForYou = () => {
  return (
    <>
      <View>
        <View>
          <Text style={[globalStyles.textHeader, { fontWeight: 'bold', fontSize: 20 }]}>
            Content for you
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', gap: 25 }}>
            {contentForYou.map((content, index) => (
              <Link key={index} href="#" asChild>
                <TouchableOpacity style={{ flexDirection: 'column' }}>
                  <ContentCard imageUri={content.image} size={0} />
                  <View
                    style={{
                      marginTop: windowHeight * 0.005,
                      alignItems: 'center',
                      maxWidth: 300,
                    }}>
                    <Text style={[globalStyles.text, { fontWeight: '500', fontSize: 18 }]}>
                      {content.name}
                    </Text>
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

export default ContentForYou;
