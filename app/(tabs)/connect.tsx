import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SocialButton from '../../components/SocialButton';

export default function ConnectScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Let's Connect!</Text>
        <Text style={styles.subtitle}>
          Follow me on social media to stay updated with my latest projects and
          content.
        </Text>

        <View style={styles.buttonsContainer}>
          <SocialButton
            platform="GitHub"
            username="betomoedano"
            url="https://github.com/betomoedano"
            icon="logo-github"
          />
          <SocialButton
            platform="X"
            username="betomoedano"
            url="https://twitter.com/betomoedano"
            icon="logo-twitter"
          />
          <SocialButton
            platform="Bluesky"
            username="codewithbeto.dev"
            url="https://bsky.app/profile/codewithbeto.dev"
            icon="cloud"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    padding: 20,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonsContainer: {
    padding: 20,
  },
});