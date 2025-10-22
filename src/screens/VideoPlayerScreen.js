import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function VideoPlayerScreen({ route, navigation }) {
  const { country, videoTitle } = route.params;

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        {videoTitle}
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Exclusive content for {country}
      </Text>
      
      <View style={styles.videoPlaceholder}>
        <Text style={styles.videoText}>🎥 Video Player</Text>
        <Text style={styles.videoDescription}>
          This is where the actual video would play
        </Text>
      </View>

      <View style={styles.content}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          What you'll learn:
        </Text>
        <Text style={styles.bulletPoint}>• Top universities in {country}</Text>
        <Text style={styles.bulletPoint}>• Admission requirements</Text>
        <Text style={styles.bulletPoint}>• Scholarship opportunities</Text>
        <Text style={styles.bulletPoint}>• Visa process explained</Text>
        <Text style={styles.bulletPoint}>• Cost of living breakdown</Text>
        <Text style={styles.bulletPoint}>• Job market insights</Text>
      </View>

      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        Back to Countries
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2196F3',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  videoPlaceholder: {
    backgroundColor: '#333',
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  videoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  videoDescription: {
    color: '#ccc',
    fontSize: 14,
  },
  content: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  bulletPoint: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    marginLeft: 8,
  },
  button: {
    marginTop: 'auto',
  },
});