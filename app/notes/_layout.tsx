import { Stack } from 'expo-router';

export default function NotesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: '#1a73e8',
        headerStyle: { backgroundColor: '#ffffff' },
        headerTitleStyle: { fontSize: 18, fontWeight: '600', color: '#1a1a1a' },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen name="edit-note" options={{ title: 'Edit Note' }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ title: 'Note Details' }} />
      <Stack.Screen
        name="add-note"
        options={{
          presentation: 'modal',
          title: 'Add New Note',
          headerShown: false,
        }}
      />
    </Stack>
  );
}