import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Home from './pages/Home';
import { COLORS, FONTS, FONT_SOURCE_BODY, FONT_SOURCE_MEDIUM, FONT_SOURCE_BOLD } from "./constants";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": FONT_SOURCE_BODY,
    "Inter-Medium": FONT_SOURCE_MEDIUM,
    "Inter-Bold": FONT_SOURCE_BOLD,
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {fontsLoaded ? <Home /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});