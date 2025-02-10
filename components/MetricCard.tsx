import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AnimatedCounter from './AnimatedCounter';

interface MetricCardProps {
  title: string;
  value: number;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={20} color="#000" />
      <AnimatedCounter value={value || 0} style={styles.value} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
  },
  title: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
  },
});