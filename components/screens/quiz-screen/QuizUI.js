import React from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import ErrorModal from '../../ErrorModal';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const QuizUI = () => {
 
  return (
    <SafeAreaView style={{ backgroundColor: '#171621', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.questionContainer}>
        <Text>Placeholder</Text>
        </View>

        {/* Error Modal */}
        <ErrorModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          errorType={errorType}
        />
      </View>
    </SafeAreaView>
  );
};

export default QuizUI;

const styles = StyleSheet.create({
    container: {
        paddingLeft: screenWidth * 0.05,
        flex: 1
    },
    questionContainer:{

    }
  });