import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '../src/theme';
import { useAuthStore } from '../src/store/authStore';

const { width, height } = Dimensions.get('window');

// Custom Colors from Palette
const LOGIN_COLORS = {
  deepJungleGreen: '#0D4949',
  lightGreen: '#A4C24F', // Middle Green Yellow approx
  beige: '#F6F6E3',
  spanishOrange: '#DB611D',
};

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [obscurePassword, setObscurePassword] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) return;
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Blobs */}
      <View style={[styles.blob, styles.lightBlobTop]} />
      <View style={[styles.blob, styles.darkBlobTop]} />
      <View style={[styles.blob, styles.darkBlobRight]} />
      <View style={[styles.blob, styles.lightBlobBottom]} />

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Good to see you back! ❤️</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="mail" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={Colors.textTertiary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.textTertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={obscurePassword}
            />
            <MaterialIcons
              name={obscurePassword ? "visibility-off" : "visibility"}
              size={20}
              color={Colors.textSecondary}
              style={styles.inputIconRight}
              onPress={() => setObscurePassword(!obscurePassword)}
            />
          </View>

          <Pressable>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </Pressable>

          <Pressable 
            style={[styles.loginBtn, isLoading && { opacity: 0.7 }]} 
            onPress={isLoading ? undefined : handleLogin}
          >
            <Text style={styles.loginBtnText}>{isLoading ? 'Signing In...' : 'Sign In'}</Text>
          </Pressable>

          <Pressable style={styles.guestBtn} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.guestBtnText}>Continue as Guest</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  
  // --- Background Blobs ---
  blob: {
    position: 'absolute',
  },
  lightBlobTop: {
    top: -100,
    left: -100,
    width: width * 1.3,
    height: 550,
    backgroundColor: `${LOGIN_COLORS.lightGreen}40`, // 25% opacity light green
    borderBottomRightRadius: 350,
    borderBottomLeftRadius: 100,
  },
  darkBlobTop: {
    top: -100,
    left: -100,
    width: width * 1.0,
    height: 500,
    backgroundColor: LOGIN_COLORS.deepJungleGreen,
    borderBottomRightRadius: 300,
  },
  darkBlobRight: {
    top: height * 0.45,
    right: -50,
    width: 120,
    height: 200,
    backgroundColor: LOGIN_COLORS.deepJungleGreen,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  lightBlobBottom: {
    bottom: -150,
    right: -100,
    width: width,
    height: 400,
    backgroundColor: `${LOGIN_COLORS.lightGreen}20`,
    borderTopLeftRadius: 300,
  },
  
  // --- Foreground Content ---
  content: { 
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: height * 0.5, // Pushes content exactly halfway down the screen like the blue mockup
    paddingBottom: Spacing.xxl,
  },
  header: { 
    marginBottom: Spacing.xl,
  },
  title: { 
    fontSize: 48,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: { 
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  form: {
    marginTop: Spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1, 
    borderColor: '#E0E0E0',
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: { 
    marginRight: 12 
  },
  inputIconRight: { 
    marginLeft: 12,
    padding: 4,
  },
  input: { 
    flex: 1, 
    height: '100%',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  forgotPassword: { 
    alignSelf: 'flex-end', 
    color: LOGIN_COLORS.spanishOrange, 
    fontWeight: '600',
    marginTop: 4,
    marginBottom: Spacing.xl, 
  },
  loginBtn: { 
    backgroundColor: LOGIN_COLORS.deepJungleGreen,
    height: 56,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  guestBtn: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestBtnText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
});
