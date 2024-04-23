
import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, Pressable, TouchableOpacity} from 'react-native';
import SearchBarIcon from '../../assets/svg/searchbar-icon';
import { useResponsive } from 'react-native-responsive-hook';

const ContentForYou = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  return (
    <View style={styles.contentForYouWrapper}>
      <View style={styles.contentForYouHeader}>
        <Text
          style={{
            ...styles.dailyGoalsText,
            ...styles.heading,
            ...styles.colorLight,
          }}
        >
          Content for you
        </Text>
        <TouchableOpacity>
          <Text style={{...styles.colorLight, ...styles.linkText, textDecorationLine: 'underline'}}>View more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchbarBarWrapper}>
      <SearchBarIcon style={styles.searchIcon} />
        <TextInput 
          placeholderTextColor={'rgba(255, 255, 255, 0.6)'} 
          placeholder="Search articles, videos and more" 
          style={styles.searchBarInput} 
        />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        style={styles.contentCardWrapper}
      >

        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/article-image-1.png')}
            style={styles.articleImage}
          />
          <Text style={styles.articleTitle}>Testicular Self-Examination: A Guide for Young Men</Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/article-image-2.png')}
            style={styles.articleImage}
          />
          <Text style={styles.articleTitle}>Testosterone: Everything You Need to Know</Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/article-image-3.png')}
            style={styles.articleImage}
          />
          <Text style={styles.articleTitle}>6 Foods Every Man Over 50 Should Avoid Eating — and Why</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const useStyles = (vh) => StyleSheet.create({
  contentForYouWrapper: {
    marginTop: vh(2.575),

  },
  contentForYouHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  searchbarBarWrapper: {
    borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: vh(1.93),
    paddingVertical: vh(1.0729),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(108, 92, 231, 0.25)',
    backgroundColor: 'rgba(21, 43, 134, 0.2)',
    marginBottom: vh(1.5),
  },
  searchBarInput: {
    width: '100%',
    height: '100%',
    flexShrink: 1,
    color: '#fff'
  },
  searchIcon: {
    opacity: "0.7",
    marginRight: vh(1), 
  },
  scrollViewContent: {
    alignItems: 'flex-start',
  },
  imageWrapper: {
    marginTop: vh(1),
    marginRight: vh(2), 
  },
  articleImage: {
    width: vh(15), 
    height: vh(15), 
    borderRadius: vh(1),
    resizeMode: "contain"
  },
  articleTitle: {
    color: '#FFFFFF',
    fontSize: vh(1.8),
    marginTop: vh(1),
    width: vh(15)
  },

});

export default ContentForYou;