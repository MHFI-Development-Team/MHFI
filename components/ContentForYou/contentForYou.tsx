import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';

import { articles } from '@/constants/types';
import globalStyles from '@/constants/globalStyles';
import ContentCard from '@/components/ContentCard';

const owner = 'DigitalDemi';
const repo = 'Test';

const windowHeight = Dimensions.get('window').height;

const ContentForYou = () => {
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
          const content = await fileContentResponse.text(); //   console.log(content);

          const imageMatch = content.match(/<img src="([^"]+)" \/>/);
          const imageUrl = imageMatch ? imageMatch[1] : 'https://example.com/default-image.jpg';

          return {
            title: file.name,
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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
                      {content.title}
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
