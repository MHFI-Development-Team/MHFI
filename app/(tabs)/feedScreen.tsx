import React, { useState, useEffect, useContext } from 'react';
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
import { Article } from '@/constants/types';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { Dimensions } from 'react-native';
import { ArticleContext, ArticleContextType } from '@/components/AcrticleContext';

import * as Haptics from 'expo-haptics';

const windowWidth = Dimensions.get('window').width;

export default function FeedScreen() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const [contentForYou, setContentForYou] = useState<Article[]>([]);
  const [filteredContent, setFilteredContent] = useState<Article[]>([]);

  const { articles } = React.useContext(ArticleContext) as ArticleContextType;

  // console.log(articles);

  // const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  return (
    <View style={[globalStyles.container, { paddingHorizontal: windowWidth * 0.05 }]}>
      <SafeAreaView edges={['right', 'left', 'top']}>
        <Header />
      </SafeAreaView>
      <View style={{ flex: 1 }}>
        <SearchBar placeholder="Search articles, videos and more" onSearch={handleSearch} />
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagScrollView}>
            {allTags.map(tag => (
              <TouchableOpacity
                key={tag}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  handleTagPress(tag);
                }}
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
            {articles.map((article, index) => (
              <CardComponent
                key={index}
                image={article.thumbnail}
                title={article.title}
                description={article.content.substring(376, 450) + '...'}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                  router.push({
                    pathname: `/${article.id}`,
                    params: { content: article.content },
                  });
                }}
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
