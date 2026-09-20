import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../theme';
import { STANDARD_GUIDES } from '../data/standards';

interface StandardsOverviewProps {
  onViewAll: () => void;
}

export const StandardsOverview: React.FC<StandardsOverviewProps> = ({ onViewAll }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>STANDARDS</Text>
        <Pressable accessibilityRole="button" onPress={onViewAll} style={styles.viewAll}>
          <Text style={styles.viewAllText}>View all</Text>
          <MaterialIcons name="arrow-forward" size={18} color={Colors.primary} />
        </Pressable>
      </View>
      <Text style={styles.subtitle}>Rules used by CheckMate during scanning, analysis and compliance review.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cards}>
        {STANDARD_GUIDES.slice(0, 4).map((standard) => (
          <View key={standard.id} style={styles.card}>
            <MaterialIcons name={standard.icon} size={26} color={Colors.primary} />
            <Text style={styles.cardTitle}>{standard.title}</Text>
            <Text style={styles.cardSummary} numberOfLines={3}>{standard.summary}</Text>
            <Text style={styles.reference}>{standard.reference}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: Spacing.md },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.lg },
  heading: { color: Colors.textSecondary, fontSize: 14, fontWeight: '700', letterSpacing: 1 },
  viewAll: { alignItems: 'center', flexDirection: 'row', gap: 4 },
  viewAllText: { color: Colors.primary, fontSize: 14, fontWeight: '600' },
  subtitle: { color: Colors.textSecondary, fontSize: 14, lineHeight: 20, marginTop: 8, paddingHorizontal: Spacing.lg },
  cards: { gap: Spacing.sm, paddingHorizontal: Spacing.lg, paddingTop: Spacing.md },
  card: { backgroundColor: Colors.surface, borderColor: Colors.borderLight, borderRadius: 12, borderWidth: 1, minHeight: 164, padding: Spacing.md, width: 185 },
  cardTitle: { color: Colors.textPrimary, fontSize: 15, fontWeight: '700', lineHeight: 20, marginTop: 10 },
  cardSummary: { color: Colors.textSecondary, fontSize: 12, lineHeight: 17, marginTop: 6 },
  reference: { color: Colors.primary, fontSize: 11, fontWeight: '600', marginTop: 10 },
});
