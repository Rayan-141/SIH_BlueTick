import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Modal } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../theme';

interface DrawerItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  onPress: () => void;
  isActive?: boolean;
  badgeCount?: number;
  iconColor?: string;
  textColor?: string;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
  icon, title, onPress, isActive = false, badgeCount, iconColor, textColor,
}) => {
  const color = isActive ? Colors.primary : Colors.textSecondary;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.item, isActive && styles.itemActive]}
    >
      <MaterialIcons name={icon} size={24} color={iconColor ?? color} />
      <Text style={[
        Typography.bodyMedium,
        styles.itemText,
        { color: textColor ?? (isActive ? Colors.primary : Colors.textPrimary) },
        isActive && { fontWeight: '600' },
      ]}>{title}</Text>
      {badgeCount != null && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </Pressable>
  );
};

interface AppDrawerProps {
  onClose: () => void;
}

import { useAuthStore } from '../store/authStore';

export const AppDrawer: React.FC<AppDrawerProps> = ({ onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const navigate = (path: string) => {
    onClose();
    router.push(path as any);
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    navigate('/login');
  };

  const displayName = user?.name || 'Aarav Verma';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={[Typography.headlineMedium, { color: Colors.primary, fontWeight: 'bold' }]}>{initial}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={[Typography.titleMedium, { color: Colors.textInverse }]}>{displayName}</Text>
          <Text style={[Typography.labelMedium, { color: 'rgba(255,255,255,0.8)' }]}>Inspector</Text>
        </View>
        <Pressable onPress={onClose} style={{ padding: 8 }}>
          <MaterialIcons name="close" size={24} color={Colors.textInverse} />
        </Pressable>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menu}>
        <DrawerItem icon="dashboard" title="Dashboard" isActive={pathname === '/'} onPress={() => navigate('/(tabs)')} />
        <DrawerItem icon="history" title="Inspections" isActive={pathname === '/inspections'} onPress={() => navigate('/(tabs)/inspections')} />
        <DrawerItem icon="menu-book" title="Standards" isActive={pathname === '/standards'} onPress={() => navigate('/standards')} />
        <DrawerItem icon="business" title="Entities" onPress={() => navigate('/entities')} />
        <DrawerItem icon="insert-chart" title="Reports" isActive={pathname === '/alerts'} onPress={() => navigate('/(tabs)/alerts')} />
        <DrawerItem icon="notifications-none" title="Notifications" onPress={() => navigate('/notifications')} />
        <DrawerItem icon="settings" title="Settings" onPress={() => navigate('/settings')} />
        <DrawerItem icon="help-outline" title="Help & Support" onPress={() => navigate('/help')} />

        <View style={styles.divider} />

        <DrawerItem icon="logout" title="Logout" iconColor={Colors.accent} textColor={Colors.accent} onPress={() => setLogoutModalVisible(true)} />
      </ScrollView>

      {/* Bottom Decoration */}
      <View style={styles.bottomDeco}>
        <View style={[styles.circle, { right: -20, bottom: -20, width: 120, height: 120, backgroundColor: Colors.accent }]} />
        <View style={[styles.circle, { right: 60, bottom: -50, width: 100, height: 100, backgroundColor: Colors.primary }]} />
      </View>

      {/* Logout Modal */}
      <Modal
        visible={isLogoutModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Warning Icon */}
            <View style={styles.warningIconContainer}>
              <MaterialIcons name="priority-high" size={48} color={Colors.surface} />
            </View>

            {/* Title */}
            <Text style={[Typography.titleLarge, styles.modalTitle]}>
              Are you sure you want to log out?
            </Text>

            {/* Buttons */}
            <View style={styles.modalButtonsRow}>
              <Pressable
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={[Typography.button, styles.modalButtonTextCancel]}>Cancel</Text>
              </Pressable>
              
              <Pressable
                style={[styles.modalButton, styles.modalButtonLogout]}
                onPress={handleLogout}
              >
                <Text style={[Typography.button, styles.modalButtonTextLogout]}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  headerInfo: { marginLeft: 16, flex: 1 },
  menu: { flex: 1, paddingVertical: 16 },
  item: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    marginHorizontal: 16, marginVertical: 4,
    borderRadius: 8,
  },
  itemActive: { backgroundColor: `${Colors.primary}1A` },
  itemText: { flex: 1, marginLeft: 16 },
  badge: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  badgeText: {
    color: Colors.textInverse,
    fontSize: 11, fontWeight: 'bold',
  },
  divider: {
    height: 1, backgroundColor: Colors.divider,
    marginHorizontal: 24, marginVertical: 16,
  },
  bottomDeco: { height: 100, overflow: 'hidden' },
  circle: { position: 'absolute', borderRadius: 999 },
  
  // Logout Modal Styles
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
    backgroundColor: '#F06565', // Soft red/coral that fits the image and app palette
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
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
  },
  modalButtonTextLogout: {
    color: Colors.textInverse,
  },
});
