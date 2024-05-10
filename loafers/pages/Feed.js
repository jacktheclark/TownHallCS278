import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import CommentsFeedNew from "../components/CommentsFeedNew.js";
import CommentsFeedHot from "../components/CommentsFeedHot.js";
import CommentsFeedSimilar from "../components/CommentsFeedSimilar.js";
import CommentsFeedDis from "../components/CommentsFeedDis.js";
import DiscussionTopic from "../components/DiscussionTopic.js";
import SliderComponent from "../components/SliderComponent.js";
import WriteComment from "../components/WriteComment.js";
import FilterButtons from "../components/FilterButtons.js";
import supabase from "../Supabase.js";

export default function Feed({ navigation, route }) {
  const { displayName } = route.params;
  const [hasCommented, showComments] = useState(false);
  const [spectrumValue, setSpectrumValue] = useState(5);
  const [specColor, setSpecColor] = useState(null);
  const [sortOption, setSortOption] = useState("New");


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

  const pickColor = React.useMemo(() => {
    let selectedColor = 'white'; //default

    for (let i = 0; i < colorScale.length; i++){
        if (spectrumValue >= colorScale[i].low && spectrumValue <= colorScale[i].high) {
            selectedColor = colorScale[i].color;
            break; //exit when we good
        }
    }
    // set speccolor outside of loop so i dont infinite render
    setSpecColor(selectedColor);
    return selectedColor;
  }, [spectrumValue, setSpecColor]);

  useEffect(() => {
    setSpecColor(pickColor);
  }, [spectrumValue]); // Only re-run the effect if spectrumValue changes



  return (
    <View style={styles.container}>
      {/* <Text style={styles.testText}>feed screen</Text> */}
      <DiscussionTopic question={"What do you think of the new Stanford president hiring?"} />
      <SliderComponent spectrumValue={spectrumValue} setSpectrumValue={setSpectrumValue}
        specColor={specColor} setSpecColor={setSpecColor}/>
      {hasCommented ? (
        <View style={styles.lilContainer}>
          <FilterButtons specColor={specColor} 
            sortOption={sortOption}
            setSortOption={setSortOption}/>

          {/* <CommentsFeedNew specColor={specColor} setSpecColor={setSpecColor}/> */}
          {/* <CommentsFeedHot specColor={specColor} setSpecColor={setSpecColor}/> */}
          {sortOption === 'New' ? (
              <CommentsFeedNew specColor={specColor} setSpecColor={setSpecColor} />
          ) : sortOption === 'Hot' ? (
              <CommentsFeedHot specColor={specColor} setSpecColor={setSpecColor} />
          ) : sortOption === 'Similar' ? (
              <CommentsFeedSimilar specValue={spectrumValue} specColor={specColor} setSpecColor={setSpecColor}/>
          ) : (
              <CommentsFeedDis specValue={spectrumValue} specColor={specColor} setSpecColor={setSpecColor}/>
          )}
        </View>
      ) : (
        <WriteComment 
        displayName = {displayName}
        spectrumValue={spectrumValue} 
        setSpectrumValue={setSpectrumValue}
        hasCommented={hasCommented} 
        showComments={showComments} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.dark,
  },
  lilContainer: {
    flex: 1,
  },
  testText: {
    marginTop: 100,
    marginBottom: 50,
    color: "white",
    fontSize: 24,
    fontFamily: FONTS.body,
    color: COLORS.lightaccent,
  },
});
