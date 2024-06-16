import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';

const PulsatingCircle = ({ colors, style }) => {
  const scaleAnim = new Animated.Value(0);
  const gradientAnim = new Animated.Value(0);

  useEffect(() => {
    const createScaleAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000, // Slower pulse
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 2000, // Slower pulse
            useNativeDriver: true,
          }),
        ])
      );
    };

    const createGradientAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(gradientAnim, {
            toValue: 1,
            duration: 4000, // Slower gradient animation
            useNativeDriver: false,
          }),
          Animated.timing(gradientAnim, {
            toValue: 0,
            duration: 4000, // Slower gradient animation
            useNativeDriver: false,
          }),
        ])
      );
    };

    const scaleAnimation = createScaleAnimation();
    const gradientAnimation = createGradientAnimation();

    scaleAnimation.start();
    gradientAnimation.start();

    return () => {
      scaleAnimation.stop();
      gradientAnimation.stop();
    };
  }, []);

  const scale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2], // Smaller pulse effect
  });

  const stop1 = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const stop2 = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  const stop3 = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Svg height="150" width="150"> 
          <Defs>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset={stop1} stopColor={colors[0]} />
              <Stop offset={stop2} stopColor={colors[1]} />
              <Stop offset={stop3} stopColor={colors[2]} />
            </LinearGradient>
          </Defs>
          <Circle
            cx="65" // Center for smaller circle
            cy="65" // Center for smaller circle
            r="50" // Smaller radius
            stroke="url(#grad1)"
            strokeWidth="5"
            fill="url(#grad1)" // Fill with gradient
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PulsatingCircle;