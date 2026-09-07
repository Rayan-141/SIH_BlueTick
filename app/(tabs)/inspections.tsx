import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '../../src/theme';

const MOCK_INSPECTIONS = [
  {
    id: 1,
    title: 'Multi Millet Cookies',
    subtitle: 'Nature Bite',
    status: 'Compliant',
    statusColor: '#00BFA5',
    date: '20 May 2024 • 10:24 AM',
    score: 92,
    imageColor: '#004D40'
  },
  {
    id: 2,
    title: 'Basmati Rice 1kg',
    subtitle: 'Green Valley Agro',
    status: 'Issues Found',
    statusColor: '#E65100',
    date: '19 May 2024 • 02:15 PM',
    score: 72,
    imageColor: '#FF6D00'
  },
  {
    id: 3,
    title: 'Sunflower Oil 1L',
    subtitle: 'Healthy Life Pvt. Ltd.',
    status: 'In Progress',
    statusColor: '#FFB300',
    date: '19 May 2024 • 11:30 AM',
    score: 45,
    imageColor: '#FFD54F'
  },
  {
    id: 4,
    title: 'Sugar 1kg',
    subtitle: 'DSR Sugars',
    status: 'Compliant',
    statusColor: '#00BFA5',
    date: '18 May 2024 • 09:45 AM',
    score: 96,
    imageColor: '#E0E0E0'
  }
];

export default function InspectionsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => router.push('/')}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={[Typography.titleMedium, { fontWeight: '600' }]}>Inspections</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color={Colors.textSecondary} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search inspections..." 
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
        <Pressable style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color={Colors.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.tabsContainer}>
        <Pressable style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>All</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>In Progress</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Completed</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {MOCK_INSPECTIONS.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* Placeholder for Image */}
            <View style={[styles.imagePlaceholder, { backgroundColor: item.imageColor }]} />
            
            <View style={styles.cardContent}>
              <Text style={[Typography.titleSmall, { fontWeight: '600' }]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={[Typography.labelMedium, { color: Colors.textSecondary, marginBottom: 4 }]} numberOfLines={1}>
                {item.subtitle}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: item.statusColor + '20' }]}>
                <Text style={[Typography.labelSmall, { color: item.statusColor, fontWeight: '600' }]}>
                  {item.status}
                </Text>
              </View>
              <Text style={[Typography.labelSmall, { color: Colors.textSecondary, marginTop: 4 }]}>
                {item.date}
              </Text>
            </View>

            <View style={styles.scoreRing}>
              <Text style={[Typography.titleMedium, { color: Colors.primary, fontWeight: '700' }]}>
                {item.score}%
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  iconButton: { padding: 8 },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    height: 44,
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.full,
    marginRight: Spacing.sm,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.textInverse,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100, // Space for bottom nav
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  imagePlaceholder: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: Spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  scoreRing: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: Colors.primary,
    borderLeftColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.md,
  }
});
