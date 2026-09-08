import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '../../src/theme';
import { useInspectionLogStore } from '../../src/store/inspectionLogStore';

export default function InspectionsScreen() {
  const { logs } = useInspectionLogStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (type: string) => {
    setShowExportMenu(false);
    Alert.alert('Export Started', `Your ${type} report is being generated and will download shortly.`);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Approved':
        return { bg: '#E8F5E9', text: '#2E7D32' };
      case 'Pending':
      case 'AI Review':
        return { bg: '#FFF3E0', text: '#E65100' };
      default:
        return { bg: '#F5F5F5', text: Colors.textSecondary };
    }
  };

  const getComplianceBadgeStyle = (status?: string) => {
    switch (status) {
      case 'Compliant':
        return { bg: '#E8F5E9', text: '#2E7D32' };
      case 'Non-Compliant':
        return { bg: '#FFEBEE', text: '#C62828' };
      default:
        return { bg: '#F5F5F5', text: Colors.textSecondary };
    }
  };

  const getAIReviewColor = (level?: string) => {
    switch (level) {
      case 'High':
        return '#C62828';
      case 'Medium':
        return '#E65100';
      case 'Low':
        return '#2E7D32';
      default:
        return Colors.textSecondary;
    }
  };

  // Filter logs by search query
  const filteredLogs = logs.filter(log => 
    log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.officerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={[Typography.displaySmall, { fontWeight: '700', color: Colors.primary }]}>Inspections</Text>
          <Text style={[Typography.bodyMedium, { color: Colors.textSecondary, marginTop: 4 }]}>
            View and manage all inspections across regions.
          </Text>
        </View>

        {/* Sticky Filters & Search Section */}
        <View style={styles.stickyContainer}>
          {/* Filters Row */}
          <View style={styles.filtersWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
              <View style={styles.filterGroup}>
                {['Date Range', 'Status', 'Compliance', 'Officer'].map((filter) => (
                  <Pressable key={filter} style={styles.filterDropdown}>
                    <Text style={styles.filterText}>{filter}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={16} color={Colors.textSecondary} />
                  </Pressable>
                ))}
                
                <Pressable style={styles.filterDropdown}>
                  <MaterialIcons name="tune" size={16} color={Colors.primary} style={{ marginRight: 4 }} />
                  <Text style={[styles.filterText, { color: Colors.primary, fontWeight: '600' }]}>More Filters</Text>
                </Pressable>
              </View>

              <View style={{ width: 24 }} />
              
              {/* Export Button */}
              <View style={{ position: 'relative' }}>
                <Pressable 
                  style={[styles.filterDropdown, { borderColor: Colors.borderLight, borderWidth: 1 }]}
                  onPress={() => setShowExportMenu(!showExportMenu)}
                >
                  <MaterialIcons name="file-download" size={16} color={Colors.textPrimary} style={{ marginRight: 4 }} />
                  <Text style={[styles.filterText, { color: Colors.textPrimary, fontWeight: '600' }]}>Export</Text>
                </Pressable>

                {showExportMenu && (
                  <View style={styles.exportMenu}>
                    <Pressable style={styles.exportMenuItem} onPress={() => handleExport('PDF')}>
                      <Text style={styles.exportMenuText}>Export as PDF</Text>
                    </Pressable>
                    <Pressable style={styles.exportMenuItem} onPress={() => handleExport('Excel')}>
                      <Text style={styles.exportMenuText}>Export as Excel</Text>
                    </Pressable>
                    <Pressable style={styles.exportMenuItem} onPress={() => handleExport('CSV')}>
                      <Text style={styles.exportMenuText}>Export as CSV</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <MaterialIcons name="search" size={20} color={Colors.textSecondary} />
              <TextInput 
                style={styles.searchInput}
                placeholder="Search inspections, company, product, officer..."
                placeholderTextColor={Colors.textTertiary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </View>

        {/* Data Table */}
        <View style={styles.tableWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.horizontalScroll}>
            <View>
              {/* Table Header */}
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableHeaderCell, { width: 130 }]}>Inspection ID</Text>
                <Text style={[styles.tableHeaderCell, { width: 100 }]}>Date</Text>
                <Text style={[styles.tableHeaderCell, { width: 150 }]}>Company</Text>
                <Text style={[styles.tableHeaderCell, { width: 150 }]}>Product</Text>
                <Text style={[styles.tableHeaderCell, { width: 100 }]}>Officer</Text>
                <Text style={[styles.tableHeaderCell, { width: 110 }]}>Status</Text>
                <Text style={[styles.tableHeaderCell, { width: 130 }]}>Compliance</Text>
                <Text style={[styles.tableHeaderCell, { width: 90 }]}>AI Review</Text>
              </View>

              {/* Table Body */}
              {filteredLogs.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No inspections found matching your criteria.</Text>
                </View>
              ) : (
                filteredLogs.map((log, index) => {
                  const statusStyle = getStatusBadgeStyle(log.status);
                  const complianceStyle = getComplianceBadgeStyle(log.complianceStatus);
                  const aiReviewColor = getAIReviewColor(log.aiReview);

                  return (
                    <View key={log.id} style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
                      <Text style={[styles.tableCell, { width: 130, fontWeight: '600', color: Colors.textSecondary }]}>{log.id}</Text>
                      <Text style={[styles.tableCell, { width: 100 }]}>{log.time}</Text>
                      <Text style={[styles.tableCell, { width: 150 }]} numberOfLines={1}>{log.companyName}</Text>
                      <Text style={[styles.tableCell, { width: 150 }]} numberOfLines={1}>{log.productName}</Text>
                      <Text style={[styles.tableCell, { width: 100 }]} numberOfLines={1}>{log.officerName}</Text>
                      
                      <View style={[styles.tableCell, { width: 110, justifyContent: 'center' }]}>
                        <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
                          <Text style={[styles.badgeText, { color: statusStyle.text }]}>{log.status}</Text>
                        </View>
                      </View>
                      
                      <View style={[styles.tableCell, { width: 130, justifyContent: 'center' }]}>
                        {log.complianceStatus ? (
                          <View style={[styles.badge, { backgroundColor: complianceStyle.bg }]}>
                            <Text style={[styles.badgeText, { color: complianceStyle.text }]}>{log.complianceStatus}</Text>
                          </View>
                        ) : (
                          <Text style={styles.tableCell}>-</Text>
                        )}
                      </View>
                      
                      <View style={[styles.tableCell, { width: 90, justifyContent: 'center' }]}>
                        {log.aiReview ? (
                          <Text style={[styles.tableCell, { color: aiReviewColor, fontWeight: '600' }]}>{log.aiReview}</Text>
                        ) : (
                          <Text style={styles.tableCell}>-</Text>
                        )}
                      </View>
                    </View>
                  );
                })
              )}
            </View>
          </ScrollView>
        </View>

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          <Text style={styles.paginationText}>Showing 1 to 10 of 2481 results</Text>
          <View style={styles.paginationControls}>
            <Pressable style={styles.pageButton}><MaterialIcons name="chevron-left" size={20} color={Colors.textSecondary} /></Pressable>
            <Pressable style={[styles.pageButton, styles.pageButtonActive]}><Text style={styles.pageButtonTextActive}>1</Text></Pressable>
            <Pressable style={styles.pageButton}><Text style={styles.pageButtonText}>2</Text></Pressable>
            <Pressable style={styles.pageButton}><Text style={styles.pageButtonText}>3</Text></Pressable>
            <Pressable style={styles.pageButton}><Text style={styles.pageButtonText}>...</Text></Pressable>
            <Pressable style={styles.pageButton}><Text style={styles.pageButtonText}>249</Text></Pressable>
            <Pressable style={styles.pageButton}><MaterialIcons name="chevron-right" size={20} color={Colors.textSecondary} /></Pressable>
          </View>
          <View style={styles.rowsPerPage}>
            <Text style={styles.paginationText}>10 / page</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color={Colors.textSecondary} />
          </View>
        </View>
        
        {/* Bottom spacer for tabs */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  headerContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    backgroundColor: '#FFFFFF',
  },
  stickyContainer: {
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  filtersWrapper: {
    paddingVertical: Spacing.sm,
  },
  filtersScrollContent: {
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginRight: 4,
  },
  exportMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    minWidth: 140,
    zIndex: 100,
  },
  exportMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  exportMenuText: {
    fontSize: 13,
    color: Colors.textPrimary,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  tableWrapper: {
    marginTop: Spacing.md,
  },
  horizontalScroll: {
    paddingHorizontal: Spacing.lg,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  tableRowEven: {
    backgroundColor: '#FFFFFF',
  },
  tableRowOdd: {
    backgroundColor: '#FAFAFA',
  },
  tableCell: {
    fontSize: 12,
    color: Colors.textPrimary,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    flexWrap: 'wrap',
    gap: 16,
  },
  paginationText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  pageButtonActive: {
    backgroundColor: Colors.primary,
  },
  pageButtonText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  pageButtonTextActive: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rowsPerPage: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  }
});
