import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Comment from "./IndividualComment.js"; // Import the Comment component
import { COLORS, FONTS } from "../constants.js";
import { supabase, postComment } from "../Supabase.js";

const CommentsFeed = ({ comments, specColor, setSpecColor }) => {
  const [fetchError, setFetchError] = useState(null);
  const [testComments, setTestComments] = useState(null);

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

  const handleVote = async (commentId, voteType) => {
    try {
      // Update the vote count in the database based on voteType (upvote or downvote)
      const { data, error } = await supabase
        .from("Comments")
        .update({
          votes: supabase.raw(`votes ${voteType === 'upvote' ? '+' : '-'} 1`),
        })
        .eq('id', commentId);
      
      if (error) {
        throw error;
      }
      
      // Update the local state with the updated vote count
      const updatedComments = testComments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, votes: data[0].votes };
        }
        return comment;
      });
      setTestComments(updatedComments);
    } catch (error) {
      console.error("Error updating vote count:", error.message);
    }
  };


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
            onUpvote={() => handleVote(item.id, 'upvote')}
            onDownvote={() => handleVote(item.id, 'downvote')}
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
