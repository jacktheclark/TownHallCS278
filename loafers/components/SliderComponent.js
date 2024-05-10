// DiscussionTopic.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import Slider from '@react-native-community/slider';
import supabase from "../Supabase.js";


const SliderComponent = ({spectrumValue, setSpectrumValue, specColor, setSpecColor}) => {


    const spectrumChanger = (value) => {
        setSpectrumValue(value);
      };

    const getColor = (spectrumValue) => {
      let rounded = Math.round(spectrumValue);
    };

  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <Text style={styles.title}>Terrible</Text>
        <Text style={styles.title}>I love it!!</Text>
      </View>
      
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor={COLORS.lightaccent}
        maximumTrackTintColor={COLORS.lightaccent}
        value={spectrumValue}
        onValueChange={spectrumChanger}
        thumbTintColor={specColor}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    color: COLORS.lightaccent,
    height: 40,
    width: '80%',
  },
  title: {
    color: COLORS.lightaccent,
    fontFamily: FONTS.body,
    textAlign: "center",
  },
  container: {
    // flex: 1,
    alignItems: 'center',
  },
  horizontalContainer: {
    // flex: 1,
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'space-between', // Space out the children evenly
    width: '80%', // Adjust the width to match the slider's width
    marginBottom: 10, // Add margin at the bottom for separation
  }
});

export default SliderComponent;
