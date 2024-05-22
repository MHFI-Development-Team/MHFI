import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '@/constants/globalStyles';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import CardComponent from '@/components/CardComponent';
import { Colors } from '@/constants/Colors';
import { articles } from '@/constants/types';

const owner = 'DigitalDemi';
const repo = 'Test';

export default function FeedScreen() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [contentForYou, setContentForYou] = useState<articles[]>([]);
  const [loading, setLoading] = useState(true);

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

          const titleMatch = content.match(/^# (.+?):/);
          const title = titleMatch ? titleMatch[1] : file.name;

          const imageMatch = content.match(/<img src="([^"]+)" \/>/);
          const imageUrl = imageMatch ? imageMatch[1] : 'https://example.com/default-image.jpg';

          return {
            title,
            id: file.name,
            content,
            image: imageUrl,
          };
        });

        const articles = await Promise.all(articlePromises);
        setContentForYou(articles);
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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={[globalStyles.container, { paddingHorizontal: 16 }]}>
      <Header />
      <View style={{ flex: 1 }}>
        <SearchBar placeholder="Search articles, videos and more" onSearch={undefined} />
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
        <ScrollView style={{ marginTop: 20 }}>
          {contentForYou.map(content => (
            <CardComponent
              key={content.id}
              image={content.image}
              title={content.title}
              description={content.content.substring(245, 345) + '...'}
              id={content.id}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: Colors.ButtonColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  customText: {
    color: 'black',
    fontSize: 15,
  },
  notFocusedStyleButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  notFocusedStyleButtonText: {
    color: 'white',
    fontSize: 15,
  },
});
