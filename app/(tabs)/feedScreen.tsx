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
import Button from '@/components/Button';
import CardComponent from '@/components/CardComponent';
import { Colors } from '@/constants/Colors';
import { articles } from '@/constants/types';
import { FrontmatterAttributes } from '@/components/FrontMatterAttributes';
import { useRouter } from 'expo-router';
import fm from 'front-matter';

const owner = 'DigitalDemi';
const repo = 'Test';

export default function FeedScreen() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
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

  const handleButtonPress = (button: string) => {
    setSelectedButton(button);
  };

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
    setSelectedTag(tag);
    if (tag) {
      const filtered = contentForYou.filter(article => article.tags.includes(tag));
      setFilteredContent(filtered);
    } else {
      setFilteredContent(contentForYou);
    }
  };

  const allTags = [...new Set(contentForYou.flatMap(article => article.tags))];

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={[globalStyles.container, { paddingHorizontal: 16 }]}>
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <View style={{ flex: 1 }}>
        <SearchBar placeholder="Search articles, videos and more" onSearch={handleSearch} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
          <Button
            title="Popular"
            onPress={() => handleButtonPress('Popular')}
            style={
              selectedButton === 'Popular' ? styles.customButton : styles.notFocusedStyleButton
            }
            textStyle={
              selectedButton === 'Popular' ? styles.customText : styles.notFocusedStyleButtonText
            }
          />
          <Button
            title="Following"
            onPress={() => handleButtonPress('Following')}
            style={
              selectedButton === 'Following' ? styles.customButton : styles.notFocusedStyleButton
            }
            textStyle={
              selectedButton === 'Following' ? styles.customText : styles.notFocusedStyleButtonText
            }
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {allTags.map(tag => (
              <TouchableOpacity key={tag} onPress={() => handleTagPress(tag)}>
                <Text style={[styles.tagButton, selectedTag === tag && styles.selectedTagButton]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
  customButton: {
    backgroundColor: Colors.ButtonColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  customText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
  },
  notFocusedStyleButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  notFocusedStyleButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  cardContainer: {
    paddingVertical: 10,
  },
  tagButton: {
    backgroundColor: Colors.ButtonColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  selectedTagButton: {
    backgroundColor: '#aaa',
  },
});
