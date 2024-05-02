import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {COLORS, FONTS} from "../constants.js";

export default function Feed() {
  return (
    <View style={styles.container}>
      <Text style={styles.testText}>feed screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.dark,
      },
    testText: {
        color: 'white',
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: COLORS.lightaccent,
    }
});