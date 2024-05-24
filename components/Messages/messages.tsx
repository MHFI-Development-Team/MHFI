import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import messageQuestions from './messageScreenQuestions';
import { Colors } from '@/constants/Colors';

interface Message {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar?: any;
  };
  quickReplies?: {
    type: 'radio' | 'checkbox';
    values: { title: string; value: string }[];
  };
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    loadInitialMessage();
  }, []);

  const loadInitialMessage = () => {
    const message: Message = {
      _id: messageQuestions[step].id,
      text: messageQuestions[step].text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Assistant',
      },
      quickReplies: {
        type: 'radio',
        values: messageQuestions[step].answers.map(answer => ({
          title: answer.text,
          value: answer.text,
        })),
      },
    };
    setMessages([message]);
  };

  const onQuickReply = (reply: string) => {
    const answer = messageQuestions[step].answers.find(a => a.text === reply);
    if (answer) {
      const userMessage: Message = {
        _id: Math.random().toString(),
        text: reply,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'You',
        },
      };

      setMessages(previousMessages => [...previousMessages, userMessage]);

      if (answer.next !== null) {
        const nextQuestion = messageQuestions.find(q => q.id === answer.next);
        if (nextQuestion) {
          setStep(messageQuestions.indexOf(nextQuestion));
          const assistantMessage: Message = {
            _id: nextQuestion.id,
            text: nextQuestion.text,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Assistant',
            },
            quickReplies: {
              type: 'radio',
              values: nextQuestion.answers.map(a => ({
                title: a.text,
                value: a.text,
              })),
            },
          };
          setMessages(previousMessages => [...previousMessages, assistantMessage]);
        }
      }
    }
  };

  const renderMessage = (message: Message) => {
    const isUser = message.user._id === 1;
    return (
      <View
        key={message._id}
        style={[styles.messageContainer, isUser ? styles.userMessage : styles.assistantMessage]}>
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
    );
  };

  const renderQuickReplies = (quickReplies: { title: string; value: string }[]) => {
    return (
      <View style={styles.quickRepliesContainer}>
        {quickReplies.map(reply => (
          <TouchableOpacity
            key={reply.value}
            style={styles.quickReplyButton}
            onPress={() => onQuickReply(reply.value)}>
            <Text style={styles.quickReplyButtonText}>{reply.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.chat}>
        {messages.map(message => (
          <View key={message._id}>
            {renderMessage(message)}
            {message.quickReplies && renderQuickReplies(message.quickReplies.values)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  chat: {
    padding: 15,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
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
    fontSize: 16,
  },
  quickRepliesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  quickReplyButton: {
    backgroundColor: '#FF922E',
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  quickReplyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
