import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileContextType {
  profilePicture: string | null;
  setProfilePicture: React.Dispatch<React.SetStateAction<string | null>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

const PROFILE_PICTURE_KEY = 'PROFILE_PICTURE_KEY';
const USERNAME_KEY = 'USERNAME_KEY';

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setName] = useState<string>('');

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

  return (
    <ProfileContext.Provider value={{ profilePicture, setProfilePicture, name, setName }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};