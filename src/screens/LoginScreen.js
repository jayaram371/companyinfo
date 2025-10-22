import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Card, Switch, SegmentedButtons } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { login, signup } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    if (authMode === 'signup' && password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setLoading(true);
    
    let result;
    if (authMode === 'login') {
      result = await login(email, password);
    } else {
      result = await signup(email, password, confirmPassword);
    }
    
    setLoading(false);
    
    if (!result.success) {
      alert(result.error);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    // Clear fields when switching modes
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Content>
            {/* Header */}
            <View style={styles.header}>
              <Text variant="headlineMedium" style={styles.title}>
                CompanyInfoApp
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                {authMode === 'login' ? 'Welcome back!' : 'Create your account'}
              </Text>
            </View>

            {/* Auth Mode Toggle */}
            <SegmentedButtons
              value={authMode}
              onValueChange={setAuthMode}
              buttons={[
                {
                  value: 'login',
                  label: 'Login',
                  icon: 'login',
                },
                {
                  value: 'signup',
                  label: 'Sign Up',
                  icon: 'account-plus',
                },
              ]}
              style={styles.segmentedButtons}
            />

            {/* Email Input */}
            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              left={<TextInput.Icon icon="email" />}
            />

            {/* Password Input */}
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon 
                  icon={showPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            {/* Confirm Password Input (Signup only) */}
            {authMode === 'signup' && (
              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                left={<TextInput.Icon icon="lock-check" />}
                right={
                  <TextInput.Icon 
                    icon={showConfirmPassword ? "eye-off" : "eye"} 
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
              />
            )}

            {/* Remember Me & Forgot Password (Login only) */}
            {authMode === 'login' && (
              <View style={styles.loginOptions}>
                <View style={styles.rememberMe}>
                  <Switch
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    color="#2196F3"
                  />
                  <Text variant="bodyMedium" style={styles.rememberMeText}>
                    Remember me
                  </Text>
                </View>
                <Button 
                  mode="text" 
                  compact
                  onPress={() => alert('Password reset feature coming soon!')}
                >
                  Forgot Password?
                </Button>
              </View>
            )}

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleAuth}
              loading={loading}
              disabled={loading}
              style={styles.authButton}
              contentStyle={styles.authButtonContent}
            >
              {authMode === 'login' ? 'Login' : 'Create Account'}
            </Button>

            {/* Switch Auth Mode */}
            <View style={styles.switchMode}>
              <Text variant="bodyMedium" style={styles.switchModeText}>
                {authMode === 'login' 
                  ? "Don't have an account? " 
                  : "Already have an account? "
                }
              </Text>
              <Button 
                mode="text" 
                compact
                onPress={toggleAuthMode}
                style={styles.switchModeButton}
              >
                {authMode === 'login' ? 'Sign Up' : 'Login'}
              </Button>
            </View>

            {/* Demo Credentials */}
            <Card style={styles.demoCard} mode="outlined">
              <Card.Content>
                <Text variant="titleSmall" style={styles.demoTitle}>
                  Demo Credentials
                </Text>
                <Text variant="bodySmall" style={styles.demoText}>
                  Email: admin@company.com{'\n'}
                  Password: admin123
                </Text>
              </Card.Content>
            </Card>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a237e',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  loginOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
    color: '#666',
  },
  authButton: {
    marginTop: 8,
    paddingVertical: 8,
    backgroundColor: '#2196F3',
  },
  authButtonContent: {
    height: 48,
  },
  switchMode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  switchModeText: {
    color: '#666',
  },
  switchModeButton: {
    marginLeft: -8,
  },
  demoCard: {
    marginTop: 20,
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  },
  demoTitle: {
    textAlign: 'center',
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  demoText: {
    textAlign: 'center',
    color: '#1976d2',
    lineHeight: 20,
  },
});