import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from "../constants.js";

const IndividualComment = ({ spec, author, content, specColor, setSpecColor }) => {

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
