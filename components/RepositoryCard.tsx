import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface RepositoryCardProps {
  name: string;
  description: string;
  stars: number;
  language: string;
  updatedAt: string;
  url: string;
}

export default function RepositoryCard({
  name,
  description,
  stars,
  language,
  updatedAt,
  url,
}: RepositoryCardProps) {
  return (
    <Link href={url} asChild>
      <Pressable style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="git-branch" size={18} color="#000" />
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.stat}>
            <Ionicons name="star" size={14} color="#000" />
            <Text style={styles.statText}>{stars}</Text>
          </View>
          <View style={styles.stat}>
            <View style={[styles.languageDot, { backgroundColor: getLanguageColor(language) }]} />
            <Text style={styles.statText}>{language}</Text>
          </View>
          <Text style={styles.date}>
            {new Date(updatedAt).toLocaleDateString()}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    default: '#8E8E93',
  };
  return colors[language] || colors.default;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  languageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});