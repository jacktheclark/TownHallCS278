// DiscussionTopic.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import Slider from '@react-native-community/slider';
import supabase from "../Supabase.js";


const SliderComponent = ({spectrumValue, setSpectrumValue, specColor, setSpecColor}) => {

    const colorScale = [
      { low: 0, high: 1, color: '#f00f63' }, //pink
      { low: 1, high: 2, color: '#f20d82' }, //pink/purple
      { low: 2, high: 3, color: '#b813ec' }, //purple/blue
      { low: 3, high: 4, color: '#551ee1' }, //bluer
      { low: 4, high: 5, color: '#2052df' }, //light blue
      { low: 5, high: 6, color: '#1cc8e3' }, //cyan
      { low: 6, high: 7, color: '#22dd95' }, //mint
      { low: 7, high: 8, color: '#e5f708' }, //yellow
      { low: 8, high: 9, color: '#ff9200' }, //orange
      { low: 9, high: 10, color: '#f94106' }, //red/orange
  ];

  // const addHexNum = (col, offset) => {
  //     const decColor = parseInt(col, 16);
  //     const sum = decColor + offset;
  //     // return sum.toString(16);
  //     setSpecColor(col);
  //     return col;
  // }

  const pickColor = () => {
    let chosenColor = 'white';
    for (let i = 0; i < colorScale.length; i++){
        if (spectrumValue >= colorScale[i].low && spectrumValue <= colorScale[i].high) {
            chosenColor = colorScale[i].color;
            break;
        }
    }
    return chosenColor;
}

  useEffect(() => {
    const color = pickColor();
    setSpecColor(color);
  }, [spectrumValue]); // Only re-run the effect if spectrumValue changes



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
