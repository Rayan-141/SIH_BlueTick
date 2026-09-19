import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle, G } from 'react-native-svg';
import { Colors, Typography, Spacing, Radius } from '../../src/theme';

const DonutChart = () => {
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Percentages
  const greenPct = 0.70;
  const orangePct = 0.15;
  const greyPct = 0.15;
  
  // Gap calculation
  const gap = 8; // length of gap in pixels
  
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center', marginVertical: Spacing.lg }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation="-90" origin={`${size/2}, ${size/2}`}>
          
          {/* Grey Segment */}
          <Circle 
            cx={size/2} cy={size/2} r={radius} 
            stroke="#C0CBCB" 
            strokeWidth={strokeWidth} 
            fill="transparent"
            strokeDasharray={`${circumference * greyPct - gap} ${circumference}`}
            strokeDashoffset={-circumference * (greenPct + orangePct)}
            strokeLinecap="round" 
          />
          
          {/* Orange Segment */}
          <Circle 
            cx={size/2} cy={size/2} r={radius} 
            stroke="#F39C12" 
            strokeWidth={strokeWidth} 
            fill="transparent"
            strokeDasharray={`${circumference * orangePct - gap} ${circumference}`}
            strokeDashoffset={-circumference * greenPct}
            strokeLinecap="round" 
          />

          {/* Green Segment */}
          <Circle 
            cx={size/2} cy={size/2} r={radius} 
            stroke={Colors.primary} 
            strokeWidth={strokeWidth} 
            fill="transparent"
            strokeDasharray={`${circumference * greenPct - gap} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round" 
          />
        </G>
      </Svg>
      <View style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 44, fontWeight: '800', color: Colors.primary }}>
          92<Text style={{ fontSize: 24, fontWeight: '700' }}>%</Text>
        </Text>
        <Text style={[Typography.labelLarge, { color: Colors.primary, marginTop: -4, fontWeight: '600' }]}>
          Compliant
        </Text>
      </View>
    </View>
  );
};

export default function InspectionResultScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.headerIcon} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color={Colors.textPrimary} />
        </Pressable>
        <Text style={[Typography.titleMedium, { fontWeight: '700', fontSize: 18 }]}>Inspection Result</Text>
        <View style={{ width: 44 }} /> {/* Spacer */}
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Main Card */}
        <View style={styles.resultCard}>
          {/* Top Section */}
          <View style={styles.cardTop}>
            <DonutChart />
            <Text style={[Typography.bodyLarge, styles.summaryText]}>
              Great! This label meets most{'\n'}compliance requirements.
            </Text>
          </View>

          {/* Bottom Section (Stats) */}
          <View style={styles.cardBottom}>
            {/* Row 1 */}
            <View style={styles.statRow}>
              <View style={[styles.iconBox, { backgroundColor: Colors.primary }]}>
                <MaterialIcons name="check" size={20} color={Colors.textInverse} />
              </View>
              <View style={styles.statTextContainer}>
                <Text style={[Typography.titleMedium, { color: Colors.primary, fontWeight: '700' }]}>126</Text>
                <Text style={[Typography.labelSmall, { color: Colors.textSecondary, fontWeight: '500' }]}>Requirements Passed</Text>
              </View>
            </View>
            <View style={styles.divider} />

            {/* Row 2 */}
            <View style={styles.statRow}>
              <View style={[styles.iconBox, { backgroundColor: '#F39C12' }]}>
                <MaterialIcons name="warning-amber" size={20} color={Colors.textInverse} />
              </View>
              <View style={styles.statTextContainer}>
                <Text style={[Typography.titleMedium, { color: '#F39C12', fontWeight: '700' }]}>8</Text>
                <Text style={[Typography.labelSmall, { color: Colors.textSecondary, fontWeight: '500' }]}>Needs Attention</Text>
              </View>
            </View>
            <View style={styles.divider} />

            {/* Row 3 */}
            <View style={styles.statRow}>
              <View style={[styles.iconBox, { backgroundColor: '#FDB617' }]}>
                <MaterialIcons name="schedule" size={20} color={Colors.textInverse} />
              </View>
              <View style={styles.statTextContainer}>
                <Text style={[Typography.titleMedium, { color: Colors.textPrimary, fontWeight: '700' }]}>24</Text>
                <Text style={[Typography.labelSmall, { color: Colors.textSecondary, fontWeight: '500' }]}>In Progress</Text>
              </View>
            </View>
            <View style={styles.divider} />

            {/* Row 4 */}
            <View style={styles.statRow}>
              <View style={[styles.iconBox, { backgroundColor: '#C0CBCB' }]}>
                <MaterialIcons name="remove" size={20} color={Colors.textInverse} />
              </View>
              <View style={styles.statTextContainer}>
                <Text style={[Typography.titleMedium, { color: Colors.textPrimary, fontWeight: '700' }]}>4</Text>
                <Text style={[Typography.labelSmall, { color: Colors.textSecondary, fontWeight: '500' }]}>Not Applicable</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable style={styles.primaryButton}>
          <Text style={[Typography.button, { color: Colors.textInverse }]}>View Full Report</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton}>
          <MaterialIcons name="share" size={20} color={Colors.primary} style={{ marginRight: 8 }} />
          <Text style={[Typography.button, { color: Colors.primary }]}>Share Report</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  headerIcon: {
    padding: 8,
  },
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 12 },
  resultCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    marginBottom: Spacing.xl,
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  cardTop: {
    backgroundColor: '#EDF4F3',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  cardBottom: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: Spacing.xl,
    paddingVertical: 16,
  },
  summaryText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 24,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statTextContainer: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 4,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: Spacing.md,
  },
  secondaryButton: {
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
});
