import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from "../constants.js";

const IndividualComment = ({ spec, author, content, specColor, setSpecColor }) => {

    const colorScale = [
        { low: 0, high: 2, color: '#f00f63' }, //pink
        { low: 2, high: 4, color: '#c319e6' }, //purple
        { low: 4, high: 6, color: '#170af5' }, // blue
        { low: 6, high: 8, color: '#1ad8e5' }, //cyan
        { low: 8, high: 10, color: '#19e64b' }, //green
    ];

    const addHexNum = (col, offset) => {
        const decColor = parseInt(col, 16);
        const sum = decColor + offset;
        // return sum.toString(16);
        setSpecColor(col);
        return col;
    }

    const pickColor = () => {
        console.log('spec = ', spec);
        for (let i = 0; i < colorScale.length; i++){
            if (spec >= colorScale[i].low && spec <= colorScale[i].high) {
                return addHexNum(colorScale[i].color, spec);
            }
        }
        setSpecColor('white');
        return 'white';
    }


  return (
    <View style={styles.commentContainer}>
      <Text style={[styles.author, {color: pickColor()}]}>{author}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightaccent,
  },
  author: {
    fontFamily: FONTS.bold,
    marginBottom: 5,
    color: COLORS.lightaccent,
  },
  content: {
    color: COLORS.lightaccent,
    fontFamily: FONTS.body,
  },
});

export default IndividualComment;
