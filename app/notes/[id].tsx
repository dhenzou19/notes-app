import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getNoteById, type Note } from '../database';
import { Ionicons } from '@expo/vector-icons';

export default function NoteDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNote = async () => {
      if (!id) {
        setError("No note ID provided");
        setLoading(false);
        return;
      }

      try {
        const foundNote = await getNoteById(id);
        if (foundNote) {
          setNote(foundNote);
        } else {
          setError(`Note with ID ${id} not found`);
        }
      } catch (err: any) {
        console.error("Error loading note:", err);
        setError("Failed to load note from database");
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1a73e8" />
        <Text style={{ marginTop: 10 }}>Loading note...</Text>
      </View>
    );
  }

  if (error || !note) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || "Note not found"}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.category}>Category: {note.category}</Text>
      <Text style={styles.date}>
        Added: {new Date(note.created_at).toLocaleDateString()} 
        {' • '} 
        {new Date(note.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>

      <View style={styles.contentBox}>
        <Text style={styles.content}>
          {note.content || "No additional content provided for this note."}
        </Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => router.push(`/edit-note?id=${note.id}`)}
      >
        <Ionicons name="create-outline" size={24} color="white" />
        <Text style={styles.editButtonText}>Edit Note</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Back to Notes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  category: {
    fontSize: 16,
    color: '#1a73e8',
    marginBottom: 10,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 25,
  },
  contentBox: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 30,
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#f39c12',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
  },
  editButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#1a73e8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});