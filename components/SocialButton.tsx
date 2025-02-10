import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

interface SocialButtonProps {
  platform: string;
  username: string;
  url: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function SocialButton({
  platform,
  username,
  url,
  icon,
}: SocialButtonProps) {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={handlePress}>
      <Ionicons name={icon} size={24} color="#FFFFFF" />
      <Text style={styles.text}>
        {platform}: @{username}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
});