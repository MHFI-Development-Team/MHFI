import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const SearchBar = ({ placeholder = 'Search', onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
    Keyboard.dismiss();
    onSearch && onSearch('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch && onSearch(query);
  };

  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={20} color="#FF922E" style={{ marginRight: 10 }} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.icon}>
          <AntDesign name="closecircleo" size={20} color="orange" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.secondary,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'white',
  },
  icon: {
    padding: 5,
  },
});

export default SearchBar;
