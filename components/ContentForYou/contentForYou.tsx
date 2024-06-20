import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Vibration,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Articles } from '@/constants/types';
import globalStyles from '@/constants/globalStyles';
import ContentCard from '@/components/ContentCard';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { styles } from 'rn-mdx';
import { ArticleContext, ArticleContextType } from '../AcrticleContext';

const windowHeight = Dimensions.get('window').height;

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
      <View style={{ transform: [{ translateY: -20 }] }}>
        <View>
          <Text style={[globalStyles.textHeader, { fontWeight: 'bold', fontSize: 20 }]}>
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
                  Vibration.vibrate(50);
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
                  <Text style={[globalStyles.text, { fontWeight: '500', fontSize: 18 }]}>
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
