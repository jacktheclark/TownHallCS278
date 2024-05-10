import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from "../constants.js";
import { supabase, postComment } from '../Supabase.js';

const WriteComment = ({ displayName, spectrumValue, setSpectrumValue, hasCommented, showComments }) => {
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(null);

  
  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = async () => {
    const newComment = {
      spectrum: spectrumValue,
      author: user ? user.pseudo : "Anonymous", //NOT WORKING YET
      content: comment,
    };
    const response = await postComment(newComment);
    setComment('');
    showComments(true);
    if (response) {
      setComment('');
      showComments(true);
    }
    setComment('');
    showComments(true);
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
    width: "100%",
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