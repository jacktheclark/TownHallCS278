import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import CommentsFeed from "../components/CommentsFeed.js";
import DiscussionTopic from "../components/DiscussionTopic.js";
import SliderComponent from "../components/SliderComponent.js";
import WriteComment from "../components/WriteComment.js";
import supabase from "../Supabase.js";

export default function Feed({ navigation, route }) {
  const { displayName } = route.params;
  const [hasCommented, showComments] = useState(false);
  const [spectrumValue, setSpectrumValue] = useState(5);
  const [specColor, setSpecColor] = useState(null);
  useEffect(() => {
    // Display pseudo
    // console.error("Display Name:", route.params);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.testText}>feed screen</Text> */}
      <DiscussionTopic question={"insert controversial question here"} />
      <SliderComponent spectrumValue={spectrumValue} setSpectrumValue={setSpectrumValue}
        specColor={specColor} setSpecColor={setSpecColor}/>
      {hasCommented ? (
        <CommentsFeed specColor={specColor} setSpecColor={setSpecColor}/>
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
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.dark,
    // borderRadius: 20,
    //borderColor: "red",
    //borderWidth: 5,
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
