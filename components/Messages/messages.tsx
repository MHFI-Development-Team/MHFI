import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { useProfile } from '@/components/ProfileContext';
import { OPENAI_API_KEY } from '@env';

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
  const { profilePicture, messages, setMessages } = useProfile();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (messages.length === 0) {
      loadInitialMessage();
    }
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', scrollToBottom);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', scrollToBottom);
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const loadInitialMessage = () => {
    const message: Message = {
      _id: 1,
      text: "Hello! I'm here to support your mental health. How are you feeling today?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Assistant',
      },
    };
    setMessages([message]);
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        _id: Math.random().toString(),
        text: inputText,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'You',
          avatar: profilePicture,
        },
      };

      setMessages((previousMessages) => [...previousMessages, userMessage]);
      setInputText('');

      // Generate AI response
      const assistantMessage = await generateAIResponse(inputText);
      setMessages((previousMessages) => [...previousMessages, assistantMessage]);
    }
  };

  const generateAIResponse = async (userInput: string): Promise<Message> => {
    const maxRetries = 5;
    let retryCount = 0;
    let backoff = 1000; // Initial backoff duration in ms

    while (retryCount < maxRetries) {
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo-16k',
          messages: [
            { role: 'system', content: "You are a helpful health therapist for men's mental health." },
            { role: 'user', content: userInput }
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
        if (axios.isAxiosError(error) && error.response && error.response.status === 429) {
          retryCount++;
          await new Promise(res => setTimeout(res, backoff));
          backoff *= 2; 
        } else {
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
      }
    }

    return {
      _id: Math.random().toString(),
      text: "I'm sorry, I'm having trouble understanding right now. Please try again later.",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Assistant',
      },
    };
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
        {isUser && message.user.avatar && (
          <Image source={{ uri: message.user.avatar }} style={styles.avatar} />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
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
            placeholder="Type a message..."
            placeholderTextColor="#888"
            onFocus={scrollToBottom}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
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
    color: '#ccc',
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
    backgroundColor: '#fff',
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