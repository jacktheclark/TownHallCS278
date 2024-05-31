// DiscussionTopic.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import Slider from "@react-native-community/slider";
import { supabase, postComment } from "../Supabase.js";
const SliderComponent = ({
  spectrumValue,
  setSpectrumValue,
  specColor,
  setSpecColor,
  hasCommented,
  avgSpectrum,
}) => {
  const [scaleTexts, setScaleTexts] = useState({
    lowerScale: null,
    upperScale: null,
  });

  useEffect(() => {
    const fetchScaleTexts = async () => {
      try {
        // Get the current day of the week as a number (0 for Sunday, 1 for Monday, etc.)
        const dayOfWeek = new Date().getDay();
        console.log("slider date,", dayOfWeek);

        const { data, error } = await supabase
          .from("Questions")
          .select("lowerscale, upperscale")
          .eq("id", dayOfWeek)
          .single();

        if (error) {
          console.error("Error fetching scale texts:", error);
        } else {
          setScaleTexts({
            lowerScale: data.lowerscale,
            upperScale: data.upperscale,
          });
        }
      } catch (error) {
        console.error("Error fetching scale texts:", error);
      }
    };

    fetchScaleTexts();
  }, []);

  const spectrumChanger = (value) => {
    setSpectrumValue(value);
  };

  const sliderWidth = Dimensions.get('window').width * 0.8; // Assuming the slider width is 80% of the screen width

  // Calculate the arrow's left position based on the slider value
  const arrowLeft = sliderWidth * (avgSpectrum / 10) - 10; // Adjusting by half the width of the arrow for centering
  

  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <Text style={styles.title}>{scaleTexts.lowerScale}</Text>
        <Text style={styles.title}>{scaleTexts.upperScale}</Text>
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
        // disabled={hasCommented}
      />
      {hasCommented && (
        <View style={styles.overlay} >
          <View style={[styles.arrow, { left: arrowLeft }]} />
          <Text style={[styles.arrowLabel, { left: arrowLeft -5 }]}>{'AVG'}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    color: COLORS.white,
    height: "30%",
    width: "80%",
  },
  title: {
    color: COLORS.lightaccent,
    fontFamily: FONTS.body,
    fontSize: 20,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  arrow: {
    position: 'absolute',
    top: '90%', // Adjust this value to place the arrow above the slider
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.lightaccent, // Color of the arrow
    zIndex: 2,
  }, 
  arrowLabel: {
    position: 'absolute',
    top: '117%', // Adjust this value to position the text below the arrow
    color: COLORS.lightaccent,
    fontSize: 16, // Adjust the font size as needed
    textAlign: 'center',
    zIndex: 2,
  }
});

export default SliderComponent;
