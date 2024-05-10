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

  const colorVec = [
    '#ff006c', //hotpink
    '#f00f63', //pink
    '#f20d82', //pink/purple
    '#b813ec', //purple/blue
    '#551ee1', //bluer
    '#2052df', //light blue
    '#1cc8e3', //cyan
    '#22dd95', //mint
    '#e5f708', //yellow
    '#ff9200', //orange
    '#f94106', //red/orange
  ];

  useEffect(() => {
    setSpecColor(colorVec[Math.round(spectrumValue)]);
  }, [spectrumValue]); // re-run if spectrumvalue changes

  return (
    <View style={styles.container}>
      <DiscussionTopic question={"What do you think of the new Stanford president hiring?"} />
      <SliderComponent spectrumValue={spectrumValue} setSpectrumValue={setSpectrumValue}
        specColor={specColor} setSpecColor={setSpecColor}/>
      {hasCommented ? (
        <View style={styles.lilContainer}>
          <FilterButtons specColor={specColor} 
            sortOption={sortOption}
            setSortOption={setSortOption}/>
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
