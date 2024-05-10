import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Comment from "./IndividualComment.js"; // Import the Comment component
import { COLORS, FONTS } from "../constants.js";
import { supabase, postComment } from "../Supabase.js";

const CommentsFeed = ({ comments, specColor, setSpecColor }) => {
  const [fetchError, setFetchError] = useState(null);
  const [testComments, setTestComments] = useState(null);
  const [voteCountState, setVoteCountState] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase.from("Comments").select();
        if (error) {
          throw error;
        }
        if (data) {
          setTestComments(data.reverse()); // Reverse (most recent first)
        }
      } catch (error) {
        setFetchError("Could not fetch");
        console.log(error);
      }
    };

    fetchComments(); // Call the fetchComments function once
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={testComments || []} // Use testComments or an empty array if testComments is null
        renderItem={({ item }) => (
          <Comment
            spec={item.spectrum}
            author={item.author}
            content={item.content}
            specColor={specColor}
            setSpecColor={setSpecColor}
            voteCount={item.votes}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%", // Set width to 100%
  },
  flatList: {
    width: "100%", // Set width to 100%
  },
});

export default CommentsFeed;
