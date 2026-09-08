import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '../theme';

import { useInspectionStore, InspectionData } from '../store/inspectionStore';

// --- Helper Components ---
const Badge = ({ text, type }: { text: string; type: 'finding' | 'status' | 'priority' }) => {
  let bgColor = '#F5F5F5';
  let textColor = Colors.textSecondary;
  let iconName: keyof typeof MaterialIcons.glyphMap | null = null;
  let iconColor = '';

  if (type === 'priority') {
    bgColor = '#FFEAEA';
    textColor = Colors.error;
  } else if (type === 'finding') {
    if (text === 'Compliant') {
      bgColor = '#E6F4EA';
      textColor = Colors.success;
      iconName = 'circle';
      iconColor = Colors.success;
    } else if (text === 'Non-Compliant' || text === 'Critical') {
      bgColor = '#FCE8E6';
      textColor = Colors.error;
      iconName = text === 'Critical' ? 'error' : 'circle';
      iconColor = Colors.error;
    } else if (text === 'Minor') {
      bgColor = '#FEF7E0';
      textColor = Colors.warning;
      iconName = 'warning';
      iconColor = Colors.warning;
    }
  } else if (type === 'status') {
    if (text === 'AI Review') {
      bgColor = '#FEF7E0';
      textColor = Colors.warning;
    } else if (text === 'Pending') {
      bgColor = '#F1F3F4';
      textColor = Colors.textSecondary;
    } else if (text === 'Approved') {
      bgColor = '#E6F4EA';
      textColor = Colors.success;
    } else if (text === 'Rejected') {
      bgColor = '#FCE8E6';
      textColor = Colors.error;
    }
  }

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      {iconName && <MaterialIcons name={iconName} size={10} color={iconColor} style={{ marginRight: 4 }} />}
      <Text style={[Typography.labelSmall, { color: textColor, fontSize: 10, fontWeight: '600' }]}>{text}</Text>
    </View>
  );
};

export const RecentInspectionsList = () => {
  const [activeTab, setActiveTab] = useState('All');
  const inspections = useInspectionStore((state) => state.inspections);

  return (
    <View style={styles.container}>
      {/* Top Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
        {['All', 'High Priority', 'Needs Verification', 'Reviewed'].map((tab) => {
          const isActive = activeTab === tab;
          let count = 0;
          if (tab === 'All') count = 7;
          if (tab === 'High Priority') count = 2;
          if (tab === 'Needs Verification') count = 3;
          if (tab === 'Reviewed') count = 18;

          let badgeBg = isActive ? Colors.primary : '#F1F3F4';
          let badgeText = isActive ? Colors.textInverse : Colors.textSecondary;
          
          if (tab === 'High Priority' && !isActive) { badgeBg = '#FCE8E6'; badgeText = Colors.error; }
          if (tab === 'Needs Verification' && !isActive) { badgeBg = '#FEF7E0'; badgeText = Colors.warning; }

          return (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, isActive && styles.activeTab]}>
              <Text style={[Typography.labelMedium, { color: isActive ? Colors.primary : Colors.textSecondary, fontWeight: isActive ? '600' : '500' }]}>
                {tab}
              </Text>
              <View style={[styles.tabBadge, { backgroundColor: badgeBg }]}>
                <Text style={{ fontSize: 10, color: badgeText, fontWeight: '700' }}>{count}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={Colors.textTertiary} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search inspection, product, company or officer..."
          placeholderTextColor={Colors.textTertiary}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
        {['Date', 'Company', 'Product Category', 'Violation Type', 'Confidence', 'Officer'].map((filter) => (
          <View key={filter} style={styles.filterChip}>
            <Text style={[Typography.labelSmall, { color: Colors.textSecondary }]}>{filter}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color={Colors.textSecondary} style={{ marginLeft: 4 }} />
          </View>
        ))}
        <View style={styles.filterChip}>
          <Text style={[Typography.labelSmall, { color: Colors.textSecondary }]}>+ More Filters</Text>
        </View>
      </ScrollView>

      {/* Inspections List */}
      <View style={styles.listContainer}>
        {inspections.map((item, index) => (
          <View key={item.id} style={[styles.card, item.selected && styles.selectedCard]}>
            {/* Header Row: Checkbox, ID, Tags */}
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                <MaterialIcons 
                  name={item.selected ? "check-box" : "check-box-outline-blank"} 
                  size={20} 
                  color={item.selected ? Colors.primary : Colors.borderMedium} 
                />
                <Text style={[Typography.labelSmall, { color: Colors.textTertiary, marginLeft: 8 }]}>{item.id}</Text>
                {item.isHighPriority && (
                  <View style={{ marginLeft: 8 }}><Badge text="High Priority" type="priority" /></View>
                )}
              </View>
              <Pressable style={styles.menuButton}>
                <MaterialIcons name="more-vert" size={20} color={Colors.textTertiary} />
              </Pressable>
            </View>

            {/* Main Content: Product Info */}
            <View style={styles.productRow}>
              {item.imageUri ? (
                <Image source={{ uri: item.imageUri }} style={styles.productImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <MaterialIcons name="image" size={24} color={Colors.borderMedium} />
                </View>
              )}
              <View style={styles.productDetails}>
                <Text style={[Typography.titleSmall, { color: Colors.textPrimary, fontWeight: '600' }]} numberOfLines={1}>
                  {item.productName}
                </Text>
                <Text style={[Typography.bodySmall, { color: Colors.textSecondary, marginTop: 2 }]} numberOfLines={1}>
                  {item.company}
                </Text>
              </View>
            </View>

            {/* Meta Row: Officer & Date */}
            <View style={styles.metaRow}>
              <View style={styles.officerBadge}>
                <View style={styles.officerAvatar}>
                  <Text style={{ fontSize: 10, color: '#FFF', fontWeight: 'bold' }}>{item.officerInitials}</Text>
                </View>
                <Text style={[Typography.labelSmall, { color: Colors.textSecondary, marginLeft: 6 }]}>{item.officerName}</Text>
              </View>
              <View style={styles.dateBox}>
                <Text style={[Typography.labelSmall, { color: Colors.textSecondary }]}>{item.date}</Text>
                <Text style={[Typography.labelSmall, { color: Colors.textTertiary, fontSize: 10 }]}>{item.time}</Text>
              </View>
            </View>

            {/* Bottom Row: AI Finding & Status Action */}
            <View style={styles.cardFooter}>
              <View style={styles.findingBox}>
                <Badge text={item.finding} type="finding" />
                <Text style={[Typography.labelSmall, { color: Colors.textTertiary, fontSize: 10, marginTop: 4 }]}>
                  {item.confidence}% confidence
                </Text>
              </View>

              <View style={styles.actionBox}>
                <View style={{ marginBottom: 8, alignItems: 'flex-end' }}>
                  <Badge text={item.status} type="status" />
                </View>
                <Pressable style={[styles.reviewButton, item.status === 'AI Review' && styles.primaryReviewButton]}>
                  <Text style={[Typography.labelSmall, { color: item.status === 'AI Review' ? Colors.textInverse : Colors.textSecondary, fontWeight: '600' }]}>
                    Review
                  </Text>
                  <MaterialIcons 
                    name="arrow-forward" 
                    size={14} 
                    color={item.status === 'AI Review' ? Colors.textInverse : Colors.textSecondary} 
                    style={{ marginLeft: 4 }} 
                  />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Pagination Footer */}
      <View style={styles.pagination}>
        <Text style={[Typography.labelSmall, { color: Colors.textSecondary }]}>Showing 1-6 of 7</Text>
        <View style={styles.pageControls}>
          <MaterialIcons name="chevron-left" size={24} color={Colors.textTertiary} />
          <View style={styles.pageNumber}>
            <Text style={[Typography.labelSmall, { color: Colors.textInverse }]}>1</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.m,
  },
  tabsContainer: {
    paddingBottom: Spacing.s,
    marginBottom: Spacing.s,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.l,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.m,
    paddingHorizontal: Spacing.m,
    paddingVertical: 8,
    marginBottom: Spacing.m,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.s,
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    padding: 0,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingBottom: Spacing.m,
    marginBottom: Spacing.s,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    borderRadius: Radius.s,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: Spacing.s,
    backgroundColor: Colors.surface,
  },
  listContainer: {
    gap: Spacing.m,
  },
  card: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.m,
    padding: Spacing.m,
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: '#F0F9F8',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.s,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 4,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.m,
  },
  imagePlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: Colors.background,
    borderRadius: Radius.s,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  productImage: {
    width: 48,
    height: 48,
    borderRadius: Radius.s,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  productDetails: {
    flex: 1,
    marginLeft: Spacing.m,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    marginBottom: Spacing.s,
  },
  officerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  officerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0F4C5C', // Dark slate
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateBox: {
    alignItems: 'flex-end',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  findingBox: {
    alignItems: 'flex-start',
  },
  actionBox: {
    alignItems: 'flex-end',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    borderRadius: Radius.s,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.surface,
  },
  primaryReviewButton: {
    backgroundColor: Colors.warning,
    borderColor: Colors.warning,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.l,
    marginBottom: Spacing.xxl,
    paddingHorizontal: Spacing.s,
  },
  pageControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageNumber: {
    backgroundColor: Colors.primary,
    width: 28,
    height: 28,
    borderRadius: Radius.s,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.s,
  },
});
