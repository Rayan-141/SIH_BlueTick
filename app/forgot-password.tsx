import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors, Spacing, Radius } from '../src/theme';

const { width, height } = Dimensions.get('window');

// Custom Colors from Palette
const THEME_COLORS = {
  deepJungleGreen: '#0D4949',
  lightGreen: '#A4C24F', // Middle Green Yellow approx
  beige: '#F6F6E3',
  spanishOrange: '#DB611D',
};

type RecoveryMethod = 'sms' | 'email' | null;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [method, setMethod] = useState<RecoveryMethod>('sms');
  const [contactValue, setContactValue] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [obscureNew, setObscureNew] = useState(true);
  const [obscureRepeat, setObscureRepeat] = useState(true);

  // --- Step 1: Method Selection ---
  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Password Recovery</Text>
      <Text style={styles.subtitle}>How you would like to restore your password?</Text>

      <Pressable 
        style={[styles.methodCard, method === 'sms' && styles.methodCardActive]}
        onPress={() => setMethod('sms')}
      >
        <Text style={[styles.methodText, method === 'sms' && styles.methodTextActive]}>SMS</Text>
        <MaterialCommunityIcons 
          name={method === 'sms' ? "check-circle" : "circle-outline"} 
          size={24} 
          color={method === 'sms' ? THEME_COLORS.spanishOrange : Colors.textSecondary} 
        />
      </Pressable>

      <Pressable 
        style={[styles.methodCard, method === 'email' && styles.methodCardActive]}
        onPress={() => setMethod('email')}
      >
        <Text style={[styles.methodText, method === 'email' && styles.methodTextActive]}>Email</Text>
        <MaterialCommunityIcons 
          name={method === 'email' ? "check-circle" : "circle-outline"} 
          size={24} 
          color={method === 'email' ? THEME_COLORS.spanishOrange : Colors.textSecondary} 
        />
      </Pressable>

      <View style={styles.buttonGroup}>
        <Pressable style={styles.primaryBtn} onPress={() => setStep(2)}>
          <Text style={styles.primaryBtnText}>Next</Text>
        </Pressable>
        <Pressable style={styles.secondaryBtn} onPress={() => router.back()}>
          <Text style={styles.secondaryBtnText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );

  // --- Step 2: Details Entry ---
  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Password Recovery</Text>
      <Text style={styles.subtitle}>
        {method === 'sms' 
          ? 'Enter your phone number to receive a recovery code' 
          : 'Enter your email to receive a recovery code'}
      </Text>

      {method === 'sms' ? (
        <View style={styles.phoneInputContainer}>
          <View style={styles.flagContainer}>
            <Text style={styles.flagEmoji}>🇮🇳</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color={THEME_COLORS.deepJungleGreen} />
          </View>
          <View style={styles.phoneDivider} />
          <TextInput
            style={styles.phoneInput}
            placeholder="Your number"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="phone-pad"
            value={contactValue}
            onChangeText={setContactValue}
          />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            value={contactValue}
            onChangeText={setContactValue}
          />
        </View>
      )}

      <View style={styles.buttonGroup}>
        <Pressable 
          style={[styles.primaryBtn, !contactValue && styles.btnDisabled]} 
          onPress={() => contactValue && setStep(3)}
        >
          <Text style={styles.primaryBtnText}>Next</Text>
        </Pressable>
        <Pressable style={styles.secondaryBtn} onPress={() => setStep(1)}>
          <Text style={styles.secondaryBtnText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );

  // --- Step 3: OTP Verification ---
  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-verify if all 4 digits are filled (mock implementation)
    if (index === 3 && value && newOtp.every(d => d !== '')) {
        setTimeout(() => setStep(4), 300); // Small delay for UX
    }
  };

  const getMaskedContact = () => {
    if (!contactValue) return '';
    if (method === 'sms') {
      return `+91 ${contactValue.substring(0, 2)}******${contactValue.slice(-2)}`;
    }
    const [name, domain] = contactValue.split('@');
    if (!domain) return contactValue;
    return `${name.charAt(0)}***@${domain}`;
  };

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Password Recovery</Text>
      <Text style={styles.subtitle}>
        Enter 4-digits code we sent you on your {method === 'sms' ? 'phone number' : 'email'}
      </Text>
      <Text style={styles.maskedContact}>{getMaskedContact()}</Text>

      <View style={styles.otpContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[index]}
            onChangeText={(val) => handleOtpChange(val, index)}
          />
        ))}
      </View>

      <View style={styles.buttonGroup}>
        <Pressable style={styles.resendBtn}>
          <Text style={styles.resendBtnText}>Send Again</Text>
        </Pressable>
        <Pressable style={styles.secondaryBtn} onPress={() => setStep(2)}>
          <Text style={styles.secondaryBtnText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );

  // --- Step 4: Setup New Password ---
  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Setup New Password</Text>
      <Text style={styles.subtitle}>Please, setup a new password for your account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor={Colors.textSecondary}
          secureTextEntry={obscureNew}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <MaterialIcons
          name={obscureNew ? "visibility-off" : "visibility"}
          size={20}
          color={THEME_COLORS.deepJungleGreen}
          style={styles.inputIconRight}
          onPress={() => setObscureNew(!obscureNew)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Repeat Password"
          placeholderTextColor={Colors.textSecondary}
          secureTextEntry={obscureRepeat}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
        />
        <MaterialIcons
          name={obscureRepeat ? "visibility-off" : "visibility"}
          size={20}
          color={THEME_COLORS.deepJungleGreen}
          style={styles.inputIconRight}
          onPress={() => setObscureRepeat(!obscureRepeat)}
        />
      </View>

      <View style={styles.buttonGroup}>
        <Pressable 
          style={[styles.primaryBtn, (!newPassword || newPassword !== repeatPassword) && styles.btnDisabled]} 
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.primaryBtnText}>Save</Text>
        </Pressable>
        <Pressable style={styles.secondaryBtn} onPress={() => router.replace('/login')}>
          <Text style={styles.secondaryBtnText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Precision SVG Background Waves (reused from Login) */}
      <View style={styles.svgBackground}>
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <Path 
            d={`M0,0 L${width},0 L${width},${height * 0.35} C${width * 0.8},${height * 0.55} ${width * 0.2},${height * 0.25} 0,${height * 0.45} Z`}
            fill={THEME_COLORS.lightGreen}
          />
          <Path 
            d={`M0,0 L${width * 0.75},0 C${width * 0.7},${height * 0.2} ${width * 0.35},${height * 0.15} ${width * 0.25},${height * 0.3} C${width * 0.15},${height * 0.45} 0,${height * 0.4} 0,${height * 0.4} Z`}
            fill={THEME_COLORS.deepJungleGreen}
          />
          <Circle cx={width * 1.1} cy={height * 0.65} r={width * 0.4} fill={`${THEME_COLORS.lightGreen}30`} />
          <Circle cx={width * 0.4} cy={height * 1.1} r={width * 0.5} fill={`${THEME_COLORS.lightGreen}30`} />
          <Circle cx={width} cy={height} r={width * 0.25} fill={THEME_COLORS.spanishOrange} />
        </Svg>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Custom CSS Logo replacing the Man Image */}
        <View style={styles.logoSection}>
          <View style={styles.logoIconContainer}>
            <View style={styles.cShape} />
            <View style={styles.boxIconWrapper}>
              <MaterialCommunityIcons name="package-variant-closed" size={36} color={THEME_COLORS.deepJungleGreen} />
            </View>
            <View style={styles.checkIconWrapper}>
              <MaterialCommunityIcons name="check-bold" size={24} color={THEME_COLORS.deepJungleGreen} />
            </View>
          </View>
        </View>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: THEME_COLORS.beige,
    position: 'relative',
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: { 
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: height * 0.18, 
    paddingBottom: Spacing.xxl,
  },
  
  // --- Logo ---
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoIconContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: THEME_COLORS.beige,
    borderRadius: 45,
    // Add subtle shadow to mimic the avatar boundary from the mockup
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cShape: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 12,
    borderColor: THEME_COLORS.deepJungleGreen,
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
  },
  boxIconWrapper: {
    position: 'absolute',
    transform: [{ translateX: -4 }, { translateY: 2 }],
  },
  checkIconWrapper: {
    position: 'absolute',
    transform: [{ translateX: 14 }, { translateY: -8 }],
    backgroundColor: THEME_COLORS.beige,
    borderRadius: 12,
    padding: -1,
  },

  // --- Step Container ---
  stepContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: THEME_COLORS.deepJungleGreen,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl * 1.5,
    paddingHorizontal: 16,
    lineHeight: 22,
  },

  // --- Methods (Step 1) ---
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: Radius.lg,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodCardActive: {
    backgroundColor: `${THEME_COLORS.lightGreen}15`,
    borderColor: THEME_COLORS.lightGreen,
  },
  methodText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  methodTextActive: {
    color: THEME_COLORS.deepJungleGreen,
  },

  // --- Inputs (Step 2 & 4) ---
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: Radius.lg,
    paddingHorizontal: 16,
    height: 60,
    width: '100%',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: THEME_COLORS.deepJungleGreen,
    fontWeight: '500',
  },
  inputIconRight: {
    padding: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: Radius.lg,
    height: 60,
    width: '100%',
    marginBottom: 16,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  flagEmoji: {
    fontSize: 24,
    marginRight: 4,
  },
  phoneDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: THEME_COLORS.deepJungleGreen,
    fontWeight: '500',
  },

  // --- OTP (Step 3) ---
  maskedContact: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME_COLORS.deepJungleGreen,
    marginBottom: Spacing.xl,
    letterSpacing: 1,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: Spacing.xxl,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: THEME_COLORS.deepJungleGreen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resendBtn: {
    backgroundColor: THEME_COLORS.spanishOrange,
    height: 56,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  resendBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // --- Buttons ---
  buttonGroup: {
    width: '100%',
    marginTop: Spacing.lg,
  },
  primaryBtn: {
    backgroundColor: THEME_COLORS.deepJungleGreen,
    height: 56,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryBtn: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  secondaryBtnText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
});
