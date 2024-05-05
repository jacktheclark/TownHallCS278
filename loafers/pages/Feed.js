import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import CommentsFeed from "../components/CommentsFeed.js";

export default function Feed() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.testText}>feed screen</Text> */}
      <CommentsFeed />
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
    fontFamily: FONTS.bold,
    color: COLORS.lightaccent,
  },
});
