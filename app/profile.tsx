import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { useProfile } from '@/components/ProfileContext';

const PROFILE_PICTURE_KEY = 'PROFILE_PICTURE_KEY';
const USERNAME_KEY = 'USERNAME_KEY';

const Profile = () => {
  const { profilePicture, setProfilePicture, name, setName } = useProfile();
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedProfilePicture = await AsyncStorage.getItem(PROFILE_PICTURE_KEY);
        const storedName = await AsyncStorage.getItem(USERNAME_KEY);
        if (storedProfilePicture) setProfilePicture(storedProfilePicture);
        if (storedName) setName(storedName);
      } catch (error) {
        console.error('Failed to load profile data', error);
      }
    };

    loadProfileData();
  }, []);

  const saveProfilePicture = async (uri: string) => {
    try {
      await AsyncStorage.setItem(PROFILE_PICTURE_KEY, uri);
      setProfilePicture(uri);
    } catch (error) {
      console.error('Failed to save profile picture', error);
    }
  };

  const saveName = async (name: string) => {
    try {
      await AsyncStorage.setItem(USERNAME_KEY, name);
      setName(name);
    } catch (error) {
      console.error('Failed to save name', error);
    }
  };

  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const handleDeleteApp = () => {
    Alert.alert(
      'Delete App',
      'Are you sure you want to delete the app?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('App Deleted') },
      ],
      { cancelable: true }
    );
  };

  const handleResetApp = () => {
    Alert.alert(
      'Reset App',
      'Are you sure you want to reset the app?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => console.log('App Reset') },
      ],
      { cancelable: true }
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      saveProfilePicture(uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                profilePicture
                  ? { uri: profilePicture }
                  : require('@/assets/images/adaptive-icon.png')
              }
              style={styles.profilePicture}
            />
          </TouchableOpacity>
          <Text style={styles.changePictureText}>Change Profile Picture</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={saveName}
          />
        </View>
        <View style={styles.settingsSection}>
          <Text style={styles.sectionHeader}>Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Enable Notifications</Text>
            <Switch
              value={notificationEnabled}
              onValueChange={toggleNotification}
              thumbColor={notificationEnabled ? Colors.ButtonColor : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#767577' }}
            />
          </View>
          <TouchableOpacity style={styles.settingItem} onPress={handleDeleteApp}>
            <Text style={[styles.settingText, styles.destructiveText]}>Delete App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={handleResetApp}>
            <Text style={[styles.settingText, styles.destructiveText]}>Reset App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF',
  },
  changePictureText: {
    marginTop: 10,
    color: Colors.ButtonColor,
    fontSize: 16,
  },
  textInput: {
    width: '100%',
    padding: 10,
    paddingHorizontal: 70,
    marginTop: 10, 
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    color: '#FFF',
    fontSize: 18,
  },
  settingsSection: {
    width: '100%',
  },
  sectionHeader: {
    fontSize: 22,
    color: '#FFF',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  settingText: {
    color: '#FFF',
    fontSize: 18,
  },
  destructiveText: {
    color: Colors.ButtonColor,
  },
});

export default Profile;