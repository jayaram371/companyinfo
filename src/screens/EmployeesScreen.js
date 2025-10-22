import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';

export default function EmployeesScreen() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const sampleEmployees = [
      { 
        id: 1, 
        name: 'Mike Johnson', 
        position: 'Senior Developer', 
        email: 'mike@company.com',
        phone: '+1 (555) 123-4570',
        department: 'Engineering'
      },
      { 
        id: 2, 
        name: 'Sarah Wilson', 
        position: 'UI/UX Designer', 
        email: 'sarah@company.com',
        phone: '+1 (555) 123-4571', 
        department: 'Design'
      },
      { 
        id: 3, 
        name: 'Tom Brown', 
        position: 'Project Manager', 
        email: 'tom@company.com',
        phone: '+1 (555) 123-4572',
        department: 'Management'
      },
      { 
        id: 4, 
        name: 'Lisa Garcia', 
        position: 'Marketing Specialist', 
        email: 'lisa@company.com',
        phone: '+1 (555) 123-4573',
        department: 'Marketing'
      },
    ];
    setEmployees(sampleEmployees);
  }, []);

  const renderEmployee = ({ item }) => (
    <Card style={styles.employeeCard}>
      <Card.Content>
        <View style={styles.employeeHeader}>
          <Avatar.Text 
            size={60} 
            label={item.name.split(' ').map(n => n[0]).join('')} 
            style={styles.avatar} 
          />
          <View style={styles.employeeInfo}>
            <Text variant="titleMedium">{item.name}</Text>
            <Text variant="bodyMedium" style={styles.position}>
              {item.position}
            </Text>
            <Text variant="bodySmall">📧 {item.email}</Text>
            <Text variant="bodySmall">📞 {item.phone}</Text>
            {item.department && (
              <Text variant="bodySmall">🏢 {item.department}</Text>
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
            Our Team
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Meet our talented team members
          </Text>
        </Card.Content>
      </Card>

      <FlatList
        data={employees}
        renderItem={renderEmployee}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
  employeeCard: {
    marginBottom: 12,
    backgroundColor: 'white',
    elevation: 2,
  },
  employeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  employeeInfo: {
    marginLeft: 16,
    flex: 1,
  },
  position: {
    color: '#666',
    marginBottom: 4,
  },
  avatar: {
    backgroundColor: '#4CAF50',
  },
});