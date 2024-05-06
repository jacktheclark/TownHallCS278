import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { COLORS, FONTS } from "../constants.js";

const WriteComment = ({ hasCommented, showComments }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = () => {
    showComments(true);
    // onSubmit(comment);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={handleCommentChange}
        placeholder="Write your comment..."
        multiline
      />

      <TouchableOpacity 
      onPress={handleSubmit}
      style={styles.submitResponseButton}
      >

        <Text style={styles.submitResponseButtonText}>Submit</Text>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%", // Set width to 100%
  },
  input: {
    height: 100,
    borderColor: 'gray',
    color: COLORS.lightaccent,
    fontFamily: FONTS.body,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  submitResponseButton: {
    backgroundColor: COLORS.lightaccent,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 20,
    marginTop: 20,
  },
  submitResponseButtonText: {
    color: COLORS.dark,
    textAlign: "center",
  },
});

export default WriteComment;
