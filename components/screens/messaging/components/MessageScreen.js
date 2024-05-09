import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import questions from '../data/questions.json'; 
import ProfileIcon from '../../../../assets/svg/ProfileIcon';

const screenWidth = Dimensions.get('window').width;

export default function MessageScreen() {
    const [messages, setMessages] = useState([]);
    const [step, setStep] = useState(0);

    useEffect(() => {
        loadInitialMessage();
    }, []);

    const loadInitialMessage = () => {
        const message = {
            _id: questions[step].id,
            text: questions[step].text,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Assistant',
                avatar: ProfileIcon
            },
            quickReplies: {
                type: 'radio',
                values: questions[step].answers.map(answer => ({
                    title: answer.text,
                    value: answer.text,
                })),
            }
        };
        setMessages([message]);
    };

    const onQuickReply = replies => {
        const chosenReply = replies[0];
        const answer = questions[step].answers.find(a => a.text === chosenReply.title);
        if (answer) {
            setMessages(previousMessages => GiftedChat.append(previousMessages, [{
                _id: Math.random(),
                text: chosenReply.title,
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'You'
                }
            }]));

            if (answer.next !== null) {
                const nextQuestion = questions.find(q => q.id === answer.next);
                if (nextQuestion) {
                    setStep(questions.indexOf(nextQuestion));
                    setMessages(previousMessages => GiftedChat.append(previousMessages, [{
                        _id: nextQuestion.id,
                        text: nextQuestion.text,
                        createdAt: new Date(),
                        user: {
                            _id: 2,
                            name: 'Assistant',
                            avatar: ProfileIcon// update later
                        },
                        quickReplies: {
                            type: 'radio',
                            values: nextQuestion.answers.map(a => ({
                                title: a.text,
                                value: a.text,
                            })),
                        }
                    }]));
                }
            }
        }
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#FF922E'  // Orange color for user messages
                    },
                    left: {
                        backgroundColor: '#303345'  // Dark blue color for assistant messages
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    },
                    left: {
                        color: '#fff'
                    }
                }}
            />
        );
    };

    const renderInputToolbar = (props) => {
        return null;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <GiftedChat
                messages = {messages}
                onQuickReply={onQuickReply}
                user={{ _id: 1 }}
                scrollToBottom
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                style={styles.chat}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#0C0F14",
    },
    chat: {
        padding: 10,
    }
});