import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import CommentsFeed from "../components/CommentsFeed.js";
import DiscussionTopic from "../components/DiscussionTopic.js";
import SliderComponent from "../components/SliderComponent.js";
import WriteComment from "../components/WriteComment.js";
import supabase from "../Supabase.js";

export default function Feed({ navigation, route }) {
  const { displayName } = route.params;
  const [hasCommented, showComments] = useState(false);
  useEffect(() => {
    // Display pseudo
    console.log("Display Name:", displayName);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.testText}>feed screen</Text> */}
      <DiscussionTopic question={"insert controversial question here"} />
      <SliderComponent />
      {hasCommented ? (
        <CommentsFeed />
      ) : (
        <WriteComment hasCommented={hasCommented} showComments={showComments} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.dark,
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
