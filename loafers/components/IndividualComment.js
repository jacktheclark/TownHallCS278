import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from "../constants.js";
import { AntDesign } from '@expo/vector-icons';

const IndividualComment = ({ spec, author, content, specColor, setSpecColor, voteCount }) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  

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

    const handleUpvote = async () => {
      if (hasUpvoted) {
        setHasUpvoted(false); // If already upvoted, undo the upvote
      } else {
        setHasUpvoted(true);
        setHasDownvoted(false);
      }
    };
  
    const handleDownvote = async () => {
      if (hasDownvoted) {
        setHasDownvoted(false); // If already downvoted, undo the downvote
      } else {
        setHasDownvoted(true);
        setHasUpvoted(false);
      }
    };


  return (
    <View style={styles.bigContainer}>
      <View style={styles.commentContainer}>
        <Text style={[styles.author, {color: pickColor()}]}>{author}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
      
      <View style={styles.rightSideContainer}>
          <View style={styles.voteCountsContainer}>
            <Text style={[styles.voteCounts, {color: pickColor()}]}>10</Text>
          </View>
          <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleUpvote}>
            <AntDesign name="up" size={24} color={hasUpvoted ? pickColor() : COLORS.lightaccent} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDownvote}>
            <AntDesign name="down" size={24} color={hasDownvoted ? pickColor() : COLORS.lightaccent} />
          </TouchableOpacity>
          </View>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flexDirection: 'row', // Horizontal row
    justifyContent: 'space-between', // Align children at the ends
    alignItems: 'center', // Align children vertically at the center
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.lightaccent,
    borderWidth: 1,
    borderColor: COLORS.lightaccent,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  commentContainer: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.lightaccent,
  },
  iconContainer: {
    padding: 10,
  },
  voteCountsContainer : {
    padding: 10,
  },
  rightSideContainer: {
    flexDirection: 'row', // Horizontal row
    justifyContent: 'space-between', // Align children at the ends
    alignItems: 'center', // Align children vertically at the center
    // padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.lightaccent,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  voteCounts: {
    fontFamily: FONTS.bold,
    marginBottom: 5,
    color: COLORS.lightaccent,
    fontSize: 20,
  },
  author: {
    fontFamily: FONTS.bold,
    marginBottom: 5,
    color: COLORS.lightaccent,
    fontSize: 16,
  },
  content: {
    color: COLORS.lightaccent,
    fontFamily: FONTS.body,
    fontSize: 14,
  },
});

export default IndividualComment;
