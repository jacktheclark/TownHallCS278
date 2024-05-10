import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Comment from "./IndividualComment.js"; // Import the Comment component
import { COLORS, FONTS } from "../constants.js";
import { supabase, postComment } from "../Supabase.js";

const CommentsFeed = ({ comments, specColor, setSpecColor }) => {
  const [fetchError, setFetchError] = useState(null);
  const [testComments, setTestComments] = useState(null);
  const [upvotedComments, setUpvotedComments] = useState([]);

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

    fetchComments();
  }, []);

  const handleVote = async (commentId, voteType) => {
    try {
      // Fetch the current vote count for the comment
      const { data: commentData, error: commentError } = await supabase
        .from("Comments")
        .select("votes")
        .eq('id', commentId)
        .single();

      if (commentError) {
        throw commentError;
      }

      // Check if the comment has already been upvoted
      const isUpvoted = upvotedComments.includes(commentId);

      // Calculate the updated vote count
      let updatedVoteCount = commentData.votes;
      if (voteType === 'upvote') {
        updatedVoteCount += isUpvoted ? -1 : 1; // Decrement if already upvoted, otherwise increment
      } else {
        updatedVoteCount -= 1; // Decrement for downvote
      }

      // Update the vote count in the Comments table
      const { data: updatedData, error: updateError } = await supabase
        .from("Comments")
        .update({ votes: updatedVoteCount })
        .eq('id', commentId);

      if (updateError) {
        throw updateError;
      }

      // Update the vote count in the local state
      const updatedComments = testComments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, votes: updatedVoteCount };
        }
        return comment;
      });
      setTestComments(updatedComments); // Update local state with new vote count

      // Update the list of upvoted comments
      if (voteType === 'upvote') {
        if (isUpvoted) {
          // Remove commentId from upvotedComments list if already upvoted
          setUpvotedComments(prevState => prevState.filter(id => id !== commentId));
        } else {
          // Add commentId to upvotedComments list if not already upvoted
          setUpvotedComments(prevState => [...prevState, commentId]);
        }
      }
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
