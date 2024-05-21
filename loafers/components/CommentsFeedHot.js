import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Comment from "./IndividualComment.js"; // Import the Comment component
import { COLORS, FONTS } from "../constants.js";
import { supabase, postComment } from "../Supabase.js";

const CommentsFeedHot = ({ comments, specColor, setSpecColor }) => {
  const [fetchError, setFetchError] = useState(null);
  const [commentList, setCommentList] = useState(null);
  //Need to change this to fetch from supabase based on user
  const [upvotedComments, setUpvotedComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        //decending order of votes
        const { data, error } = await supabase
          .from("Comments")
          .select()
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

    fetchComments();
  }, []);

  const handleVote = async (commentId, upOrDown) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      //console.log("feedie user:", user.id);
      //console.log("feedie comment", commentId);
      // get current vote counts
      const { data: commentData, error: commentError } = await supabase
        .from("Comments")
        .select("votes")
        .eq("id", commentId)
        .single();
      if (commentError) {
        throw commentError;
      }
      // local state to check what they've already upvoted
      const isUpvoted = upvotedComments.includes(commentId);
      // updated running vote count
      let updatedVoteCount = commentData.votes;
      if (upOrDown === 1) {
        updatedVoteCount += isUpvoted ? -1 : 1; // dec if already upvoted, otherwise increment
        if (!isUpvoted) {
          const { data: insertedData, error: insertError } = await supabase
            .from("Upvote")
            .upsert(
              [
                {
                  user: user.id,
                  commentid: commentId,
                  state: 1, // 1 for upvote
                },
              ],
              { onConflict: ["user", "commentid"] } // Specify the columns for conflict resolution
            );

          if (insertError) {
            throw insertError;
          }
        }
        if (isUpvoted) {
          const { data: insertedData, error: insertError } = await supabase
            .from("Upvote")
            .upsert(
              [
                {
                  user: user.id,
                  commentid: commentId,
                  state: 0, // 1 for upvote
                },
              ],
              { onConflict: ["user", "commentid"] } // Specify the columns for conflict resolution
            );

          if (insertError) {
            throw insertError;
          }
        }
      } else {
        updatedVoteCount -= 1; // dec for downvote
        const { data: insertedData, error: insertError } = await supabase
          .from("Upvote")
          .upsert(
            [
              {
                user: user.id,
                commentid: commentId,
                state: 2, // 1 for upvote
              },
            ],
            { onConflict: ["user", "commentid"] } // Specify the columns for conflict resolution
          );

        if (insertError) {
          throw insertError;
        }
      }
      //update vote count in db
      const { data: updatedData, error: updateError } = await supabase
        .from("Comments")
        .update({ votes: updatedVoteCount })
        .eq("id", commentId);
      if (updateError) {
        throw updateError;
      }
      // upvote vote count in local
      const updatedComments = commentList.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, votes: updatedVoteCount };
        }
        return comment;
      });
      setCommentList(updatedComments); // updating local commentslist to track

      // update my internal list of upvoted comments
      if (upOrDown === 1) {
        if (isUpvoted) {
          // already upvoted, so remove it from the comment list
          setUpvotedComments((prevState) =>
            prevState.filter((id) => id !== commentId)
          );
        } else {
          // not already upvoted, so add this comment to the comment list

          setUpvotedComments((prevState) => [...prevState, commentId]);
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

export default CommentsFeedHot;
