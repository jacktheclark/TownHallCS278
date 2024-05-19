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
    color: COLORS.white,
    height: '30%',
    width: '80%',
  },
  title: {
    color: COLORS.lightaccent,
    fontFamily: FONTS.body,
    fontSize: '20%',
    textAlign: "center",
  },
  container: {
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  }
});

export default SliderComponent;
