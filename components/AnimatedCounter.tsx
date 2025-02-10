import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

interface AnimatedCounterProps {
  value: number;
  style?: any;
}

export default function AnimatedCounter({ value, style }: AnimatedCounterProps) {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withSpring(value, {
      damping: 15,
      stiffness: 100,
    });
  }, [value]);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: Math.floor(animatedValue.value).toString(),
    };
  });

  return (
    <Animated.Text style={[styles.text, style]} animatedProps={animatedProps} >
      {value}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#007AFF',
  },
});