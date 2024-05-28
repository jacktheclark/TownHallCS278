// DiscussionTopic.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import Slider from "@react-native-community/slider";
import { supabase, postComment } from "../Supabase.js";
const SliderComponent = ({
  spectrumValue,
  setSpectrumValue,
  specColor,
  setSpecColor,
  hasCommented,
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
      {hasCommented && <View style={styles.overlay} />}
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
});

export default SliderComponent;
