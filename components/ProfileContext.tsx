import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  _id: number | string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar?: string | null;
  };
}

interface ProfileContextType {
  profilePicture: string | null;
  setProfilePicture: React.Dispatch<React.SetStateAction<string | null>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  resetProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

const PROFILE_PICTURE_KEY = 'PROFILE_PICTURE_KEY';
const USERNAME_KEY = 'USERNAME_KEY';
const CURRENCY_KEY = 'CURRENCY_KEY';
const MESSAGES_KEY = 'MESSAGES_KEY';

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [currency, setCurrency] = useState<string>('€');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedProfilePicture = await AsyncStorage.getItem(PROFILE_PICTURE_KEY);
        const storedName = await AsyncStorage.getItem(USERNAME_KEY);
        const storedCurrency = await AsyncStorage.getItem(CURRENCY_KEY);
        const storedMessages = await AsyncStorage.getItem(MESSAGES_KEY);

        if (storedProfilePicture) setProfilePicture(storedProfilePicture);
        if (storedName) setName(storedName);
        if (storedCurrency) setCurrency(storedCurrency);
        if (storedMessages) setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error('Failed to load profile data', error);
      }
    };

    loadProfileData();
  }, []);

  const resetProfile = async () => {
    try {
      await AsyncStorage.multiRemove([PROFILE_PICTURE_KEY, USERNAME_KEY, CURRENCY_KEY, MESSAGES_KEY]);
      setProfilePicture(null);
      setName('');
      setCurrency('€');
      setMessages([]);
    } catch (error) {
      console.error('Failed to reset profile', error);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  return (
    <ProfileContext.Provider value={{ profilePicture, setProfilePicture, name, setName, currency, setCurrency, messages, setMessages, resetProfile }}>
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