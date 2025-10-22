import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Text, 
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import { Card, IconButton } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default function AchievementsScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Array of 14 local images
  const images = [
    require('../../assets/images/ACHIVEMENT (1).png'),
    require('../../assets/images/ACHIVEMENT (2).png'),
    require('../../assets/images/ACHIVEMENT (3).png'),
    require('../../assets/images/ACHIVEMENT (4).png'),
    require('../../assets/images/ACHIVEMENT (5).png'),
    require('../../assets/images/ACHIVEMENT (6).png'),
    require('../../assets/images/ACHIVEMENT (7).png'),
    require('../../assets/images/ACHIVEMENT (8).png'),
    require('../../assets/images/ACHIVEMENT (9).png'),
    require('../../assets/images/ACHIVEMENT (10).png'),
    require('../../assets/images/ACHIVEMENT (11).png'),
    require('../../assets/images/ACHIVEMENT (12).png'),
    require('../../assets/images/ACHIVEMENT (13).png'),
    require('../../assets/images/ACHIVEMENT (14).png'),
  ];

  // Achievement titles for each image
  const achievementTitles = [
    "Best Consultancy Award 2023",
    "Student Excellence Award",
    "Top Performer Recognition",
    "Quality Service Certificate",
    "Industry Leadership Award",
    "Client Satisfaction Award",
    "Innovation in Education",
    "Global Education Partner",
    "Excellence in Counseling",
    "Student Success Stories",
    "Professional Development",
    "Community Impact Award",
    "Educational Excellence",
    "Outstanding Service Award"
  ];

  // Achievement descriptions
  const achievementDescriptions = [
    "Recognized as the best education consultancy for outstanding student support and university placements in 2023.",
    "Awarded for exceptional student success rates and personalized guidance for international education.",
    "Honored for being a top performer in student visa success rates and admission offers.",
    "Certified for maintaining high-quality service standards and student satisfaction.",
    "Acknowledged as an industry leader in education consultancy and student mentorship.",
    "Received for achieving 98% client satisfaction rate in student feedback surveys.",
    "Awarded for innovative approaches in education counseling and digital transformation.",
    "Recognized as a trusted global partner for international university collaborations.",
    "Honored for excellence in student counseling and career guidance services.",
    "Celebrating numerous student success stories and life-changing opportunities created.",
    "Awarded for continuous professional development and staff training initiatives.",
    "Recognized for positive community impact and educational outreach programs.",
    "Acknowledged for maintaining educational excellence and high academic standards.",
    "Received for outstanding service delivery and exceptional student support."
  ];

  const handleImagePress = (image, index) => {
    setSelectedImage({
      image,
      title: achievementTitles[index],
      description: achievementDescriptions[index],
      number: index + 1
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = selectedImage.number - 1;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    
    setSelectedImage({
      image: images[newIndex],
      title: achievementTitles[newIndex],
      description: achievementDescriptions[newIndex],
      number: newIndex + 1
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <Text style={styles.title}>🏆 Our Achievements</Text>
          <Text style={styles.subtitle}>
            Celebrating our journey of success and excellence
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{images.length}</Text>
              <Text style={styles.statLabel}>Awards</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1000+</Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Universities</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Image Grid */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        {images.map((img, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => handleImagePress(img, index)}
            activeOpacity={0.7}
          >
            <Card style={styles.achievementCard} elevation={3}>
              <View style={styles.imageContainer}>
                <Image source={img} style={styles.image} />
                <View style={styles.overlay} />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>#{index + 1}</Text>
                </View>
              </View>
              <Card.Content style={styles.cardContent}>
                <Text style={styles.achievementTitle} numberOfLines={2}>
                  {achievementTitles[index]}
                </Text>
                <Text style={styles.tapHint} numberOfLines={1}>
                  👆 Tap to view details
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Full Image Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <StatusBar backgroundColor="rgba(0,0,0,0.9)" barStyle="light-content" />
          
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <IconButton
              icon="close"
              iconColor="#fff"
              size={28}
              style={styles.closeIcon}
            />
          </TouchableOpacity>

          {/* Navigation Arrows */}
          <TouchableOpacity 
            style={[styles.navButton, styles.prevButton]} 
            onPress={() => navigateImage('prev')}
          >
            <IconButton
              icon="chevron-left"
              iconColor="#fff"
              size={32}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navButton, styles.nextButton]} 
            onPress={() => navigateImage('next')}
          >
            <IconButton
              icon="chevron-right"
              iconColor="#fff"
              size={32}
            />
          </TouchableOpacity>

          {/* Image Container */}
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.fullImageContainer}>
              <Image 
                source={selectedImage?.image} 
                style={styles.fullImage}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>

          {/* Image Info */}
          <View style={styles.imageInfo}>
            <Text style={styles.imageNumber}>
              Achievement #{selectedImage?.number} of {images.length}
            </Text>
            <Text style={styles.imageTitle}>
              {selectedImage?.title}
            </Text>
            <ScrollView style={styles.descriptionScroll}>
              <Text style={styles.imageDescription}>
                {selectedImage?.description}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap on any achievement to view details
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 20,
    elevation: 6,
    backgroundColor: '#667eea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    justifyContent: 'space-between',
    paddingBottom: 80,
  },
  achievementCard: {
    width: (width - 40) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
    paddingTop: 10,
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    lineHeight: 16,
    height: 32,
  },
  tapHint: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  closeButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 10,
    right: 10,
    zIndex: 1000,
  },
  closeIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
  },
  prevButton: {
    left: 10,
  },
  nextButton: {
    right: 10,
  },
  fullImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fullImage: {
    width: '100%',
    height: '70%',
    maxWidth: 500,
  },
  imageInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageNumber: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 5,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionScroll: {
    maxHeight: 80,
  },
  imageDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});