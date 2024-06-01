import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Comment from "./IndividualComment.js";
import { COLORS, FONTS } from "../constants.js";
import { supabase, postComment } from "../Supabase.js";

const CommentsFeedHot = ({ displayName, comments, specColor, setSpecColor }) => {
  const [fetchError, setFetchError] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        console.log("setting user id", user.id);
      } else {
        console.log("Error fetching user:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const dayOfWeek = new Date().getDay(); // Get the current day of the week
        const { data, error } = await supabase
          .from("Comments")
          .select()
          .eq("post", dayOfWeek) // Filter by current day of the week
          .order("votes", { ascending: false }); // Sort by votes in descending order

        if (error) {
          throw error;
        }
        if (data) {
          setCommentList(data); // Set comment list with sorted data
        }
      } catch (error) {
        setFetchError("Could not fetch");
        console.log(error);
      }
    };

    fetchUserId();
    fetchComments();
  }, []);

  const handleVote = async (commentId, upOrDown) => {
    try {
      const { data: commentData, error: commentError } = await supabase
        .from("Comments")
        .select("votes")
        .eq("id", commentId)
        .single();
      if (commentError) {
        throw commentError;
      }

      let updatedVoteCount = commentData.votes + upOrDown;

      const { error: updateCommentError } = await supabase
        .from("Comments")
        .update({ votes: updatedVoteCount })
        .eq("id", commentId);
      if (updateCommentError) {
        throw updateCommentError;
      }

      const updatedComments = commentList
        .map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, votes: updatedVoteCount };
          }
          return comment;
        })
        .sort((a, b) => b.votes - a.votes);

      setCommentList(updatedComments);
    } catch (error) {
      console.error("Error updating vote count:", error.message);
    }
  };

  const handleReport = async (commentId) => {
    try {
      const { data: commentData, error: commentError } = await supabase
        .from("Comments")
        .select("reports")
        .eq("id", commentId)
        .single();
      if (commentError) {
        throw commentError;
      }

      let updatedReportCount = commentData.reports + 1;

      const { error: updateError } = await supabase
        .from("Comments")
        .update({ reports: updatedReportCount })
        .eq("id", commentId);
      if (updateError) {
        throw updateError;
      }

      const updatedComments = commentList
        .map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, reports: updatedReportCount };
          }
          return comment;
        })
        .sort((a, b) => b.votes - a.votes);

      setCommentList(updatedComments);
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
            displayName={displayName}
            spec={item.spectrum}
            author={item.author}
            id={item.id}
            content={item.content}
            specColor={specColor}
            setSpecColor={setSpecColor}
            voteCount={item.votes}
            onUpvote={() => handleVote(item.id, 1)}
            onDownvote={() => handleVote(item.id, -1)}
            onReport={() => handleReport(item.id)}
            userId={userId}
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

export default CommentsFeedHot;
