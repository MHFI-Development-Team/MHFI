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
  setName: (newName: string) => void;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  todayEmotion: string;
  setTodayEmotion: React.Dispatch<React.SetStateAction<string>>;
  todayRecommendation: string;
  setTodayRecommendation: React.Dispatch<React.SetStateAction<string>>;
  emotionColors: string[];
  setEmotionColors: React.Dispatch<React.SetStateAction<string[]>>;
  recommendationColors: string[];
  setRecommendationColors: React.Dispatch<React.SetStateAction<string[]>>;
  emotionBackground: string;
  setEmotionBackground: React.Dispatch<React.SetStateAction<string>>;
  recommendationBackground: string;
  setRecommendationBackground: React.Dispatch<React.SetStateAction<string>>;
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
const TODAY_EMOTION_KEY = 'TODAY_EMOTION_KEY';
const TODAY_RECOMMENDATION_KEY = 'TODAY_RECOMMENDATION_KEY';
const EMOTION_COLORS_KEY = 'EMOTION_COLORS_KEY';
const RECOMMENDATION_COLORS_KEY = 'RECOMMENDATION_COLORS_KEY';
const EMOTION_BACKGROUND_KEY = 'EMOTION_BACKGROUND_KEY';
const RECOMMENDATION_BACKGROUND_KEY = 'RECOMMENDATION_BACKGROUND_KEY';

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setNameState] = useState<string>('');
  const [currency, setCurrency] = useState<string>('€');
  const [messages, setMessages] = useState<Message[]>([]);
  const [todayEmotion, setTodayEmotion] = useState<string>('');
  const [todayRecommendation, setTodayRecommendation] = useState<string>('');
  const [emotionColors, setEmotionColors] = useState<string[]>([]);
  const [recommendationColors, setRecommendationColors] = useState<string[]>([]);
  const [emotionBackground, setEmotionBackground] = useState<string>('');
  const [recommendationBackground, setRecommendationBackground] = useState<string>('');

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedProfilePicture = await AsyncStorage.getItem(PROFILE_PICTURE_KEY);
        const storedName = await AsyncStorage.getItem(USERNAME_KEY);
        const storedCurrency = await AsyncStorage.getItem(CURRENCY_KEY);
        const storedMessages = await AsyncStorage.getItem(MESSAGES_KEY);
        const storedTodayEmotion = await AsyncStorage.getItem(TODAY_EMOTION_KEY);
        const storedTodayRecommendation = await AsyncStorage.getItem(TODAY_RECOMMENDATION_KEY);
        const storedEmotionColors = await AsyncStorage.getItem(EMOTION_COLORS_KEY);
        const storedRecommendationColors = await AsyncStorage.getItem(RECOMMENDATION_COLORS_KEY);
        const storedEmotionBackground = await AsyncStorage.getItem(EMOTION_BACKGROUND_KEY);
        const storedRecommendationBackground = await AsyncStorage.getItem(
          RECOMMENDATION_BACKGROUND_KEY
        );

        if (storedProfilePicture) setProfilePicture(storedProfilePicture);
        if (storedName) setNameState(storedName);
        if (storedCurrency) setCurrency(storedCurrency);
        if (storedMessages) setMessages(JSON.parse(storedMessages));
        if (storedTodayEmotion) setTodayEmotion(storedTodayEmotion);
        if (storedTodayRecommendation) setTodayRecommendation(storedTodayRecommendation);
        if (storedEmotionColors) setEmotionColors(JSON.parse(storedEmotionColors));
        if (storedRecommendationColors)
          setRecommendationColors(JSON.parse(storedRecommendationColors));
        if (storedEmotionBackground) setEmotionBackground(storedEmotionBackground);
        if (storedRecommendationBackground)
          setRecommendationBackground(storedRecommendationBackground);
      } catch (error) {
        console.error('Failed to load profile data', error);
      }
    };

    loadProfileData();
  }, []);

  const setName = async (newName: string) => {
    setNameState(newName);
    await AsyncStorage.setItem(USERNAME_KEY, newName);
  };

  const resetProfile = async () => {
    try {
      await AsyncStorage.multiRemove([
        PROFILE_PICTURE_KEY,
        USERNAME_KEY,
        CURRENCY_KEY,
        MESSAGES_KEY,
        TODAY_EMOTION_KEY,
        TODAY_RECOMMENDATION_KEY,
        EMOTION_COLORS_KEY,
        RECOMMENDATION_COLORS_KEY,
        EMOTION_BACKGROUND_KEY,
        RECOMMENDATION_BACKGROUND_KEY,
      ]);
      setProfilePicture(null);
      setNameState('');
      setCurrency('€');
      setMessages([]);
      setTodayEmotion('');
      setTodayRecommendation('');
      setEmotionColors([]);
      setRecommendationColors([]);
      setEmotionBackground('');
      setRecommendationBackground('');
    } catch (error) {
      console.error('Failed to reset profile', error);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    AsyncStorage.setItem(TODAY_EMOTION_KEY, todayEmotion);
  }, [todayEmotion]);

  useEffect(() => {
    AsyncStorage.setItem(TODAY_RECOMMENDATION_KEY, todayRecommendation);
  }, [todayRecommendation]);

  useEffect(() => {
    AsyncStorage.setItem(EMOTION_COLORS_KEY, JSON.stringify(emotionColors));
  }, [emotionColors]);

  useEffect(() => {
    AsyncStorage.setItem(RECOMMENDATION_COLORS_KEY, JSON.stringify(recommendationColors));
  }, [recommendationColors]);

  useEffect(() => {
    AsyncStorage.setItem(EMOTION_BACKGROUND_KEY, emotionBackground);
  }, [emotionBackground]);

  useEffect(() => {
    AsyncStorage.setItem(RECOMMENDATION_BACKGROUND_KEY, recommendationBackground);
  }, [recommendationBackground]);

  return (
    <ProfileContext.Provider
      value={{
        profilePicture,
        setProfilePicture,
        name,
        setName,
        currency,
        setCurrency,
        messages,
        setMessages,
        todayEmotion,
        setTodayEmotion,
        todayRecommendation,
        setTodayRecommendation,
        emotionColors,
        setEmotionColors,
        recommendationColors,
        setRecommendationColors,
        emotionBackground,
        setEmotionBackground,
        recommendationBackground,
        setRecommendationBackground,
        resetProfile,
      }}>
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
