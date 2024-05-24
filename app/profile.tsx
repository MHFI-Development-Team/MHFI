import React, { useState } from 'react';
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';

const Profile = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

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
      setProfilePicture(result.uri);
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
        </View>
        <View style={styles.likedPostsSection}>
          <Text style={styles.sectionHeader}>Liked Posts</Text>
          <Text style={styles.noLikedPostsText}>You have no liked posts.</Text>
        </View>
        <View style={styles.settingsSection}>
          <Text style={styles.sectionHeader}>Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Enable Notifications</Text>
            <Switch
              value={notificationEnabled}
              onValueChange={toggleNotification}
              thumbColor={notificationEnabled ? Colors.ButtonColor : '#f4f3f4'}
              trackColor={{ false: '#767577', true: Colors.primary }}
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
  likedPostsSection: {
    width: '100%',
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 22,
    color: '#FFF',
    marginBottom: 10,
  },
  noLikedPostsText: {
    color: '#888',
    textAlign: 'center',
  },
  settingsSection: {
    width: '100%',
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
