import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity
} from "react-native";
const QuizResult = ({ route }) => {
  const { score, totalQuestions } = route.params;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Your Result</Text>
          <View style={styles.resultCircle}>
            <Text style={styles.bmiValue}>{score}/{totalQuestions}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#0C0F14', 
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFF', 
      marginBottom: 30,
    },
    resultCircle: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: '#6A1B9A',  
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5, 
    },
    bmiValue: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#FFF', 
    },
    bmiStatus: {
      fontSize: 18,
      color: '#FFF',  
      marginTop: 5,
    },
    viewDetails: {
      fontSize: 16,
      color: '#FFD700', 
      marginTop: 10,
      textDecorationLine: 'underline',  
    },
    bodyComposition: {
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
    },
    bodyCompositionTitle: {
      fontSize: 20,
      color: '#FFF',
      marginBottom: 10,
    },
    infoBox: {
      width: '90%',
      backgroundColor: '#24263B', 
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoLabel: {
      fontSize: 18,
      color: '#FFF',
    },
    infoValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFF',
    },
    retryButton: {
      backgroundColor: '#FF6347', 
      padding: 10,
      borderRadius: 20,
      marginTop: 20,
    },
    retryButtonText: {
      fontSize: 20,
      color: '#FFF',
      textAlign: 'center',
    }
  });
  export default QuizResult;