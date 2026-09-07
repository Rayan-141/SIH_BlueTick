import React from 'react';
import { Tabs } from 'expo-router';
import { BottomTabBar } from '../../src/components/BottomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => <BottomTabBar />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="standards" />
      <Tabs.Screen name="assistant" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
