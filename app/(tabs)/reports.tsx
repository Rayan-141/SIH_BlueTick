import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '../../src/theme';

export default function AlertsScreen() {
  const router = useRouter();
  // Using this screen for "Reports" as indicated by the mockup where Alerts tab icon is highlighted for Reports content
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => router.push('/')}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={[Typography.titleMedium, { fontWeight: '600' }]}>Reports</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color={Colors.textSecondary} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search reports..." 
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
        <Pressable style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color={Colors.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.tabsContainer}>
        <Pressable style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Summary</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Trend</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Comparison</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Overall Compliance Score */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={[Typography.titleSmall, { fontWeight: '600' }]}>Overall Compliance Score</Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>This Month</Text>
              <MaterialIcons name="keyboard-arrow-down" size={16} color={Colors.textSecondary} />
            </View>
          </View>
          
          <View style={styles.scoreContent}>
            <View>
              <Text style={[Typography.displayLarge, { color: Colors.primary, fontWeight: '700' }]}>92%</Text>
              <View style={styles.trendIndicator}>
                <MaterialIcons name="arrow-upward" size={16} color={Colors.primary} />
                <Text style={[Typography.labelMedium, { color: Colors.textSecondary, marginLeft: 4 }]}>
                  <Text style={{ color: Colors.primary, fontWeight: '600' }}>6%</Text> from last month
                </Text>
              </View>
            </View>
            {/* Mock Donut Chart */}
            <View style={styles.donutChart}>
              <View style={styles.donutInner} />
            </View>
          </View>
        </View>

        {/* Score Trend */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={[Typography.titleSmall, { fontWeight: '600' }]}>Score Trend</Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>This Month</Text>
              <MaterialIcons name="keyboard-arrow-down" size={16} color={Colors.textSecondary} />
            </View>
          </View>
          <View style={styles.chartPlaceholder}>
             {/* Mock Chart Area */}
             <View style={{ flex: 1, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: '#E0E0E0', padding: 8 }}>
                <Text style={{ color: Colors.textSecondary, fontSize: 10, position: 'absolute', left: -25, top: 0 }}>100%</Text>
                <Text style={{ color: Colors.textSecondary, fontSize: 10, position: 'absolute', left: -20, top: 40 }}>50%</Text>
                <Text style={{ color: Colors.textSecondary, fontSize: 10, position: 'absolute', left: -20, bottom: 0 }}>0%</Text>
                
                {/* Mock Line */}
                <View style={{ position: 'absolute', bottom: 30, left: 20, right: 10, height: 2, backgroundColor: Colors.primary, transform: [{ rotate: '-10deg' }] }} />
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: -20, left: 0, right: 0 }}>
                  <Text style={{ fontSize: 10, color: Colors.textSecondary }}>1 May</Text>
                  <Text style={{ fontSize: 10, color: Colors.textSecondary }}>15 May</Text>
                  <Text style={{ fontSize: 10, color: Colors.textSecondary }}>29 May</Text>
                </View>
             </View>
          </View>
        </View>

        {/* Top Issue Categories */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={[Typography.titleSmall, { fontWeight: '600' }]}>Top Issue Categories</Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>This Month</Text>
              <MaterialIcons name="keyboard-arrow-down" size={16} color={Colors.textSecondary} />
            </View>
          </View>
          
          <View style={styles.barChartList}>
            <View style={styles.barChartRow}>
              <Text style={styles.barLabel}>Labeling Requirements</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '80%', backgroundColor: '#E65100' }]} />
              </View>
              <Text style={styles.barValue}>5</Text>
            </View>
            <View style={styles.barChartRow}>
              <Text style={styles.barLabel}>Ingredients & Allergen</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '50%', backgroundColor: '#E65100' }]} />
              </View>
              <Text style={styles.barValue}>3</Text>
            </View>
            <View style={styles.barChartRow}>
              <Text style={styles.barLabel}>Net Quantity Declaration</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '30%', backgroundColor: '#FFB300' }]} />
              </View>
              <Text style={styles.barValue}>2</Text>
            </View>
            <View style={styles.barChartRow}>
              <Text style={styles.barLabel}>Barcode & Traceability</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '15%', backgroundColor: '#80CBC4' }]} />
              </View>
              <Text style={styles.barValue}>1</Text>
            </View>
          </View>
        </View>

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
  filterButton: { padding: 8 },
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
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100, // Space for bottom nav
  },
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginRight: 2,
  },
  scoreContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  donutChart: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 12,
    borderColor: Colors.primary,
    borderRightColor: '#FFB300',
    borderBottomColor: '#A7FFEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8F9FA',
  },
  chartPlaceholder: {
    height: 120,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
    marginLeft: 25,
  },
  barChartList: {
    marginTop: Spacing.sm,
  },
  barChartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  barLabel: {
    width: 80,
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 14,
  },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginHorizontal: Spacing.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  barValue: {
    width: 20,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'right',
  }
});
