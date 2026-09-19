import { create } from 'zustand';

export const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati',
  'Kannada', 'Malayalam', 'Odia', 'Punjabi', 'Assamese', 'Urdu',
] as const;

export type Language = typeof LANGUAGES[number];

export const NAV_TRANSLATIONS: Record<Language, { home: string; dashboard: string; inspections: string; profile: string }> = {
  English: { home: 'Home', dashboard: 'Dashboard', inspections: 'Inspections', profile: 'Profile' },
  Hindi: { home: 'होम', dashboard: 'डैशबोर्ड', inspections: 'निरीक्षण', profile: 'प्रोफ़ाइल' },
  Bengali: { home: 'হোম', dashboard: 'ড্যাশবোর্ড', inspections: 'পরিদর্শন', profile: 'প্রোফাইল' },
  Telugu: { home: 'హోమ్', dashboard: 'డాష్‌బోర్డ్', inspections: 'తనిఖీలు', profile: 'ప్రొఫైల్' },
  Marathi: { home: 'मुख्यपृष्ठ', dashboard: 'डॅशबोर्ड', inspections: 'तपासणी', profile: 'प्रोफाइल' },
  Tamil: { home: 'முகப்பு', dashboard: 'டாஷ்போர்டு', inspections: 'ஆய்வுகள்', profile: 'சுயவிவரம்' },
  Gujarati: { home: 'હોમ', dashboard: 'ડેશબોર્ડ', inspections: 'તપાસણી', profile: 'પ્રોફાઇલ' },
  Kannada: { home: 'ಮುಖಪುಟ', dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', inspections: 'ತಪಾಸಣೆಗಳು', profile: 'ಪ್ರೊಫೈಲ್' },
  Malayalam: { home: 'ഹോം', dashboard: 'ഡാഷ്ബോർഡ്', inspections: 'പരിശോധനകൾ', profile: 'പ്രൊഫൈൽ' },
  Odia: { home: 'ହୋମ୍', dashboard: 'ଡ୍ୟାସବୋର୍ଡ', inspections: 'ଯାଞ୍ଚ', profile: 'ପ୍ରୋଫାଇଲ୍' },
  Punjabi: { home: 'ਹੋਮ', dashboard: 'ਡੈਸ਼ਬੋਰਡ', inspections: 'ਜਾਂਚਾਂ', profile: 'ਪ੍ਰੋਫ਼ਾਈਲ' },
  Assamese: { home: 'হোম', dashboard: 'ডেশ্বব’ৰ্ড', inspections: 'পৰিদৰ্শন', profile: 'প্ৰফাইল' },
  Urdu: { home: 'ہوم', dashboard: 'ڈیش بورڈ', inspections: 'معائنہ', profile: 'پروفائل' },
};

interface PreferencesState {
  language: Language;
  inspectionAlerts: boolean;
  reportAlerts: boolean;
  systemAlerts: boolean;
  emailNotifications: boolean;
  setLanguage: (language: Language) => void;
  setNotification: (key: 'inspectionAlerts' | 'reportAlerts' | 'systemAlerts' | 'emailNotifications', value: boolean) => void;
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
  language: 'English',
  inspectionAlerts: true,
  reportAlerts: true,
  systemAlerts: true,
  emailNotifications: false,
  setLanguage: (language) => set({ language }),
  setNotification: (key, value) => set({ [key]: value } as Pick<PreferencesState, typeof key>),
}));