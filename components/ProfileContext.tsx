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
        const [
          storedProfilePicture,
          storedName,
          storedCurrency,
          storedMessages,
          storedTodayEmotion,
          storedTodayRecommendation,
          storedEmotionColors,
          storedRecommendationColors,
          storedEmotionBackground,
          storedRecommendationBackground,
        ] = await Promise.all([
          AsyncStorage.getItem(PROFILE_PICTURE_KEY),
          AsyncStorage.getItem(USERNAME_KEY),
          AsyncStorage.getItem(CURRENCY_KEY),
          AsyncStorage.getItem(MESSAGES_KEY),
          AsyncStorage.getItem(TODAY_EMOTION_KEY),
          AsyncStorage.getItem(TODAY_RECOMMENDATION_KEY),
          AsyncStorage.getItem(EMOTION_COLORS_KEY),
          AsyncStorage.getItem(RECOMMENDATION_COLORS_KEY),
          AsyncStorage.getItem(EMOTION_BACKGROUND_KEY),
          AsyncStorage.getItem(RECOMMENDATION_BACKGROUND_KEY),
        ]);

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

        console.log('Profile data loaded successfully');
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
      console.log('Profile reset successfully');
    } catch (error) {
      console.error('Failed to reset profile', error);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(messages)).catch(error =>
        console.error('Failed to save messages', error)
      );
    }
  }, [messages]);

  useEffect(() => {
    if (todayEmotion) {
      AsyncStorage.setItem(TODAY_EMOTION_KEY, todayEmotion).catch(error =>
        console.error('Failed to save todayEmotion', error)
      );
      console.log(`Saved todayEmotion: ${todayEmotion}`);
    }
  }, [todayEmotion]);

  useEffect(() => {
    if (todayRecommendation) {
      AsyncStorage.setItem(TODAY_RECOMMENDATION_KEY, todayRecommendation).catch(error =>
        console.error('Failed to save todayRecommendation', error)
      );
      console.log(`Saved todayRecommendation: ${todayRecommendation}`);
    }
  }, [todayRecommendation]);

  useEffect(() => {
    if (emotionColors.length > 0) {
      AsyncStorage.setItem(EMOTION_COLORS_KEY, JSON.stringify(emotionColors)).catch(error =>
        console.error('Failed to save emotionColors', error)
      );
      console.log(`Saved emotionColors: ${JSON.stringify(emotionColors)}`);
    }
  }, [emotionColors]);

  useEffect(() => {
    if (recommendationColors.length > 0) {
      AsyncStorage.setItem(RECOMMENDATION_COLORS_KEY, JSON.stringify(recommendationColors)).catch(
        error => console.error('Failed to save recommendationColors', error)
      );
      console.log(`Saved recommendationColors: ${JSON.stringify(recommendationColors)}`);
    }
  }, [recommendationColors]);

  useEffect(() => {
    if (emotionBackground) {
      AsyncStorage.setItem(EMOTION_BACKGROUND_KEY, emotionBackground).catch(error =>
        console.error('Failed to save emotionBackground', error)
      );
      console.log(`Saved emotionBackground: ${emotionBackground}`);
    }
  }, [emotionBackground]);

  useEffect(() => {
    if (recommendationBackground) {
      AsyncStorage.setItem(RECOMMENDATION_BACKGROUND_KEY, recommendationBackground).catch(error =>
        console.error('Failed to save recommendationBackground', error)
      );
      console.log(`Saved recommendationBackground: ${recommendationBackground}`);
    }
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