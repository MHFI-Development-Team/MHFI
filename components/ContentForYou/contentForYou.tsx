import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Articles } from '@/constants/types';
import globalStyles from '@/constants/globalStyles';
import ContentCard from '@/components/ContentCard';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';
import { styles } from 'rn-mdx';
import { ArticleContext, ArticleContextType } from '../AcrticleContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const getArticle = async (requireNumber: number) => {
  const [{ name, localUri }] = await Asset.loadAsync(requireNumber);
  const content = await FileSystem.readAsStringAsync(localUri!);

  const titleMatch = content.match(/^# (.+?):/);
  const title = titleMatch ? titleMatch[1] : name;

  const imageMatch = content.match(/<img src="([^"]+)" \/>/);
  const imageUrl = imageMatch ? imageMatch[1] : 'https://example.com/default-image.jpg';

  return {
    title,
    id: name,
    content,
    image: imageUrl,
  } as Articles;
};

const ContentForYou = () => {
  const { articles } = React.useContext(ArticleContext) as ArticleContextType;
  const router = useRouter();

  return (
    <>
      <View style={{ translateY: -30 }}>
        <View>
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
                      { fontWeight: '500', fontSize: windowWidth * 0.04 },
                    ]}>
                    {article.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ContentForYou;
