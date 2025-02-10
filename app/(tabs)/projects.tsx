import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RepositoryCard from '../../components/RepositoryCard';

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  html_url: string;
}

export default function ProjectsScreen() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/users/betomoedano/repos?sort=stars&per_page=10'
      );
      if (!response.ok) throw new Error('Failed to fetch repositories');
      const data = await response.json();
      setRepositories(data);
      setError(null);
    } catch (err) {
      setError('Failed to load repositories');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRepositories();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
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
        <Text style={styles.title}>Popular Repositories</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    padding: 20,
  },
  repositoriesContainer: {
    padding: 20,
    paddingTop: 0,
  },
});