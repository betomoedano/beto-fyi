import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import MetricCard from '../components/MetricCard';
import RepositoryCard from '../components/RepositoryCard';

interface GitHubProfile {
  avatar_url: string;
  public_repos: number;
  followers: number;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  html_url: string;
}

export default function HomeScreen() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [profileResponse, reposResponse] = await Promise.all([
        fetch('https://api.github.com/users/betomoedano'),
        fetch('https://api.github.com/users/betomoedano/repos?sort=stars&per_page=100'),
      ]);

      if (!profileResponse.ok || !reposResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [profileData, reposData] = await Promise.all([
        profileResponse.json(),
        reposResponse.json(),
      ]);

      const stars = reposData.reduce((acc: number, repo: Repository) => acc + repo.stargazers_count, 0);
      const sortedRepos = reposData
        .sort((a: Repository, b: Repository) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10);

      setProfile(profileData);
      setRepositories(sortedRepos);
      setTotalStars(stars);
      setError(null);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Hero Section */}
        <View style={styles.header}>
          <Image
            source={{ uri: profile?.avatar_url }}
            style={styles.avatar}
          />
          <View style={styles.headerContent}>
            <Text style={styles.name}>Beto</Text>
            <Text style={styles.role}>Dev Success at Expo</Text>
          </View>
        </View>

        {/* Social Links Section */}
        <View style={styles.socialButtons}>
          <Pressable
            style={styles.iconButton}
            onPress={() => Linking.openURL('https://github.com/betomoedano')}>
            <Ionicons name="logo-github" size={24} color="#000" />
          </Pressable>
          <Pressable
            style={styles.iconButton}
            onPress={() => Linking.openURL('https://twitter.com/betomoedano')}>
            <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
          </Pressable>
          <Pressable
            style={styles.iconButton}
            onPress={() => Linking.openURL('https://bsky.app/profile/codewithbeto.dev')}>
            <Ionicons name="cloud" size={24} color="#0560FF" />
          </Pressable>
        </View>

        {/* Metrics Section */}
        <View style={styles.metricsContainer}>
          <MetricCard
            title="Repositories"
            value={profile?.public_repos || 0}
            icon="git-branch"
          />
          <MetricCard
            title="Followers"
            value={profile?.followers || 0}
            icon="people"
          />
          <MetricCard
            title="Total Stars"
            value={totalStars}
            icon="star"
          />
        </View>

        {/* Projects Section */}
        <View style={styles.projectsSection}>
          <Text style={styles.sectionTitle}>Popular Projects</Text>
          <View style={styles.repositoriesContainer}>
            {repositories.map((repo) => (
              <RepositoryCard
                key={repo.id}
                name={repo.name}
                description={repo.description || 'No description available'}
                stars={repo.stargazers_count}
                language={repo.language || 'Unknown'}
                updatedAt={repo.updated_at}
                url={repo.html_url}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: 40,
  },
  headerContent: {
    marginLeft: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#666',
  },
  socialButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  iconButton: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  projectsSection: {
    padding: 24,
    paddingTop: 32,
  },
  repositoriesContainer: {
    gap: 16,
  },
});