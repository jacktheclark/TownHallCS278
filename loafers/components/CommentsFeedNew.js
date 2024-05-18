import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Comment from "./IndividualComment.js";
import { COLORS, FONTS } from "../constants.js";
import { supabase, postComment } from "../Supabase.js";

const CommentsFeedNew = ({ comments, specColor, setSpecColor }) => {
  const [fetchError, setFetchError] = useState(null);
  const [commentList, setCommentList] = useState(null);
  const [upvotedComments, setUpvotedComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase.from("Comments").select();
        if (error) {
          throw error;
        }
        if (data) {
          //data in increasing order of age (newest first)
          const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setCommentList(sortedData); 
        }
      } catch (error) {
        setFetchError("Could not fetch");
        console.log(error);
      }
    };
    fetchComments();
  }, []);

  const handleVote = async (commentId, upOrDown) => {
    try {
      // get current vote counts
      const { data: commentData, error: commentError } = await supabase
        .from("Comments")
        .select("votes")
        .eq('id', commentId)
        .single();
      if (commentError) {
        throw commentError;
      }
      // local state to check what they've already uploaded
      const isUpvoted = upvotedComments.includes(commentId);
      // updated running vote count
      let updatedVoteCount = commentData.votes;
      if (upOrDown === 1) {
        updatedVoteCount += isUpvoted ? -1 : 1; // dec if already upvoted, otherwise increment
      } else {
        updatedVoteCount -= 1; // dec for downvote
      }
      //update vote count in db
      const { data: updatedData, error: updateError } = await supabase
        .from("Comments")
        .update({ votes: updatedVoteCount })
        .eq('id', commentId);
      if (updateError) {
        throw updateError;
      }
      // upvote vote count in local
      const updatedComments = commentList.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, votes: updatedVoteCount };
        }
        return comment;
      }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by creation date in descending order
      
      setCommentList(updatedComments); // updating local commentslist to track

      // update my internal list of upvoted comments
      if (upOrDown === 1) {
        if (isUpvoted) {
          // already upvoted, so remove it from the comment list
          setUpvotedComments(prevState => prevState.filter(id => id !== commentId));
        } else {
          // not already upvoted, so add this comment to the comment list
          setUpvotedComments(prevState => [...prevState, commentId]);
        }
      }
    } catch (error) {
      console.error("Error updating vote count:", error.message);
    }
  };

  const handleReport = async (commentId) => {
    try {
      // get current report counts
      const { data: commentData, error: commentError } = await supabase
        .from("Comments")
        .select("reports")
        .eq('id', commentId)
        .single();
      if (commentError) {
        throw commentError;
      }
  
      // updated running report count
      let updatedReportCount = commentData.reports;
      updatedReportCount += 1; // add a report
  
      // update report count in db
      const { data: updatedData, error: updateError } = await supabase
        .from("Comments")
        .update({ reports: updatedReportCount })
        .eq('id', commentId);
      if (updateError) {
        throw updateError;
      }
  
      // optionally, update the local state if needed
      const updatedComments = commentList.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, reports: updatedReportCount };
        }
        return comment;
      }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by creation date in descending order
      
      setCommentList(updatedComments); // updating local comment list to track
    } catch (error) {
      console.error("Error updating report count:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={commentList || []}
        renderItem={({ item }) => (
          <Comment
            spec={item.spectrum}
            author={item.author}
            content={item.content}
            specColor={specColor}
            setSpecColor={setSpecColor}
            voteCount={item.votes}
            onUpvote={() => handleVote(item.id, 1)} //1 is upvote
            onDownvote={() => handleVote(item.id, -1)} //-1 is downvote
            onReport={() => handleReport(item.id)}
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
    width: "100%",
  },
  flatList: {
    width: "100%",
  },
});

export default CommentsFeedNew;
