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
import { styles } from 'rn-mdx';

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
  const [contentForYou, setContentForYou] = useState<Articles[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getArticles = async () => {
      const articles: number[] = require('../../assets/articles/generated-articles.js');
      const content = await Promise.all(articles.map(a => getArticle(a)));

      setContentForYou(content!);
      setLoading(false);
    };

    getArticles();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF922E" />;
  }

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
            {contentForYou.map((content, index) => (
              <TouchableOpacity
                key={index}
                style={{ flexDirection: 'column' }}
                onPress={() =>
                  router.push({
                    pathname: `/[id]`,
                    params: { content: content.content },
                  })
                }>
                <ContentCard imageUri={content.image} size={0} />
                <View
                  style={{
                    marginTop: windowHeight * 0.005,
                    alignItems: 'center',
                    maxWidth: 300,
                  }}>
                  <Text style={[globalStyles.text, { fontWeight: '500', fontSize: 18 }]}>
                    {content.title}
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
