import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";

import {
  COLORS,
  FONTS,
  FONT_SOURCE_BODY,
  FONT_SOURCE_MEDIUM,
  FONT_SOURCE_BOLD,
} from "./constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": FONT_SOURCE_BODY,
    "Inter-Medium": FONT_SOURCE_MEDIUM,
    "Inter-Bold": FONT_SOURCE_BOLD,
  });

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="AuthScreen">
        <Stack.Screen
          name="AuthScreen"
          component={Auth}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="LandingScreen"
          component={Landing}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="FeedScreen"
          component={Feed}
          options={{
            title: "Question of the Day",
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerTintColor: COLORS.lightaccent,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            fontFamily: FONTS.bold,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={Signup}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerTintColor: COLORS.lightaccent,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
