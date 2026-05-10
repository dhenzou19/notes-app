import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TodoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="checkmark-done-circle-outline" size={64} color="#FFD700" />
        <Text style={styles.title}>To-do</Text>
        <Text style={styles.subtitle}>Coming soon</Text>
        <Text style={styles.description}>To-do list functionality will be available here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
  },
});
