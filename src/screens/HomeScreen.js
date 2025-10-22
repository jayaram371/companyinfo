import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Image, Alert, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Text, Button, Portal } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

// Images
const logo = require('../../assets/images/Logo.jpeg');
const ceo = require('../../assets/images/ceo.jpg');

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [examModal, setExamModal] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState(''); // 'country' or 'exam'

  // Countries with subscription status
  const countries = [
    { id: 1, name: 'USA', flag: '🇺🇸', subscribed: false, price: '$49', videoTitle: 'USA University Admissions Guide' },
    { id: 2, name: 'UK', flag: '🇬🇧', subscribed: false, price: '$39', videoTitle: 'UK Education System Explained' },
    { id: 3, name: 'Canada', flag: '🇨🇦', subscribed: false, price: '$45', videoTitle: 'Canada Student Visa Process' },
    { id: 4, name: 'Australia', flag: '🇦🇺', subscribed: false, price: '$42', videoTitle: 'Australia Education Opportunities' },
    { id: 5, name: 'Germany', flag: '🇩🇪', subscribed: false, price: '$35', videoTitle: 'Study in Germany - Free Education' },
    { id: 6, name: 'Singapore', flag: '🇸🇬', subscribed: false, price: '$38', videoTitle: 'Singapore Top Universities' },
    { id: 7, name: 'New Zealand', flag: '🇳🇿', subscribed: false, price: '$36', videoTitle: 'New Zealand Lifestyle & Education' },
    { id: 8, name: 'Ireland', flag: '🇮🇪', subscribed: false, price: '$34', videoTitle: 'Ireland Education System' },
    { id: 9, name: 'France', flag: '🇫🇷', subscribed: false, price: '$33', videoTitle: 'Study in France Guide' },
    { id: 10, name: 'Sweden', flag: '🇸🇪', subscribed: false, price: '$32', videoTitle: 'Sweden Free Education' },
    { id: 11, name: 'Netherlands', flag: '🇳🇱', subscribed: false, price: '$37', videoTitle: 'Netherlands Universities' },
    { id: 12, name: 'Japan', flag: '🇯🇵', subscribed: false, price: '$41', videoTitle: 'Study in Japan Guide' },
  ];

  // Exams with subscription and content
  const exams = [
    { 
      id: 1, 
      name: 'TOEFL', 
      subscribed: false, 
      price: '$29',
      duration: '3 hours',
      sections: ['Reading', 'Listening', 'Speaking', 'Writing'],
      videos: ['Reading Strategies', 'Listening Practice', 'Speaking Templates', 'Writing Techniques'],
      syllabus: ['Academic passages', 'Campus conversations', 'Speaking tasks', 'Essay writing']
    },
    { 
      id: 2, 
      name: 'IELTS', 
      subscribed: false, 
      price: '$32',
      duration: '2 hours 45 min',
      sections: ['Listening', 'Reading', 'Writing', 'Speaking'],
      videos: ['Band 9 Writing', 'Listening Tips', 'Speaking Practice', 'Time Management'],
      syllabus: ['General Training', 'Academic Module', 'Essay Writing', 'Face-to-face Test']
    },
    { 
      id: 3, 
      name: 'Duolingo', 
      subscribed: false, 
      price: '$25',
      duration: '1 hour',
      sections: ['Adaptive Test', 'Video Interview', 'Writing Sample'],
      videos: ['Test Strategies', 'Interview Tips', 'Writing Examples', 'Score Improvement'],
      syllabus: ['Computer-adaptive', 'Graded Writing', 'Video Interview', 'Proficiency Test']
    },
    { 
      id: 4, 
      name: 'PTE', 
      subscribed: false, 
      price: '$28',
      duration: '2 hours',
      sections: ['Speaking & Writing', 'Reading', 'Listening'],
      videos: ['Speaking Templates', 'Reading Strategies', 'Listening Practice', 'Score Tips'],
      syllabus: ['AI Assessment', 'Integrated Skills', 'Multiple Responses', 'Computer-based']
    },
    { 
      id: 5, 
      name: 'GRE', 
      subscribed: false, 
      price: '$45',
      duration: '3 hours 45 min',
      sections: ['Verbal Reasoning', 'Quantitative', 'Analytical Writing'],
      videos: ['Quantitative Solving', 'Verbal Techniques', 'Essay Writing', 'Math Concepts'],
      syllabus: ['Vocabulary Building', 'Math Review', 'Writing Tasks', 'Research Section']
    },
    { 
      id: 6, 
      name: 'SAT', 
      subscribed: false, 
      price: '$35',
      duration: '3 hours',
      sections: ['Reading', 'Writing & Language', 'Math'],
      videos: ['Math Problems', 'Reading Comprehension', 'Writing Skills', 'Test Strategies'],
      syllabus: ['Evidence Reading', 'Grammar Usage', 'Algebra Math', 'Data Analysis']
    },
    { 
      id: 7, 
      name: 'GMAT', 
      subscribed: false, 
      price: '$42',
      duration: '3 hours 7 min',
      sections: ['Quantitative', 'Verbal', 'Integrated Reasoning', 'Analytical Writing'],
      videos: ['Quantitative Mastery', 'Verbal Strategies', 'Reasoning Skills', 'Business Essays'],
      syllabus: ['Data Sufficiency', 'Reading Comprehension', 'Critical Reasoning', 'Multi-source']
    }
  ];

  // Handle exam press
  const handleExamPress = (exam) => {
    if (exam.subscribed) {
      setSelectedExam(exam);
      setExamModal(true);
    } else {
      setSelectedExam(exam);
      setSubscriptionType('exam');
      setSubscriptionModal(true);
    }
  };

  const handleCountryPress = (country) => {
    if (country.subscribed) {
      Alert.alert(
        `Watch ${country.videoTitle}`,
        'Video player will open here with exclusive content about studying in ' + country.name,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Watch Video', onPress: () => playVideo(country) }
        ]
      );
    } else {
      setSelectedCountry(country);
      setSubscriptionType('country');
      setSubscriptionModal(true);
    }
  };

  const playVideo = (country) => {
    Alert.alert(
      'Video Player',
      `Playing: ${country.videoTitle}\n\nThis would open a full-screen video player with exclusive content about studying in ${country.name}.`,
      [{ text: 'Close', style: 'cancel' }]
    );
  };

  const handleSubscribe = () => {
    setSubscriptionModal(false);
    setPaymentModal(true);
  };

  const handlePayment = () => {
    setPaymentModal(false);
    const item = subscriptionType === 'country' ? selectedCountry : selectedExam;
    Alert.alert(
      'Subscription Successful! 🎉',
      `You now have access to all ${item.name} ${subscriptionType === 'country' ? 'country guides' : 'exam materials'}.`,
      [
        { 
          text: 'Start Learning', 
          onPress: () => {
            if (subscriptionType === 'exam') {
              setExamModal(true);
            } else {
              playVideo(item);
            }
          }
        }
      ]
    );
  };

  // Exam Card component
  const ExamCard = ({ exam }) => (
    <TouchableOpacity onPress={() => handleExamPress(exam)}>
      <Card style={[styles.examCard, exam.subscribed && styles.subscribedCard]}>
        <Card.Content style={styles.examCardContent}>
          <Text style={styles.examName}>{exam.name}</Text>
          <Text style={styles.examDuration}>{exam.duration}</Text>
          {exam.subscribed ? (
            <View style={styles.subscribedBadge}>
              <Text style={styles.subscribedText}>ACCESS</Text>
            </View>
          ) : (
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{exam.price}</Text>
              <Text style={styles.accessText}>Subscribe</Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const CountryCard = ({ country }) => (
    <TouchableOpacity onPress={() => handleCountryPress(country)}>
      <Card style={[styles.countryCard, country.subscribed && styles.subscribedCard]}>
        <Card.Content style={styles.countryCardContent}>
          <View style={styles.flagContainer}>
            <Text style={styles.countryFlag}>{country.flag}</Text>
          </View>
          <Text style={styles.countryName} numberOfLines={1}>{country.name}</Text>
          {country.subscribed ? (
            <View style={styles.subscribedBadge}>
              <Text style={styles.subscribedText}>SUBSCRIBED</Text>
            </View>
          ) : (
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{country.price}</Text>
              <Text style={styles.accessText}>Access</Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Company Logo & Name */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text variant="headlineSmall" style={styles.companyName}>
          Mr. Goble Consultancy
        </Text>
        <Text style={styles.tagline}>
          Helping students achieve their dreams abroad
        </Text>
        {user && (
          <Text style={styles.userWelcome}>
            👤 Welcome, {user.email}
          </Text>
        )}
      </View>

      {/* CEO / Consultant Section */}
      <Card style={styles.card}>
        <Card.Content style={styles.centerContent}>
          <Image source={ceo} style={styles.ceoPhoto} />
          <Text variant="titleMedium" style={styles.ceoName}>
            Mr. Unguturi Manikanta
          </Text>
          <Text variant="bodyMedium" style={styles.ceoTitle}>
            Chief Consultant
          </Text>
          <Text style={styles.ceoEmail}>
            📧 mrglobaledu1999@gmail.com
          </Text>
          <Text style={styles.ceoPhone}>
            📞 +91 9876543210
          </Text>
        </Card.Content>
      </Card>

      {/* About Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            About Our Company
          </Text>
          <Text style={styles.description}>
            Mr. Goble Consultancy is a professional education consultancy dedicated to helping
            students achieve their academic and career goals both in India and abroad. We provide
            expert guidance, personalized counseling, and support for international exams and
            admissions.
          </Text>
        </Card.Content>
      </Card>

      {/* Premium Content Section */}
      <Card style={styles.premiumCard}>
        <Card.Content>
          <View style={styles.premiumHeader}>
            <Text style={styles.premiumIcon}>🎓</Text>
            <Text variant="titleLarge" style={styles.premiumTitle}>
              Premium Country Guides
            </Text>
          </View>
          <Text style={styles.premiumDescription}>
            Access exclusive video guides for each country with detailed information about:
          </Text>
          <View style={styles.premiumFeatures}>
            <View style={styles.featureRow}>
              <Text style={styles.feature}>🎥 University admissions</Text>
              <Text style={styles.feature}>💼 Job opportunities</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.feature}>📊 Visa requirements</Text>
              <Text style={styles.feature}>💰 Cost of living</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Countries Supported */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              🌍 Countries We Support
            </Text>
            <Text style={styles.countriesCount}>{countries.length} countries</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Tap on any country to access exclusive video guides
          </Text>
          
          <View style={styles.countriesContainer}>
            {countries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Exams Section */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              📝 Exams We Support
            </Text>
            <Text style={styles.countriesCount}>{exams.length} exams</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Tap on any exam to access syllabus, videos, and study materials
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.examsContainer}
          >
            {exams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </ScrollView>
        </Card.Content>
      </Card>

      {/* Contact Info */}
      <Card style={styles.contactCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.contactTitle}>
            📞 Get In Touch
          </Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📍</Text>
              <Text style={styles.contactText}>Hyderabad, Telangana</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📧</Text>
              <Text style={styles.contactText}>mrglobaledu1999@gmail.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📱</Text>
              <Text style={styles.contactText}>+91 9876543210</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>🕒</Text>
              <Text style={styles.contactText}>Mon-Sat: 9:00 AM - 6:00 PM</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Subscription Modal */}
      <Portal>
        <Modal
          visible={subscriptionModal}
          onDismiss={() => setSubscriptionModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Card style={styles.modalCard}>
            <Card.Content>
              <View style={styles.modalHeader}>
                <Text style={styles.modalIcon}>
                  {subscriptionType === 'country' ? '🌍' : '📝'}
                </Text>
                <Text variant="titleLarge" style={styles.modalTitle}>
                  {subscriptionType === 'country' ? selectedCountry?.name : selectedExam?.name}
                </Text>
              </View>
              
              <Text style={styles.modalDescription}>
                Get lifetime access to all {subscriptionType === 'country' ? 'country guides' : 'exam materials'} including:
              </Text>

              <View style={styles.featuresGrid}>
                {subscriptionType === 'country' ? (
                  <>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureIcon}>🎥</Text>
                      <Text style={styles.featureLabel}>Video Guides</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureIcon}>📊</Text>
                      <Text style={styles.featureLabel}>Admissions</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureIcon}>💼</Text>
                      <Text style={styles.featureLabel}>Job Info</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureIcon}>💰</Text>
                      <Text style={styles.featureLabel}>Cost Analysis</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureIcon}>📚</Text>
                      <Text style={styles.featureLabel}>Syllabus</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureIcon}>🎥</Text>
                      <Text style={styles.featureLabel}>Video Lessons</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureIcon}>📝</Text>
                      <Text style={styles.featureLabel}>Practice Tests</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureIcon}>📊</Text>
                      <Text style={styles.featureLabel}>Study Materials</Text>
                    </View>
                  </>
                )}
              </View>

              <View style={styles.priceContainerModal}>
                <View style={styles.priceBox}>
                  <Text style={styles.discountedPrice}>
                    {subscriptionType === 'country' ? selectedCountry?.price : selectedExam?.price}
                  </Text>
                  <Text style={styles.saveText}>LIFETIME ACCESS</Text>
                </View>
                <Text style={styles.lifetimeAccess}>One-time payment • Unlimited access</Text>
              </View>

              <Button
                mode="contained"
                onPress={handleSubscribe}
                style={styles.subscribeButton}
                labelStyle={styles.subscribeButtonText}
              >
                Subscribe Now
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => setSubscriptionModal(false)}
                style={styles.cancelButton}
              >
                Maybe Later
              </Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>

      {/* Exam Details Modal */}
      <Portal>
        <Modal
          visible={examModal}
          onDismiss={() => setExamModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Card style={styles.modalCard}>
            <Card.Content>
              <View style={styles.modalHeader}>
                <Text style={styles.modalIcon}>📝</Text>
                <Text variant="titleLarge" style={styles.modalTitle}>
                  {selectedExam?.name} Preparation
                </Text>
              </View>

              <Text style={styles.examDurationModal}>
                Duration: {selectedExam?.duration}
              </Text>

              {/* Syllabus Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitleModal}>📚 Syllabus</Text>
                <View style={styles.syllabusList}>
                  {selectedExam?.syllabus?.map((item, index) => (
                    <Text key={index} style={styles.syllabusItem}>
                      • {item}
                    </Text>
                  ))}
                </View>
              </View>

              {/* Videos Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitleModal}>🎥 Video Lessons</Text>
                <View style={styles.videosList}>
                  {selectedExam?.videos?.map((video, index) => (
                    <TouchableOpacity key={index} style={styles.videoItem}>
                      <Text style={styles.videoIcon}>▶️</Text>
                      <Text style={styles.videoTitle}>{video}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Test Sections */}
              <View style={styles.section}>
                <Text style={styles.sectionTitleModal}>📊 Test Sections</Text>
                <View style={styles.sectionsGrid}>
                  {selectedExam?.sections?.map((section, index) => (
                    <View key={index} style={styles.sectionChip}>
                      <Text style={styles.sectionText}>{section}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <Button
                mode="contained"
                onPress={() => {
                  setExamModal(false);
                  Alert.alert('Practice Test', 'Starting practice test for ' + selectedExam?.name);
                }}
                style={styles.practiceButton}
              >
                Start Practice Test
              </Button>

              <Button
                mode="outlined"
                onPress={() => setExamModal(false)}
                style={styles.cancelButton}
              >
                Close
              </Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>

      {/* Payment Modal */}
      <Portal>
        <Modal
          visible={paymentModal}
          onDismiss={() => setPaymentModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Card style={styles.modalCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.modalTitle}>
                Complete Payment
              </Text>
              
              <View style={styles.paymentSummary}>
                <View style={styles.paymentItem}>
                  <Text style={styles.paymentLabel}>
                    {subscriptionType === 'country' ? 'Country Guide:' : 'Exam Preparation:'}
                  </Text>
                  <Text style={styles.paymentValue}>
                    {subscriptionType === 'country' ? selectedCountry?.name : selectedExam?.name}
                  </Text>
                </View>
                <View style={styles.paymentItem}>
                  <Text style={styles.paymentLabel}>Plan:</Text>
                  <Text style={styles.paymentValue}>Lifetime Access</Text>
                </View>
                <View style={styles.paymentItem}>
                  <Text style={styles.paymentLabel}>Amount:</Text>
                  <Text style={styles.paymentAmount}>
                    {subscriptionType === 'country' ? selectedCountry?.price : selectedExam?.price}
                  </Text>
                </View>
              </View>

              <Button
                mode="contained"
                onPress={handlePayment}
                style={styles.payButton}
                labelStyle={styles.payButtonText}
              >
                Pay {subscriptionType === 'country' ? selectedCountry?.price : selectedExam?.price}
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => setPaymentModal(false)}
                style={styles.cancelButton}
              >
                Cancel Payment
              </Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#2196F3',
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2196F3',
    marginBottom: 4,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  userWelcome: {
    marginTop: 8,
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  premiumCard: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: '#667eea',
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  premiumIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  premiumTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  premiumDescription: {
    fontSize: 14,
    color: 'white',
    marginBottom: 12,
    opacity: 0.9,
  },
  premiumFeatures: {
    marginBottom: 4,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  feature: {
    fontSize: 13,
    color: 'white',
    opacity: 0.9,
  },
  centerContent: {
    alignItems: 'center',
  },
  ceoPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 4,
    borderColor: '#FFD700',
  },
  ceoName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  ceoTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  ceoEmail: {
    fontSize: 14,
    color: '#2196F3',
    textAlign: 'center',
  },
  ceoPhone: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2196F3',
  },
  countriesCount: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    textAlign: 'justify',
  },
  // Countries Grid
  countriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  countryCard: {
    width: (width - 48) / 3,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  subscribedCard: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4CAF50',
  },
  countryCardContent: {
    alignItems: 'center',
    padding: 12,
  },
  flagContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  countryFlag: {
    fontSize: 20,
  },
  countryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  subscribedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  subscribedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6f00',
  },
  accessText: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  // Exams Horizontal Scroll
  examsContainer: {
    paddingRight: 16,
  },
  examCard: {
    width: 120,
    marginRight: 12,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: 'white',
  },
  examCardContent: {
    alignItems: 'center',
    padding: 12,
  },
  examName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  examDuration: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  // Contact Section
  contactCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: 'white',
  },
  contactTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2196F3',
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
  },
  contactText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  // Modal Styles
  modalContainer: {
    margin: 20,
  },
  modalCard: {
    padding: 20,
    borderRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  modalTitle: {
    fontWeight: 'bold',
    color: '#2196F3',
    fontSize: 20,
  },
  modalDescription: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 20,
    fontSize: 14,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  featureLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  priceContainerModal: {
    alignItems: 'center',
    marginBottom: 20,
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  discountedPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginRight: 8,
  },
  saveText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  lifetimeAccess: {
    fontSize: 12,
    color: '#666',
  },
  subscribeButton: {
    backgroundColor: '#ff6f00',
    paddingVertical: 10,
    marginBottom: 8,
    borderRadius: 12,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    marginBottom: 8,
    borderRadius: 12,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    borderColor: '#666',
    borderRadius: 12,
  },
  paymentSummary: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    color: '#666',
    fontWeight: '500',
  },
  paymentValue: {
    color: '#333',
    fontWeight: 'bold',
  },
  paymentAmount: {
    color: '#ff6f00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Exam-specific styles
  examDurationModal: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  // Exam Modal Styles
  section: {
    marginBottom: 16,
  },
  sectionTitleModal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  syllabusList: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  syllabusItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    lineHeight: 18,
  },
  videosList: {
    maxHeight: 150,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  videoIcon: {
    marginRight: 8,
  },
  videoTitle: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  sectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sectionChip: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sectionText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
  practiceButton: {
    backgroundColor: '#4CAF50',
    marginBottom: 8,
  }
});