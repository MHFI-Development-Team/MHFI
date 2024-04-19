import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import SvgComponent from '../../assets/svg/HomeSlope'; 

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('./../../../assets/images/MHFI logo.png')} 
        />
      </View>
      <View style={styles.slopeContainer}>
        <SvgComponent />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress ={() => console.log('Button')} style={styles.registerBtn}>
          <Text style={styles.btnText}>Press Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  logoContainer: {
    marginTop: 60,
    paddingRight: 40,
    alignItems: 'center',
  },
  slopeContainer: {
    marginLeft: -120, 
    marginTop: 80,
  },
  btnContainer: {
    position: 'absolute', 
    bottom: 300, 
    width: '100%', 
    alignItems: 'center',
    paddingRight: 40,
  },
  registerBtn: {
    width: 300,
    height: 50,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    alignItems: 'center'
  },
  btnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});