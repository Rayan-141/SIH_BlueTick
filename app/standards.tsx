import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../src/theme';
import { STANDARD_GUIDES } from '../src/data/standards';

export default function StandardsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={[Typography.titleMedium, { fontWeight: '600' }]}>Standards</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>Review the rules CheckMate uses to capture, read, analyse, rate and verify product labels.</Text>
        {STANDARD_GUIDES.map((standard) => (
          <View key={standard.id} style={styles.standardCard}>
            <View style={styles.cardHeading}>
              <View style={styles.iconCircle}>
                <MaterialIcons name={standard.icon} size={24} color={Colors.primary} />
              </View>
              <View style={styles.headingCopy}>
                <Text style={styles.standardTitle}>{standard.title}</Text>
                <Text style={styles.reference}>{standard.reference}</Text>
              </View>
            </View>
            <Text style={styles.summary}>{standard.summary}</Text>
            {standard.checks.map((check) => (
              <View key={check} style={styles.checkRow}>
                <MaterialIcons name="check" size={17} color={Colors.primary} />
                <Text style={styles.checkText}>{check}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  iconButton: { padding: 8 },
  content: { padding: Spacing.lg, paddingBottom: 40 },
  intro: { color: Colors.textSecondary, fontSize: 15, lineHeight: 22, marginBottom: Spacing.md },
  standardCard: { backgroundColor: Colors.surface, borderColor: Colors.borderLight, borderRadius: 14, borderWidth: 1, marginBottom: Spacing.md, padding: Spacing.md },
  cardHeading: { alignItems: 'center', flexDirection: 'row' },
  iconCircle: { alignItems: 'center', backgroundColor: Colors.successLight, borderRadius: 22, height: 44, justifyContent: 'center', width: 44 },
  headingCopy: { flex: 1, marginLeft: Spacing.md },
  standardTitle: { color: Colors.textPrimary, fontSize: 17, fontWeight: '700' },
  reference: { color: Colors.primary, fontSize: 12, fontWeight: '600', marginTop: 3 },
  summary: { color: Colors.textSecondary, fontSize: 14, lineHeight: 20, marginTop: Spacing.md },
  checkRow: { alignItems: 'center', flexDirection: 'row', marginTop: 10 },
  checkText: { color: Colors.textPrimary, fontSize: 14, marginLeft: 8 },
});
