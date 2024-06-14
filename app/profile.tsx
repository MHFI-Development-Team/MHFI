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
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { useProfile } from '@/components/ProfileContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PROFILE_PICTURE_KEY = 'PROFILE_PICTURE_KEY';
const USERNAME_KEY = 'USERNAME_KEY';
const CURRENCY_KEY = 'CURRENCY_KEY';

const Profile = () => {
  const { profilePicture, setProfilePicture, name, setName, currency, setCurrency, resetProfile } = useProfile();
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

  const saveCurrency = async (currency: string) => {
    try {
      await AsyncStorage.setItem(CURRENCY_KEY, currency);
      setCurrency(currency);
    } catch (error) {
      console.error('Failed to save currency', error);
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
        { text: 'Reset', style: 'destructive', onPress: resetProfile },
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
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.changePictureText}>Change Profile Picture</Text>
          </TouchableOpacity>
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
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Currency</Text>
            <View style={styles.currencyContainer}>
              <TouchableOpacity
                style={[styles.currencyButton, currency === '€' && styles.currencyButtonSelected]}
                onPress={() => saveCurrency('€')}
              >
                <Text style={styles.currencyButtonText}>€</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.currencyButton, currency === '£' && styles.currencyButtonSelected]}
                onPress={() => saveCurrency('£')}
              >
                <Text style={styles.currencyButtonText}>£</Text>
              </TouchableOpacity>
            </View>
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
    padding: windowWidth * 0.05,
    alignItems: 'center',
  },
  header: {
    fontSize: windowHeight * 0.035,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: windowHeight * 0.025,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: windowHeight * 0.035,
  },
  profilePicture: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: windowWidth * 0.15,
    backgroundColor: '#FFF',
  },
  changePictureText: {
    marginTop: windowHeight * 0.012,
    color: Colors.ButtonColor,
    fontSize: windowHeight * 0.02,
  },
  textInput: {
    width: '100%',
    padding: windowWidth * 0.025,
    paddingHorizontal: windowWidth * 0.18,
    marginTop: windowHeight * 0.012,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: windowHeight * 0.006,
    color: '#FFF',
    fontSize: windowHeight * 0.022,
  },
  settingsSection: {
    width: '100%',
  },
  sectionHeader: {
    fontSize: windowHeight * 0.028,
    color: '#FFF',
    marginBottom: windowHeight * 0.012,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: windowHeight * 0.018,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  settingText: {
    color: '#FFF',
    fontSize: windowHeight * 0.022,
  },
  currencyContainer: {
    flexDirection: 'row',
  },
  currencyButton: {
    padding: windowWidth * 0.025,
    paddingHorizontal: windowWidth * 0.037,
    borderRadius: windowHeight * 0.012,
    borderColor: '#FFF',
    borderWidth: 1,
    marginHorizontal: windowWidth * 0.012,
  },
  currencyButtonSelected: {
    backgroundColor: Colors.ButtonColor,
  },
  currencyButtonText: {
    color: '#FFF',
    fontSize: windowHeight * 0.022,
  },
  destructiveText: {
    color: Colors.ButtonColor,
  },
});

export default Profile;