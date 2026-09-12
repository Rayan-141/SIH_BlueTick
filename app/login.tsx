import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Dimensions, Image } from 'react-native';
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
      <View style={[styles.blob, styles.lightBlobBottom]} />
      <View style={[styles.blob, styles.orangeBlobBottom]} />

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image 
            source={require('../assets/CheckMate Logo.png')} 
            style={styles.logoImage} 
            resizeMode="contain" 
          />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Good to see you back! ❤️</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="mail" size={20} color={LOGIN_COLORS.deepJungleGreen} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={Colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={20} color={LOGIN_COLORS.deepJungleGreen} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={obscurePassword}
            />
            <MaterialIcons
              name={obscurePassword ? "visibility-off" : "visibility"}
              size={20}
              color={LOGIN_COLORS.deepJungleGreen}
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
    backgroundColor: LOGIN_COLORS.beige,
    position: 'relative',
  },
  
  // --- Background Blobs ---
  blob: {
    position: 'absolute',
  },
  lightBlobTop: {
    top: -100,
    left: -50,
    width: width * 1.5,
    height: 550,
    backgroundColor: LOGIN_COLORS.lightGreen, 
    borderBottomRightRadius: 400,
    borderBottomLeftRadius: 100,
    opacity: 0.9,
  },
  darkBlobTop: {
    top: -150,
    left: -100,
    width: width * 1.2,
    height: 600,
    backgroundColor: LOGIN_COLORS.deepJungleGreen,
    borderBottomRightRadius: 450,
    borderBottomLeftRadius: 200,
  },
  lightBlobBottom: {
    bottom: -150,
    right: -100,
    width: width,
    height: 400,
    backgroundColor: `${LOGIN_COLORS.lightGreen}30`,
    borderTopLeftRadius: 300,
  },
  orangeBlobBottom: {
    bottom: -50,
    right: -50,
    width: 150,
    height: 150,
    backgroundColor: LOGIN_COLORS.spanishOrange,
    borderRadius: 75,
  },
  
  // --- Foreground Content ---
  content: { 
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: height * 0.35, // Pushed down to avoid covering the logo in the dark green blob
    paddingBottom: Spacing.xxl,
  },
  
  // --- Logo Section ---
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  logoImage: {
    width: 250,
    height: 250,
    // Add multiply blend mode to remove white background on web rendering
    //@ts-ignore
    mixBlendMode: 'multiply',
    marginBottom: -20, // Negative margin to bring the "Login" text closer since the image contains whitespace
  },

  header: { 
    marginBottom: Spacing.lg,
  },
  title: { 
    fontSize: 48,
    fontWeight: '800',
    color: LOGIN_COLORS.deepJungleGreen,
    marginBottom: 8,
  },
  subtitle: { 
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  form: {
    marginTop: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1.5, 
    borderColor: LOGIN_COLORS.deepJungleGreen,
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
    color: LOGIN_COLORS.deepJungleGreen,
    fontWeight: '500',
  },
  forgotPassword: { 
    alignSelf: 'flex-end', 
    color: LOGIN_COLORS.spanishOrange, 
    fontWeight: '700',
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
    fontWeight: '700',
  },
  guestBtn: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestBtnText: {
    color: LOGIN_COLORS.deepJungleGreen,
    fontSize: 16,
    fontWeight: '600',
  },
});
