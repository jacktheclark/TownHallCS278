// DiscussionTopic.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import Slider from '@react-native-community/slider';
import supabase from "../Supabase.js";


const SliderComponent = ({spectrumValue, setSpectrumValue, specColor, setSpecColor}) => {

    const colorScale = [
      { low: 0, high: 2, color: '#f00f63' }, //pink
      { low: 2, high: 4, color: '#c319e6' }, //purple
      { low: 4, high: 6, color: '#170af5' }, // blue
      { low: 6, high: 8, color: '#1ad8e5' }, //cyan
      { low: 8, high: 10, color: '#19e64b' }, //green
  ];

  const addHexNum = (col, offset) => {
      const decColor = parseInt(col, 16);
      const sum = decColor + offset;
      // return sum.toString(16);
      setSpecColor(col);
      return col;
  }

  const pickColor = () => {
      for (let i = 0; i < colorScale.length; i++){
          if (spectrumValue >= colorScale[i].low && spectrumValue <= colorScale[i].high) {
              return addHexNum(colorScale[i].color, spectrumValue);
          }
      }
      setSpecColor('white');
      return 'white';
  }



    const spectrumChanger = (value) => {
        setSpectrumValue(value);
      };

    const getColor = (spectrumValue) => {
      let rounded = Math.round(spectrumValue);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{spectrumValue}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor={COLORS.lightaccent}
        maximumTrackTintColor={COLORS.lightaccent}
        value={spectrumValue}
        onValueChange={spectrumChanger}
        thumbTintColor={pickColor()}
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
  }
});

export default SliderComponent;
