import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';
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
      {/* Precision SVG Background Waves */}
      <View style={styles.svgBackground}>
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Light Green Wave (Background) */}
          <Path 
            d={`M0,0 L${width},0 L${width},${height * 0.35} C${width * 0.8},${height * 0.55} ${width * 0.2},${height * 0.25} 0,${height * 0.45} Z`}
            fill={LOGIN_COLORS.lightGreen}
          />
          {/* Dark Green Wave (Foreground) */}
          <Path 
            d={`M0,0 L${width * 0.75},0 C${width * 0.7},${height * 0.2} ${width * 0.35},${height * 0.15} ${width * 0.25},${height * 0.3} C${width * 0.15},${height * 0.45} 0,${height * 0.4} 0,${height * 0.4} Z`}
            fill={LOGIN_COLORS.deepJungleGreen}
          />
          {/* Bottom Right Light Green Blob */}
          <Circle 
            cx={width * 1.1} 
            cy={height * 0.65} 
            r={width * 0.4} 
            fill={`${LOGIN_COLORS.lightGreen}30`} 
          />
          <Circle 
            cx={width * 0.4} 
            cy={height * 1.1} 
            r={width * 0.5} 
            fill={`${LOGIN_COLORS.lightGreen}30`} 
          />
          {/* Bottom Right Orange Circle */}
          <Circle 
            cx={width} 
            cy={height} 
            r={width * 0.25} 
            fill={LOGIN_COLORS.spanishOrange} 
          />
        </Svg>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Precision CSS Logo to eliminate the white PNG background issue */}
        <View style={styles.logoSection}>
          <View style={styles.logoIconContainer}>
            {/* The 'C' Shape */}
            <View style={styles.cShape} />
            {/* Box Icon inside */}
            <View style={styles.boxIconWrapper}>
              <MaterialCommunityIcons name="package-variant-closed" size={54} color={LOGIN_COLORS.deepJungleGreen} />
            </View>
            {/* Checkmark overlapping */}
            <View style={styles.checkIconWrapper}>
              <MaterialCommunityIcons name="check-bold" size={40} color={LOGIN_COLORS.deepJungleGreen} />
            </View>
          </View>
          <Text style={styles.brandName}>CheckMate</Text>
          <Text style={styles.brandSubtitle}>AI-Powered Product Compliance & Inspection</Text>
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

          <Pressable onPress={() => router.push('/forgot-password')}>
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
  
  // --- Background SVG ---
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  // --- Foreground Content ---
  content: { 
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: height * 0.22, // Adjusted so logo overlaps perfectly with the SVG waves
    paddingBottom: Spacing.xxl,
  },
  
  // --- Logo Section ---
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  logoIconContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    position: 'relative',
  },
  cShape: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 22,
    borderColor: LOGIN_COLORS.deepJungleGreen,
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
  },
  boxIconWrapper: {
    position: 'absolute',
    transform: [{ translateX: -8 }, { translateY: 2 }], // Adjust box position within C
  },
  checkIconWrapper: {
    position: 'absolute',
    transform: [{ translateX: 28 }, { translateY: -15 }], // Overlap the checkmark
    backgroundColor: LOGIN_COLORS.beige,
    borderRadius: 20,
    padding: -2,
  },
  brandName: {
    fontSize: 42,
    fontWeight: '900',
    color: LOGIN_COLORS.deepJungleGreen,
    letterSpacing: -1,
  },
  brandSubtitle: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
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
