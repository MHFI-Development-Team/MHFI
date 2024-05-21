import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { RenderMdx } from 'rn-mdx';
import { Colors } from '@/constants/Colors';

const ArticleDetail = () => {
  const { title, content } = useLocalSearchParams<{ title: string; content: string }>();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RenderMdx>{content}</RenderMdx>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ArticleDetail;
