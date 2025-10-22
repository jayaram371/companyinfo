import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import DirectorsScreen from './src/screens/DirectorsScreen';
import EmployeesScreen from './src/screens/EmployeesScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import LoansScreen from './src/screens/LoansScreen';
import AuthScreen from './src/screens/LoginScreen';

// Import auth context
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

const Tab = createBottomTabNavigator();

function TabBarIcon({ focused, iconName }) {
  return (
    <Ionicons 
      name={focused ? iconName : `${iconName}-outline`} 
      size={24} 
      color={focused ? '#2196F3' : '#666'} 
    />
  );
}

function AppTabs() {
  const { logout } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="business" />
          ),
          headerRight: () => (
            <Ionicons 
              name="log-out-outline" 
              size={24} 
              color="#666" 
              style={{ marginRight: 15 }}
              onPress={logout}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Directors" 
        component={DirectorsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="people" />
          ),
        }}
      />
      <Tab.Screen 
        name="Employees" 
        component={EmployeesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="person" />
          ),
        }}
      />
      <Tab.Screen 
        name="Achievements" 
        component={AchievementsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="trophy" />
          ),
        }}
      />
      <Tab.Screen 
        name="Loans" 
        component={LoansScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="cash" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();

  console.log('🔐 RootNavigator - User:', user ? user.email : 'No user');
  console.log('🔐 RootNavigator - Loading:', loading);

  if (loading) {
    return null; // Show nothing while loading
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthScreen />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}