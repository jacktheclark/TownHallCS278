import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Landing from './pages/Landing';
import Feed from './pages/Feed';
import { COLORS, FONTS, FONT_SOURCE_BODY, FONT_SOURCE_MEDIUM, FONT_SOURCE_BOLD } from "./constants";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": FONT_SOURCE_BODY,
    "Inter-Medium": FONT_SOURCE_MEDIUM,
    "Inter-Bold": FONT_SOURCE_BOLD,
  });

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen name="LandingScreen" component={Landing}/>
        <Stack.Screen name="FeedScreen" component={Feed} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});