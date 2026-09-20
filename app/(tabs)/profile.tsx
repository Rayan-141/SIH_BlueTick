import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '../../src/theme';
import { usePreferencesStore } from '../../src/store/preferencesStore';
import { useAuthStore } from '../../src/store/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  const language = usePreferencesStore((state) => state.language);
  const logout = useAuthStore((state) => state.logout);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const openSection = (section: 'personal' | 'preferences' | 'password' | 'notifications' | 'language') => {
    router.push(`/profile/${section}`);
  };

  const handleLogout = async () => {
    setLogoutModalVisible(false);
    await logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => router.push('/')}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={[Typography.titleMedium, styles.headerTitle]}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[Typography.titleMedium, { color: Colors.textInverse, fontWeight: '600' }]}>Aarav Verma</Text>
            <Text style={[Typography.bodyMedium, { color: Colors.textInverse, opacity: 0.9, marginTop: 2 }]}>Inspector</Text>
            <Text style={[Typography.labelSmall, { color: Colors.textInverse, opacity: 0.7, marginTop: 8 }]}>ID: INSP-2024-1256</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Pressable style={styles.menuItem} onPress={() => openSection('personal')}>
            <MaterialIcons name="person-outline" size={24} color={Colors.textSecondary} />
            <Text style={styles.menuText}>Personal Information</Text>
            <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => openSection('preferences')}>
            <MaterialIcons name="settings" size={24} color={Colors.textSecondary} />
            <Text style={styles.menuText}>Preferences</Text>
            <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => openSection('password')}>
            <MaterialIcons name="lock-outline" size={24} color={Colors.textSecondary} />
            <Text style={styles.menuText}>Change Password</Text>
            <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => openSection('notifications')}>
            <MaterialIcons name="notifications-none" size={24} color={Colors.textSecondary} />
            <Text style={styles.menuText}>Notification Settings</Text>
            <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => openSection('language')}>
            <MaterialIcons name="language" size={24} color={Colors.textSecondary} />
            <Text style={styles.menuText}>Language</Text>
            <Text style={[Typography.labelMedium, { color: Colors.textSecondary, marginRight: 8 }]}>{language}</Text>
            <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.logoutItem} onPress={() => setLogoutModalVisible(true)}>
            <MaterialIcons name="logout" size={24} color={Colors.accent} />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

      </ScrollView>

      <Modal
        visible={isLogoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.warningIconContainer}>
              <MaterialIcons name="priority-high" size={48} color={Colors.surface} />
            </View>
            <Text style={styles.modalTitle}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtonsRow}>
              <Pressable style={[styles.modalButton, styles.modalButtonCancel]} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.modalButtonLogout]} onPress={handleLogout}>
                <Text style={styles.modalButtonTextLogout}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  iconButton: { padding: 8 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '600', textAlign: 'center' },
  headerSpacer: { width: 40 },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: 100, // Space for bottom nav
  },
  profileCard: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4DB6AC', // Lighter teal border
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  avatarText: {
    fontSize: 28,
    color: '#E0F2F1', // Very light teal
    fontWeight: '600',
  },
  profileInfo: {
    flex: 1,
  },
  menuContainer: {
    paddingHorizontal: Spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuText: {
    flex: 1,
    marginLeft: Spacing.md,
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '400',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  logoutText: {
    marginLeft: Spacing.md,
    color: Colors.accent,
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  warningIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F06565',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    ...Typography.titleLarge,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 32,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonCancel: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#F06565',
  },
  modalButtonLogout: {
    backgroundColor: '#F06565',
  },
  modalButtonTextCancel: {
    color: '#F06565',
    fontWeight: '700',
  },
  modalButtonTextLogout: {
    color: Colors.textInverse,
    fontWeight: '700',
  },
});
