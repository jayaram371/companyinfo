import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';

// Import your local CEO photo
const ceoPhoto = require('../../assets/images/ceo.jpg');

export default function DirectorsScreen() {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    const sampleDirectors = [
      {
        id: '1',
        name: 'John Anderson',
        position: 'Chief Executive Officer',
        email: 'john.anderson@company.com',
        phone: '+1 (555) 123-4567',
        photo: ceoPhoto,
        bio: 'Visionary leader with 15+ years of industry experience. Passionate about innovation and team growth.'
      },
      {
        id: '2', 
        name: 'Sarah Chen',
        position: 'Chief Financial Officer',
        email: 'sarah.chen@company.com',
        phone: '+1 (555) 123-4568',
        photo: { uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face' },
        bio: 'Financial strategist with expertise in global markets and corporate finance.'
      },
      {
        id: '3',
        name: 'Michael Rodriguez',
        position: 'Chief Technology Officer', 
        email: 'michael.rodriguez@company.com',
        phone: '+1 (555) 123-4569',
        photo: { uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
        bio: 'Technology innovator driving digital transformation and cutting-edge solutions.'
      }
    ];
    setDirectors(sampleDirectors);
  }, []);

  const renderDirector = ({ item }) => (
    <Card style={styles.directorCard}>
      <Card.Content>
        <View style={styles.directorHeader}>
          <View style={styles.photoContainer}>
            <Avatar.Image 
              size={100} 
              source={item.photo} 
              style={styles.avatarImage}
            />
            {item.position?.toLowerCase().includes('ceo') && (
              <View style={styles.ceoBadge}>
                <Text style={styles.ceoBadgeText}>CEO</Text>
              </View>
            )}
          </View>
          <View style={styles.directorInfo}>
            <Text variant="titleLarge" style={styles.directorName}>
              {item.name}
            </Text>
            <Text variant="titleMedium" style={styles.position}>
              {item.position}
            </Text>
            {item.email && (
              <Text variant="bodyMedium" style={styles.contact}>
                📧 {item.email}
              </Text>
            )}
            {item.phone && (
              <Text variant="bodyMedium" style={styles.contact}>
                📞 {item.phone}
              </Text>
            )}
            {item.bio && (
              <Text variant="bodySmall" style={styles.bio}>
                {item.bio}
              </Text>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Leadership Team
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Meet our executive leadership
          </Text>
        </Card.Content>
      </Card>

      <FlatList
        data={directors}
        renderItem={renderDirector}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: 'white',
    elevation: 2,
  },
  title: {
    textAlign: 'center',
    color: '#1a237e',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: 4,
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  directorCard: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  directorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
  },
  photoContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarImage: {
    borderWidth: 3,
    borderColor: '#e3f2fd',
  },
  ceoBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  ceoBadgeText: {
    color: '#333',
    fontSize: 10,
    fontWeight: 'bold',
  },
  directorInfo: {
    flex: 1,
  },
  directorName: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1a237e',
    fontSize: 18,
  },
  position: {
    color: '#2196F3',
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  contact: {
    marginBottom: 4,
    color: '#666',
    fontSize: 14,
  },
  bio: {
    color: '#888',
    fontStyle: 'italic',
    marginTop: 8,
    lineHeight: 18,
    fontSize: 13,
  },
});