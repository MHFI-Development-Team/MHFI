import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Article } from '@/constants/types';
import globalStyles from '@/constants/globalStyles';
import ContentCard from '@/components/ContentCard';
import * as Haptics from 'expo-haptics';
import { ArticleContext, ArticleContextType } from '../ArticleContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ContentForYou = () => {
  const { articles } = React.useContext(ArticleContext) as ArticleContextType;
  const router = useRouter();

  return (
    <>
  <View style={{ marginBottom: windowHeight * 0.005 }}>
        <Text
          style={[globalStyles.textHeader, { fontWeight: 'bold', fontSize: windowWidth * 0.04 }]}>
          Content for you
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10, overflow: 'visible' }}>
        <View style={{ flexDirection: 'row', gap: 25 }}>
          {articles.map((article, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={{ flexDirection: 'column' }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push({
                  pathname: `/[id]`,
                  params: { content: article.content },
                });
              }}>
              <ContentCard imageUri={article.thumbnail} size={0} />
              <View
                style={{
                  marginTop: windowHeight * 0.005,
                  alignItems: 'center',
                  maxWidth: 300,
                }}>
                <Text
                  style={[
                    globalStyles.text,
                    { fontWeight: '500', fontSize: windowWidth * 0.035, marginBottom: windowHeight * 0.016 },
                  ]}>
                  {article.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ContentForYou;