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
import { articles } from '@/constants/types';
import { FrontmatterAttributes } from '@/components/FrontMatterAttributes';
import { useRouter } from 'expo-router';
import fm from 'front-matter';

const owner = 'DigitalDemi';
const repo = 'Test';

export default function FeedScreen() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [contentForYou, setContentForYou] = useState<articles[]>([]);
  const [filteredContent, setFilteredContent] = useState<articles[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fileListResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/`
        );
        const fileListData = await fileListResponse.json();
        const fileNames = fileListData.map((file: any) => ({
          name: file.name,
          download_url: file.download_url,
        }));

        const articlePromises = fileNames.map(async (file: any) => {
          const fileContentResponse = await fetch(file.download_url);
          const content = await fileContentResponse.text();

          const parsedContent = fm<FrontmatterAttributes>(content);
          const frontmatter = parsedContent.attributes;

          const tags = frontmatter.tags || [];
          const titleMatch = content.match(/^# (.+)/);
          const title = frontmatter.title || (titleMatch ? titleMatch[1] : file.name);

          const imageMatch = content.match(/<img src="([^"]+)" \/>/);
          const imageUrl = imageMatch ? imageMatch[1] : 'https://example.com/default-image.jpg';

          return {
            title,
            id: file.name,
            content,
            image: imageUrl,
            tags,
          };
        });

        const articles = await Promise.all(articlePromises);
        setContentForYou(articles);
        setFilteredContent(articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles from GitHub:', error);
        setLoading(false);
      }
    };

    fetchArticles();
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
    <View style={[globalStyles.container, { paddingHorizontal: 16 }]}>
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
                onPress={() => handleTagPress(tag)}
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
                onPress={() =>
                  router.push({
                    pathname: `/${content.id}`,
                    params: { content: content.content },
                  })
                }
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
