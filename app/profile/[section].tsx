import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../src/theme';
import { LANGUAGES, Language, usePreferencesStore } from '../../src/store/preferencesStore';

const sectionTitles: Record<string, string> = {
  personal: 'Personal Information',
  preferences: 'Preferences',
  password: 'Change Password',
  notifications: 'Notification Settings',
  language: 'Language',
};

function Header({ title }: { title: string }) {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <Pressable accessibilityLabel="Go back" hitSlop={10} onPress={() => router.back()} style={styles.iconButton}>
        <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

function Field({ label, value, secureTextEntry = false, onChangeText, keyboardType }: {
  label: string;
  value: string;
  secureTextEntry?: boolean;
  onChangeText?: (value: string) => void;
  keyboardType?: 'default' | 'email-address';
}) {
  const [hidden, setHidden] = useState(secureTextEntry);
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          autoCapitalize="none"
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          style={styles.input}
          value={value}
        />
        {secureTextEntry && (
          <Pressable accessibilityLabel={hidden ? `Show ${label}` : `Hide ${label}`} onPress={() => setHidden(!hidden)} style={styles.inputIcon}>
            <MaterialIcons name={hidden ? 'visibility-off' : 'visibility'} size={21} color={Colors.textSecondary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

function ToggleRow({ icon, title, description, value, onValueChange }: {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <MaterialIcons name={icon} size={23} color={Colors.primary} />
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDescription}>{description}</Text>
      </View>
      <Switch
        accessibilityLabel={title}
        onValueChange={onValueChange}
        thumbColor={value ? Colors.surface : Colors.textTertiary}
        trackColor={{ false: Colors.border, true: Colors.primaryLight }}
        value={value}
      />
    </View>
  );
}

export default function ProfileSectionScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const router = useRouter();
  const title = sectionTitles[section] || 'Profile';
  const preferences = usePreferencesStore();

  const [name, setName] = useState('Aarav Verma');
  const [email, setEmail] = useState('aarav.verma@bis.gov.in');
  const [password] = useState('CheckMate@2024');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const renderContent = () => {
    switch (section) {
      case 'personal':
        return (
          <View>
            <View style={styles.avatarLarge}><Text style={styles.avatarText}>A</Text></View>
            <Field label="Full Name" value={name} onChangeText={setName} />
            <Field label="Email Address" value={email} keyboardType="email-address" onChangeText={setEmail} />
            <Field label="Password" value={password} secureTextEntry />
            <Field label="Role" value="Inspector" />
            <Field label="Inspector ID" value="INSP-2024-1256" />
            <Pressable style={styles.primaryButton} onPress={() => router.back()}><Text style={styles.primaryButtonText}>Save Changes</Text></Pressable>
          </View>
        );
      case 'preferences':
        return (
          <View style={styles.panel}>
            <ToggleRow icon="vibration" title="Haptic feedback" description="Use vibration for important actions" value={true} onValueChange={() => undefined} />
            <ToggleRow icon="save" title="Auto-save inspection drafts" description="Keep unfinished inspections available" value={true} onValueChange={() => undefined} />
            <ToggleRow icon="dark-mode" title="Use device theme" description="Follow your phone's light or dark mode" value={false} onValueChange={() => undefined} />
          </View>
        );
      case 'password':
        return (
          <View>
            <Text style={styles.helper}>Choose a strong password with at least 8 characters.</Text>
            <Field label="Old Password" value={oldPassword} secureTextEntry onChangeText={setOldPassword} />
            <Field label="New Password" value={newPassword} secureTextEntry onChangeText={setNewPassword} />
            <Field label="Confirm New Password" value={confirmPassword} secureTextEntry onChangeText={setConfirmPassword} />
            <Pressable disabled={!oldPassword || !newPassword || newPassword !== confirmPassword} style={[styles.primaryButton, (!oldPassword || !newPassword || newPassword !== confirmPassword) && styles.disabledButton]}>
              <Text style={styles.primaryButtonText}>Update Password</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/forgot-password')} style={styles.linkButton}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </Pressable>
          </View>
        );
      case 'notifications':
        return (
          <View style={styles.panel}>
            <Text style={styles.sectionIntro}>Choose which CheckMate updates you want to receive.</Text>
            <ToggleRow icon="fact-check" title="Inspection alerts" description="Status changes and assigned inspections" value={preferences.inspectionAlerts} onValueChange={(value) => preferences.setNotification('inspectionAlerts', value)} />
            <ToggleRow icon="assessment" title="Report updates" description="When reports are ready to view or download" value={preferences.reportAlerts} onValueChange={(value) => preferences.setNotification('reportAlerts', value)} />
            <ToggleRow icon="security" title="System and compliance alerts" description="Important safety and compliance notices" value={preferences.systemAlerts} onValueChange={(value) => preferences.setNotification('systemAlerts', value)} />
            <ToggleRow icon="email" title="Email notifications" description="Send selected alerts to your email" value={preferences.emailNotifications} onValueChange={(value) => preferences.setNotification('emailNotifications', value)} />
          </View>
        );
      case 'language':
        return (
          <View style={styles.panel}>
            <Text style={styles.sectionIntro}>Select your preferred language for CheckMate.</Text>
            {LANGUAGES.map((language) => (
              <Pressable key={language} onPress={() => preferences.setLanguage(language as Language)} style={styles.languageRow}>
                <Text style={styles.languageName}>{language}</Text>
                <MaterialIcons name={preferences.language === language ? 'radio-button-checked' : 'radio-button-unchecked'} size={24} color={preferences.language === language ? Colors.primary : Colors.textTertiary} />
              </Pressable>
            ))}
            <Text style={styles.languageNote}>Your selection is applied across the app wherever translations are available.</Text>
          </View>
        );
      default:
        return <Text style={styles.helper}>This profile section is not available.</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={title} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, backgroundColor: Colors.surface },
  iconButton: { padding: 8 },
  headerTitle: { ...Typography.titleMedium, flex: 1, textAlign: 'center', fontWeight: '600' },
  headerSpacer: { width: 40 },
  content: { padding: Spacing.lg, paddingBottom: 48 },
  avatarLarge: { alignSelf: 'center', alignItems: 'center', backgroundColor: Colors.primary, borderRadius: 44, height: 88, justifyContent: 'center', marginBottom: Spacing.xl, width: 88 },
  avatarText: { color: Colors.textInverse, fontSize: 38, fontWeight: '700' },
  fieldGroup: { marginBottom: Spacing.md },
  fieldLabel: { color: Colors.textSecondary, fontSize: 13, fontWeight: '600', marginBottom: 7 },
  inputWrap: { alignItems: 'center', backgroundColor: Colors.surface, borderColor: Colors.border, borderRadius: 10, borderWidth: 1, flexDirection: 'row' },
  input: { color: Colors.textPrimary, flex: 1, fontSize: 16, minHeight: 50, paddingHorizontal: 14 },
  inputIcon: { padding: 12 },
  primaryButton: { alignItems: 'center', backgroundColor: Colors.primary, borderRadius: 10, marginTop: Spacing.md, minHeight: 50, justifyContent: 'center' },
  primaryButtonText: { color: Colors.textInverse, fontSize: 15, fontWeight: '700' },
  disabledButton: { backgroundColor: Colors.textDisabled },
  linkButton: { alignItems: 'center', padding: Spacing.lg },
  linkText: { color: Colors.primary, fontSize: 15, fontWeight: '600' },
  helper: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21, marginBottom: Spacing.lg },
  panel: { backgroundColor: Colors.surface, borderRadius: 12, paddingHorizontal: Spacing.md },
  sectionIntro: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21, paddingBottom: Spacing.sm, paddingTop: Spacing.md },
  toggleRow: { alignItems: 'center', borderBottomColor: Colors.borderLight, borderBottomWidth: 1, flexDirection: 'row', minHeight: 78, paddingVertical: Spacing.sm },
  rowCopy: { flex: 1, paddingHorizontal: Spacing.md },
  rowTitle: { color: Colors.textPrimary, fontSize: 15, fontWeight: '600' },
  rowDescription: { color: Colors.textSecondary, fontSize: 12, lineHeight: 17, marginTop: 3 },
  languageRow: { alignItems: 'center', borderBottomColor: Colors.borderLight, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', minHeight: 54 },
  languageName: { color: Colors.textPrimary, fontSize: 16 },
  languageNote: { color: Colors.textTertiary, fontSize: 12, lineHeight: 18, paddingVertical: Spacing.md },
});
