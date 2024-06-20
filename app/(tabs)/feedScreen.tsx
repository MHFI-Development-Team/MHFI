import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '@/constants/globalStyles';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CardComponent from '@/components/CardComponent';
import { Colors } from '@/constants/Colors';
import { FrontmatterAttributes } from '@/components/FrontMatterAttributes';
import { useRouter } from 'expo-router';
import fm from 'front-matter';
import { Articles } from '@/constants/types';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { Dimensions } from 'react-native';
import { Vibration } from 'react-native';

const windowWidth = Dimensions.get("window").width;

const getArticle = async (requireNumber: number) => {
  const [{ name, localUri }] = await Asset.loadAsync(requireNumber);
  const content = await FileSystem.readAsStringAsync(localUri!);

  const parsedContent = fm<FrontmatterAttributes>(content);
  const frontmatter = parsedContent.attributes;

  const tags = frontmatter.tags || [];
  const titleMatch = content.match(/^# (.+)/);
  const title = frontmatter.title || (titleMatch ? titleMatch[1] : name);

  const imageMatch = content.match(/<img src="([^"]+)" \/>/);
  const imageUrl = imageMatch ? imageMatch[1] : 'https://example.com/default-image.jpg';

  return {
    title,
    id: name,
    content,
    image: imageUrl,
    tags,
  } as Articles;
};

export default function FeedScreen() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [contentForYou, setContentForYou] = useState<Articles[]>([]);
  const [filteredContent, setFilteredContent] = useState<Articles[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getArticles = async () => {
      const articles: number[] = require('../../assets/articles/generated-articles.js');
      const content = await Promise.all(articles.map(a => getArticle(a)));

      setContentForYou(content!);
      setFilteredContent(content!);
      setLoading(false);
    };

    getArticles();
  }, []);

  const handleSearch = (query: string) => {
    if (query) {
      const filtered = contentForYou.filter(
        article =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredContent(filtered);
    } else {
      setFilteredContent(contentForYou);
    }
  };

  const handleTagPress = (tag: string | null) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setFilteredContent(contentForYou);
    } else {
      setSelectedTag(tag);
      const filtered = contentForYou.filter(article => article.tags.includes(tag));
      setFilteredContent(filtered);
    }
  };

  const allTags = [...new Set(contentForYou.flatMap(article => article.tags))];

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={[globalStyles.container,]}>
      <SafeAreaView edges={['right', 'left', 'top']}>
        <Header />
      </SafeAreaView>
      <View style={[{flex: 1}, { paddingHorizontal: windowWidth * 0.05 }]}>
        <SearchBar placeholder="Search articles, videos and more" onSearch={handleSearch} />
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagScrollView}>
            {allTags.map(tag => (
              <TouchableOpacity
                key={tag}
                onPress={() => {{Vibration.vibrate(50); handleTagPress(tag)}}}
                style={[styles.tagButton, selectedTag === tag && styles.selectedTagButton]}>
                <Text
                  style={[
                    styles.tagButtonText,
                    selectedTag === tag && styles.selectedTagButtonText,
                  ]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
          <View style={styles.cardContainer}>
            {filteredContent.map((content, index) => (
              <CardComponent
                key={index}
                image={content.image}
                title={content.title}
                description={content.content.substring(376, 450) + '...'}
                onPress={() => {{Vibration.vibrate(50);
                  router.push({
                    pathname: `/${content.id}`,
                    params: { content: content.content },
                  })
                }}}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 10,
  },
  tagScrollView: {
    marginVertical: 10,
  },
  tagButton: {
    backgroundColor: Colors.ButtonColor,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 35,
    minHeight: 35,
    minWidth: 100,
  },
  tagButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  selectedTagButton: {
    backgroundColor: Colors.secondary,
  },
  selectedTagButtonText: {
    color: 'white',
  },
});
