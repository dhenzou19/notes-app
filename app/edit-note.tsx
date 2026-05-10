import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { getNoteById, updateNote } from './database';

export default function EditNote() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Load the existing note data
  useEffect(() => {
    if (id) {
      loadNote();
    }
  }, [id]);

  const loadNote = async () => {
    try {
      const note = await getNoteById(id!);
      if (note) {
        setTitle(note.title);
        setCategory(note.category);
        setContent(note.content || '');
      }
    } catch (error) {
      console.error('Failed to load note for editing', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!title.trim() || !category.trim()) {
        throw new Error('Title and Category are required!');
      }

      await updateNote(id!, title.trim(), category.trim(), content.trim());

      Alert.alert('✅ Success', 'Note updated successfully!', [
        { 
          text: 'OK', 
          onPress: () => router.back() 
        }
      ]);
    } catch (error: any) {
      Alert.alert('❌ Error', error.message || 'Failed to update note');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading note...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Note Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter note title"
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="e.g. School, Work, Personal"
      />

      <Text style={styles.label}>Content (Optional)</Text>
      <TextInput
        style={[styles.input, { height: 140, textAlignVertical: 'top' }]}
        value={content}
        onChangeText={setContent}
        placeholder="Write your note here..."
        multiline
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f8f9fa' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 8, 
    color: '#333' 
  },
  input: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 20, 
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  updateButton: { 
    backgroundColor: '#f39c12', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center',
    marginTop: 10 
  },
  buttonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});