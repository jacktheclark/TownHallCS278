import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLORS, FONTS } from "../constants.js";
import { supabase, postComment } from "../Supabase.js";

const WriteComment = ({
  displayName,
  spectrumValue,
  setSpectrumValue,
  hasCommented,
  showComments,
  setAvgSpectrum,
  postid,
}) => {
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Fetch user pseudonym when the component mounts
  //   const fetchUserPseudonym = async () => {
  //     const { data: user, error } = await supabase
  //       .from('UserInfo')
  //       .select('pseudo')
  //       .single(); // Assuming only one user is expected
  //     if (error) {
  //       console.error('Error fetching user:', error.message);
  //       return;
  //     }
  //     setUser(user ? user.pseudo : 'BobJoe');
  //   };
  //   fetchUserPseudonym();
  // }, []);

  const getAggregate = async () => {
    const { data, error } = await supabase
      .from("Comments")
      .select("spectrum")
      .eq("post", postid);
    // .eq("spectrum", spectrumValue);
    if (error) {
      console.error("Error fetching comments:", error.message);
      return Null;
    }
    const sum = data.reduce((acc, obj) => acc + obj.spectrum, 0);
    const average = sum / data.length;
    console.log(average);
    // return data[0].avg;
    return average;
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = async () => {
    getAggregate().then((avg) => setAvgSpectrum(avg));
    const newComment = {
      spectrum: spectrumValue,
      author: user ? "Anonymous" : displayName, //NOT WORKING YET
      content: comment,
      post: postid,
    };
    const response = await postComment(newComment);
    setComment("");
    showComments(true);
    if (response) {
      setComment("");
      showComments(true);
    }
    setComment("");
    showComments(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline={true}
        textAlignVertical="top"
        value={comment}
        onChangeText={handleCommentChange}
        placeholder="Write your comment..."
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
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: "35%",
    borderColor: "white",
    color: COLORS.lightaccent,
    backgroundColor: "gray",
    fontFamily: FONTS.body,
    fontSize: 16,
    borderWidth: 2,
    borderRadius: "10%",
    padding: "4%",
    marginBottom: "10%",
    marginTop: "10%",
  },
  submitResponseButton: {
    alignItems: "center",
    backgroundColor: COLORS.lightaccent,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: "10%",
    width: "50%"
  },
  submitResponseButtonText: {
    color: COLORS.dark,
    textAlign: "center",
    // fontSize: "20%",
  },
});

export default WriteComment;
