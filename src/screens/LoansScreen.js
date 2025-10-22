import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function LoansScreen() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    // Updated list of banks with low-interest rates
    const loansList = [
      { id: 1, company: 'HDFC Credila', amount: '$50,000', interest: '5.5%', duration: '36 months', emi: '$1,518' },
      { id: 2, company: 'SBI Education Loan', amount: '$40,000', interest: '6%', duration: '36 months', emi: '$1,218' },
      { id: 3, company: 'ICICI Bank', amount: '$30,000', interest: '5.8%', duration: '24 months', emi: '$1,317' },
      { id: 4, company: 'Axis Bank', amount: '$25,000', interest: '6.2%', duration: '24 months', emi: '$1,112' },
      { id: 5, company: 'Punjab National Bank', amount: '$20,000', interest: '6%', duration: '18 months', emi: '$1,122' },
      { id: 6, company: 'Bank of Baroda', amount: '$15,000', interest: '5.9%', duration: '12 months', emi: '$1,272' },
      { id: 7, company: 'IDFC First Bank', amount: '$10,000', interest: '5.5%', duration: '12 months', emi: '$860' },
      { id: 8, company: 'Other Banks', amount: '$30,000', interest: '6.5%', duration: '24 months', emi: '$1,330' },
    ];
    setLoans(loansList);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Loan Options
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Low-interest education loans from top banks
          </Text>
        </Card.Content>
      </Card>

      {loans.map((loan) => (
        <Card key={loan.id} style={styles.loanCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.company}>
              {loan.company}
            </Text>
            <View style={styles.loanDetails}>
              <Text variant="bodyMedium">💰 Amount: {loan.amount}</Text>
              <Text variant="bodyMedium">📈 Interest: {loan.interest}</Text>
              <Text variant="bodyMedium">⏱️ Duration: {loan.duration}</Text>
              <Text variant="bodyMedium">💵 EMI: {loan.emi}</Text>
            </View>
            <Text style={styles.note}>⚡ Fast approval: All loans can close within 2 days</Text>
          </Card.Content>
        </Card>
      ))}

      {/* Footer with contact number */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>📞 Contact: 8074062385</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
  },
  loanCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    paddingVertical: 8,
  },
  company: {
    color: '#2196F3',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  loanDetails: {
    gap: 6,
  },
  note: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#FF5722',
    fontSize: 12,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 12,
  },
  footerText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
