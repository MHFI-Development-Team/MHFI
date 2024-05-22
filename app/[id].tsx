import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { RenderMdx } from 'rn-mdx';
import { Colors } from '@/constants/Colors';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ArticleDetail = () => {
  const { title, content } = useLocalSearchParams<{ title: string; content: string }>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{title}</Text>
        <RenderMdx componentStyle={styles}>{content}</RenderMdx>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: windowWidth * 0.04,
    paddingBottom: windowHeight * 0.04,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
  },
});

export default ArticleDetail;
