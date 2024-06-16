import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { useProfile } from '@/components/ProfileContext';
import { OPENAI_API_KEY } from '@env';
import UserIcon from '@/assets/svg/UserIcon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

export default function Chatbot() {
  const [inputText, setInputText] = useState<string>('');
  const { profilePicture, messages, setMessages, name: userName, setTodayEmotion, setTodayRecommendation, setEmotionColors, setRecommendationColors } = useProfile();
  const [conversationEnded, setConversationEnded] = useState<boolean>(false);
  const [userMessageCount, setUserMessageCount] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const loadMessages = async () => {
      const storedMessages = await AsyncStorage.getItem('messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        loadInitialMessage();
      }
    };

    const checkConversationStatus = async () => {
      const endTime = await AsyncStorage.getItem('conversationEndTime');
      if (endTime) {
        const endTimeDate = new Date(endTime);
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - endTimeDate.getTime();
        const hoursDifference = timeDifference / (1000 * 3600);
        if (hoursDifference >= 0.01) {
          setConversationEnded(false);
          loadInitialMessage();
          await AsyncStorage.removeItem('conversationEndTime');
        } else {
          setConversationEnded(true);
        }
      }
    };

    loadMessages().then(checkConversationStatus);
  }, []);

  useEffect(() => {
    const storeMessages = async () => {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    };

    storeMessages();
  }, [messages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', scrollToBottom);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', scrollToBottom);
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const loadInitialMessage = () => {
    const greetingText = userName ? `Hello ${userName}! How are you feeling today?` : "Hello! How are you feeling today?";
    const message: Message = {
      _id: 1,
      text: greetingText,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Assistant',
      },
    };
    setMessages([message]);
  };

  const handleSend = async () => {
    if (inputText.trim() && !conversationEnded) {
      const userMessage: Message = {
        _id: Math.random().toString(),
        text: inputText,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'You',
          avatar: profilePicture || '', // Use the latest profile picture, ensure it is a string
        },
      };

      setMessages((previousMessages) => [...previousMessages, userMessage]);
      setInputText('');
      setUserMessageCount(userMessageCount + 1);

      // Generate AI response
      const assistantMessage = await generateAIResponse([...messages, userMessage]);
      setMessages((previousMessages) => [...previousMessages, assistantMessage]);

      // Check for end-of-conversation indicators
      const endPhrases = ["goodbye", "i will talk to you tomorrow", "talk to you tomorrow"];
      if (endPhrases.some(phrase => assistantMessage.text.toLowerCase().includes(phrase))) {
        setConversationEnded(true);
        const endTime = new Date();
        await AsyncStorage.setItem('conversationEndTime', endTime.toISOString());
        await generateTodayEmotionAndRecommendation([...messages, userMessage, assistantMessage]);
      }
    }
  };

  const generateAIResponse = async (conversationHistory: Message[]): Promise<Message> => {
    try {
      const formattedMessages = conversationHistory.map(message => ({
        role: message.user._id === 1 ? 'user' : 'assistant',
        content: message.text
      }));

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: "You are a helpful health therapist for men from the ages of 18-35, specifically catering to individuals in Ireland and the Nothern Ireland. Make the responses more human and open ended. Be honest and authentic, and don't provide any harmful advice or recommendations. Your goal is to check in on their health and emotions in a kind, masculine engaging manner. send a wide range of emojis but not too frequently and make sure they are masculine and empowering when you send them. If users ask for health locations, General Practitioners etc tell them to navigate to the Geolocator in the Suggested Tools in the app to find their nearest health centers. If relevant let the user know they can take quizzes in app to test their knowledge. If users say they would like to read more and understand their health or something along those lines tell them to Navigate to the Feed Page in the app and check it out there may potentially be articles that are relevant for them, never tell them the exact article they are looking for is there, just say that they may find it there. When a conversation is up with a user end it with 'I will talk to you tomorrow' all the time." },
          ...formattedMessages,
        ],
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.9,
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const aiText = response.data.choices[0].message.content.trim();
      return {
        _id: Math.random().toString(),
        text: aiText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Assistant',
        },
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return {
        _id: Math.random().toString(),
        text: "I'm sorry, I'm having trouble understanding right now. Please try again later.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Assistant',
        },
      };
    }
  };

  const generateTodayEmotionAndRecommendation = async (conversationHistory: Message[]) => {
    try {
      const formattedMessages = conversationHistory.map(message => ({
        role: message.user._id === 1 ? 'user' : 'assistant',
        content: message.text
      }));
  
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: "You are a helpful health therapist for men from the ages of 18-35, specifically catering to individuals in Ireland and the United Kingdom. Based on the conversation history, provide today's emotion, a recommendation, and corresponding colors." },
          ...formattedMessages,
          { role: 'user', content: "Please provide today's emotion, a recommendation, and three colors corresponding to the emotion and the recommendation in the following format: Emotion: [emotion], Recommendation: [recommendation], Colors: emotionColors: [color1, color2, color3] | recommendationColors: [color1, color2, color3]" }
        ],
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
  
      const responseText = response.data.choices[0].message.content.trim();
      console.log('Generated response:', responseText);
  
      // Extract emotion, recommendation, and colors from the response
      const emotionMatch = responseText.match(/Emotion: \[(.*?)\]/);
      const recommendationMatch = responseText.match(/Recommendation: \[(.*?)\]/);
      const colorsMatch = responseText.match(/emotionColors: \[(.*?)\] \| recommendationColors: \[(.*?)\]/);
  
      if (emotionMatch && recommendationMatch && colorsMatch) {
        const emotion = emotionMatch[1];
        const recommendation = recommendationMatch[1];
        const emotionColors = colorsMatch[1].split(',').map((color: string) => color.trim());
        const recommendationColors = colorsMatch[2].split(',').map((color: string) => color.trim());
  
        await AsyncStorage.multiSet([
          ['todayEmotion', emotion],
          ['todayRecommendation', recommendation],
          ['emotionColors', JSON.stringify(emotionColors)],
          ['recommendationColors', JSON.stringify(recommendationColors)],
        ]);
  
        console.log('Set todayEmotion:', emotion);
        console.log('Set todayRecommendation:', recommendation);
        console.log('Set emotionColors:', emotionColors);
        console.log('Set recommendationColors:', recommendationColors);
  
        setTodayEmotion(emotion);
        setTodayRecommendation(recommendation);
        setEmotionColors(emotionColors);
        setRecommendationColors(recommendationColors);
      } else {
        console.error('Error parsing response:', responseText);
      }
    } catch (error) {
      console.error('Error generating today\'s emotion and recommendation:', error);
    }
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const renderMessage = (message: Message) => {
    const isUser = message.user._id === 1;
    return (
      <View key={message._id} style={[styles.messageWrapper, isUser && styles.userMessageWrapper]}>
        <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.assistantMessage]}>
          <Text style={styles.messageText}>{message.text}</Text>
          <Text style={styles.timestamp}>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
        {isUser ? (
          message.user.avatar ? (
            <Image source={{ uri: message.user.avatar }} style={styles.avatar} />
          ) : (
            <UserIcon style={styles.avatar} />
          )
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView 
          style={styles.chat} 
          ref={scrollViewRef}
          onContentSizeChange={scrollToBottom}
        >
          <Text style={styles.date}>{new Date().toDateString()}</Text>
          {messages.map(message => renderMessage(message))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={conversationEnded ? "Check back in tomorrow!" : "Type a message..."}
            placeholderTextColor="#888"
            onFocus={scrollToBottom}
            editable={!conversationEnded}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={conversationEnded}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  chat: {
    flex: 1,
    padding: windowHeight * 0.01,
  },
  date: {
    alignSelf: 'center',
    color: '#ccc',
    fontSize: windowHeight * 0.018,
    marginVertical: windowHeight * 0.01,
    marginTop: windowHeight * 0.03,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: windowHeight * 0.01,
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  messageContainer: {
    padding: windowHeight * 0.012,
    borderRadius: windowHeight * 0.01,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#FF922E',
    alignSelf: 'flex-end',
  },
  assistantMessage: {
    backgroundColor: Colors.secondary,
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
    fontSize: windowHeight * 0.02,
  },
  timestamp: {
    color: 'white',
    fontSize: windowHeight * 0.015,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: windowHeight * 0.01,
    backgroundColor: Colors.primary,
  },
  input: {
    flex: 1,
    width: '100%',
    padding: windowWidth * 0.025,
    paddingHorizontal: windowWidth * 0.06,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: windowHeight * 0.006,
    color: '#FFF',
    fontSize: windowHeight * 0.022,
  },
  sendButton: {
    paddingVertical: windowHeight* 0.014,
    marginLeft: windowWidth * 0.02,
    backgroundColor: '#FF922E',
    borderRadius: windowHeight * 0.004,
    padding: windowWidth * 0.025,
    paddingHorizontal: windowWidth * 0.06,
  },
  sendButtonText: {
    fontSize: windowHeight * 0.02,
    color: '#fff',
  },
  avatar: {
    width: windowHeight * 0.05,
    height: windowHeight * 0.05,
    borderRadius: windowHeight * 0.025,
    marginLeft: windowWidth * 0.02,
  },
});