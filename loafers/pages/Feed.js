import React, { useEffect, useState } from "react";
import {ImageBackground, View, Text, StyleSheet, FlatList } from "react-native";
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
      <ImageBackground source={require('../assets/backgroundImage.jpeg')} style={styles.header}>
      </ImageBackground>
      <View style={styles.bodyContainer}>
        {/* <Text style={styles.testText}>feed screen</Text> */}
        <DiscussionTopic question={"What do you think of the new Stanford president hiring?"} />
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background_dark,
    
  },
  header: {
    // height: '12%',
    flex: 1, 
    resizeMode: "cover", 
    justifyContent: "center", 
    height: '25%'
    // borderBottomEndRadius: -20,
  },
  bodyContainer: {
    // flex: 1,
    position: 'absolute',
    top: '12%',
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: '90%',
    padding: '5%',
    // textAlign: 'left',
  },
  testText: {
    marginTop: 100,
    marginBottom: 50,
    color: "white",
    fontSize: 24,
    fontFamily: FONTS.body,
    color: COLORS.lightaccent,
    textAlign: "left",
  },
});
