import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { GiftedChat, Bubble, IMessage, Reply } from 'react-native-gifted-chat';
import messageQuestions from './messageScreenQuestions';
import ProfileIcon from '@/assets/svg/profileIcon';

export default function Chatbot() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    loadInitialMessage();
  }, []);

  const loadInitialMessage = () => {
    const message: IMessage = {
      _id: messageQuestions[step].id,
      text: messageQuestions[step].text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Assistant',
        avatar: ProfileIcon,
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

  const onQuickReply = (replies: Reply[]) => {
    const chosenReply = replies[0];
    const answer = messageQuestions[step].answers.find(a => a.text === chosenReply.title);
    if (answer) {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.random().toString(),
            text: chosenReply.title,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'You',
            },
          },
        ])
      );

      if (answer.next !== null) {
        const nextQuestion = messageQuestions.find(q => q.id === answer.next);
        if (nextQuestion) {
          setStep(messageQuestions.indexOf(nextQuestion));
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [
              {
                _id: nextQuestion.id,
                text: nextQuestion.text,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'Assistant',
                  avatar: ProfileIcon, // update later
                },
                quickReplies: {
                  type: 'radio',
                  values: nextQuestion.answers.map(a => ({
                    title: a.text,
                    value: a.text,
                  })),
                },
              },
            ])
          );
        }
      }
    }
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#FF922E', // Orange color for user messages
          },
          left: {
            backgroundColor: '#303345', // Dark blue color for assistant messages
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <GiftedChat
        messages={messages}
        onQuickReply={onQuickReply}
        user={{ _id: 1 }}
        scrollToBottom
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        listViewProps={{ style: styles.chat }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  chat: {
    padding: 10,
  },
});
