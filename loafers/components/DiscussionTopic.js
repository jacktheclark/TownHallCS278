// DiscussionTopic.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS } from "../constants.js";


const DiscussionTopic = ({ question }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.body,
    marginBottom: 8,
    textAlign: "center",
    color: COLORS.lightaccent,
  },
});

export default DiscussionTopic;
