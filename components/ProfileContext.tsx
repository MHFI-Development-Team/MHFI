import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileContextType {
  profilePicture: string | null;
  setProfilePicture: React.Dispatch<React.SetStateAction<string | null>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  resetProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

const PROFILE_PICTURE_KEY = 'PROFILE_PICTURE_KEY';
const USERNAME_KEY = 'USERNAME_KEY';
const CURRENCY_KEY = 'CURRENCY_KEY';

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [currency, setCurrency] = useState<string>('€');

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedProfilePicture = await AsyncStorage.getItem(PROFILE_PICTURE_KEY);
        const storedName = await AsyncStorage.getItem(USERNAME_KEY);
        const storedCurrency = await AsyncStorage.getItem(CURRENCY_KEY);
        if (storedProfilePicture) setProfilePicture(storedProfilePicture);
        if (storedName) setName(storedName);
        if (storedCurrency) setCurrency(storedCurrency);
      } catch (error) {
        console.error('Failed to load profile data', error);
      }
    };

    loadProfileData();
  }, []);

  const resetProfile = async () => {
    try {
      await AsyncStorage.multiRemove([PROFILE_PICTURE_KEY, USERNAME_KEY, CURRENCY_KEY]);
      setProfilePicture(null);
      setName('');
      setCurrency('€');
    } catch (error) {
      console.error('Failed to reset profile', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profilePicture, setProfilePicture, name, setName, currency, setCurrency, resetProfile }}>
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