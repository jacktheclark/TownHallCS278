// DiscussionTopic.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import Slider from '@react-native-community/slider';


const SliderComponent = () => {
    const [spectrumValue, setSpectrumValue] = useState(0);

    const spectrumChanger = (value) => {
        setSpectrumValue(value);
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>spectrum: {spectrumValue}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor={COLORS.lightaccent}
        maximumTrackTintColor={COLORS.lightaccent}
        value={spectrumValue}
        onValueChange={spectrumChanger}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    color: COLORS.lightaccent,
  },
  title: {
    color: COLORS.lightaccent,
    fontFamily: FONTS.body,
    textAlign: "center",
  }
});

export default SliderComponent;
