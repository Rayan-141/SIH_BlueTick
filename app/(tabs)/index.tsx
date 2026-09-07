import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, SafeAreaView, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Typography, Spacing, Radius } from '../../src/theme';
import { useAuthStore } from '../../src/store/authStore';
import { useRouter } from 'expo-router';
import { AppDrawer } from '../../src/components/AppDrawer';

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [showDropdown, setShowDropdown] = useState(false);

  const periods = ['This Week', 'This Month', 'This Year'];

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    setShowDropdown(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // In a real app, we would route to analysis screen with the image URI
      // router.push({ pathname: '/analysis/[id]', params: { imageUri: result.assets[0].uri } });
      Alert.alert('Image Selected', 'Image successfully uploaded for analysis. (Placeholder)', [{ text: 'OK' }]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Modal visible={isDrawerVisible} animationType="fade" transparent={true}>
        <AppDrawer onClose={() => setDrawerVisible(false)} />
      </Modal>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.headerIcon} onPress={() => setDrawerVisible(true)}>
            <MaterialIcons name="menu" size={24} color={Colors.textPrimary} />
          </Pressable>
          <View style={styles.brandContainer}>
            <MaterialIcons name="verified" size={20} color={Colors.primary} />
            <Text style={[Typography.titleMedium, { color: Colors.primary, marginLeft: 6, fontWeight: '700' }]}>
              BlueTick
            </Text>
          </View>
          <Pressable style={styles.headerIcon} onPress={() => router.push('/notifications')}>
            <MaterialIcons name="notifications-none" size={24} color={Colors.textPrimary} />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={[Typography.bodyMedium, { color: Colors.textSecondary, marginBottom: 4 }]}>
            Good morning, {user?.name?.split(' ')[0] || 'Aarav'} 👋
          </Text>
          <Text style={[Typography.headlineMedium, { color: Colors.primary, fontWeight: '800', width: '70%' }]}>
            Let's make compliance effortless.
          </Text>
          
          {/* Decorative dots - simplified representation */}
          <View style={styles.decorativeDots}>
            {[...Array(9)].map((_, i) => (
              <View key={i} style={styles.dot} />
            ))}
          </View>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Text style={[Typography.headlineSmall, { color: Colors.textInverse, fontWeight: '700' }]}>
            Start New{'\n'}Inspection
          </Text>
          <Text style={[Typography.bodySmall, { color: 'rgba(255,255,255,0.8)', marginTop: 8, marginBottom: 24 }]}>
            AI-powered label analysis{'\n'}in seconds
          </Text>

          <View style={styles.heroIconContainer}>
            <MaterialIcons name="document-scanner" size={40} color={Colors.textInverse} style={{ opacity: 0.8 }} />
          </View>

          <Pressable style={styles.scanButton} onPress={() => router.push('/scanner')}>
            <MaterialIcons name="center-focus-strong" size={20} color={Colors.primary} />
            <Text style={[Typography.button, { color: Colors.primary, marginLeft: 8 }]}>Scan Label</Text>
            <MaterialIcons name="camera-alt" size={20} color={Colors.primary} style={{ position: 'absolute', right: 16 }} />
          </Pressable>

          <View style={styles.orContainer}>
            <View style={styles.divider} />
            <Text style={[Typography.labelSmall, { color: 'rgba(255,255,255,0.6)', marginHorizontal: 8 }]}>or</Text>
            <View style={styles.divider} />
          </View>

          <Pressable style={styles.uploadButton} onPress={pickImage}>
            <Text style={[Typography.button, { color: Colors.textInverse }]}>Upload Image</Text>
            <MaterialIcons name="cloud-upload" size={20} color={Colors.textInverse} style={{ marginLeft: 8 }} />
          </Pressable>
        </View>

        {/* Overview Header */}
        <View style={[styles.overviewHeader, { zIndex: 10 }]}>
          <Text style={[Typography.titleLarge, { fontWeight: '700' }]}>Overview</Text>
          <View style={{ position: 'relative' }}>
            <Pressable style={styles.dropdown} onPress={() => setShowDropdown(!showDropdown)}>
              <Text style={[Typography.labelMedium, { color: Colors.textSecondary }]}>{selectedPeriod}</Text>
              <MaterialIcons name={showDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={16} color={Colors.textSecondary} />
            </Pressable>

            {showDropdown && (
              <View style={styles.dropdownMenu}>
                {periods.map((period) => (
                  <Pressable 
                    key={period} 
                    style={styles.dropdownItem} 
                    onPress={() => handlePeriodSelect(period)}
                  >
                    <Text style={[
                      Typography.labelMedium, 
                      { color: period === selectedPeriod ? Colors.primary : Colors.textPrimary, fontWeight: period === selectedPeriod ? '600' : '400' }
                    ]}>
                      {period}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Checked */}
          <View style={[styles.statBox, { backgroundColor: Colors.primary }]}>
            <MaterialIcons name="check-circle-outline" size={20} color={Colors.textInverse} />
            <Text style={[Typography.headlineMedium, { color: Colors.textInverse, marginTop: 8, marginBottom: 2 }]}>126</Text>
            <Text style={[Typography.labelSmall, { color: 'rgba(255,255,255,0.8)' }]}>Checked</Text>
          </View>

          {/* Issues */}
          <View style={[styles.statBox, { backgroundColor: '#E65100' }]}>
            <MaterialIcons name="warning-amber" size={20} color={Colors.textInverse} />
            <Text style={[Typography.headlineMedium, { color: Colors.textInverse, marginTop: 8, marginBottom: 2 }]}>8</Text>
            <Text style={[Typography.labelSmall, { color: 'rgba(255,255,255,0.8)' }]}>Issues</Text>
          </View>

          {/* In Progress */}
          <View style={[styles.statBox, { backgroundColor: '#FFB300' }]}>
            <MaterialIcons name="schedule" size={20} color={Colors.textInverse} />
            <Text style={[Typography.headlineMedium, { color: Colors.textInverse, marginTop: 8, marginBottom: 2 }]}>24</Text>
            <Text style={[Typography.labelSmall, { color: 'rgba(255,255,255,0.8)' }]}>In Progress</Text>
          </View>

          {/* Compliant */}
          <View style={[styles.statBox, { backgroundColor: '#E0F7FA' }]}>
            <MaterialIcons name="verified-user" size={20} color={Colors.primary} />
            <Text style={[Typography.headlineMedium, { color: Colors.primary, marginTop: 8, marginBottom: 2 }]}>116</Text>
            <Text style={[Typography.labelSmall, { color: Colors.primary } ]}>Compliant</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  content: { paddingBottom: 100 }, // Extra padding for bottom nav
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
    paddingVertical: Spacing.md,
  },
  headerIcon: {
    padding: 8,
    position: 'relative',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 8,
    backgroundColor: '#E65100',
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.background,
  },
  badgeText: {
    color: Colors.textInverse,
    fontSize: 8,
    fontWeight: 'bold',
  },
  greetingSection: {
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    position: 'relative',
  },
  decorativeDots: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.screenHorizontal,
    width: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    opacity: 0.2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  heroCard: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.screenHorizontal,
    borderRadius: 24,
    padding: Spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  heroIconContainer: {
    position: 'absolute',
    top: '30%',
    right: '15%',
  },
  scanButton: {
    backgroundColor: Colors.textInverse,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: Radius.button,
    position: 'relative',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: Radius.button,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
    marginTop: Spacing.xxl,
    marginBottom: Spacing.md,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 4,
    backgroundColor: Colors.surface,
    borderRadius: Radius.button,
    paddingVertical: 4,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    zIndex: 20,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screenHorizontal,
    gap: Spacing.sm,
  },
  statBox: {
    flex: 1,
    borderRadius: 16,
    padding: Spacing.md,
    alignItems: 'center',
  },
});
