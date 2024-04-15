import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useResponsive } from 'react-native-responsive-hook';


const SuggestedTools = () => {
  const { vh } = useResponsive();
  const styles = useStyles(vh);

  return (
    <View style={styles.toolsWrapper}>
      <Text style={styles.title}>Suggested Tools</Text>
      <View style={styles.toolsContainer}>
        <View style={styles.tool}>
          <Image
            style={styles.icon}
            source={require('../../assets/calculator-icon.png')}
          />
          <Text style={styles.toolName}>BMI Calculator</Text>
        </View>
        <View style={styles.tool}>
          <Image
            style={styles.icon}
            source={require('../../assets/geolocator-icon.png')} 
          />
          <Text style={styles.toolName}>Geolocator</Text>
        </View>
      </View>
    </View>
  );
};

const useStyles = (vh) => StyleSheet.create({
    toolsWrapper: {
        marginTop: vh(4),
        paddingHorizontal: vh(1.5),
      },
      title: {
        fontSize: vh(2.2),
        fontWeight: 'regular',
        marginBottom: vh(1),
        color: '#FFFFFF'
      },
      toolsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      tool: {
        alignItems: 'center',
        marginRight: vh(4),
      },
      icon: {
        width: vh(7),
        height: vh(7),
        marginTop: vh(1),
        marginBottom: vh(0.5),
        resizeMode: "contain",
      },
      toolName: {
        color: '#FFFFFF',
        fontSize: vh(2)
      }
    });
    

export default SuggestedTools;