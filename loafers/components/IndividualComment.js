import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Animated,
} from "react-native";
import { COLORS, FONTS } from "../constants.js";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { supabase, fetchReplies, postReply } from "../Supabase.js"; // Adjust path as necessary


const IndividualComment = ({
  displayName,
  spec,
  author,
  id,
  content,
  specColor,
  setSpecColor,
  voteCount,
  onUpvote,
  onDownvote,
  onReport,
}) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [localVoteCount, setLocalVoteCount] = useState(voteCount);
  const [hasReported, setReported] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [height, setHeight] = useState(new Animated.Value(100));
  const baseHeight = 100; // Base height for the comment itself
  const replyHeight = 60; // Estimated height per reply
  const textInputHeight = 65; // Height of the reply input
  const [isExpanded, setIsExpanded] = useState(false);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    if (isExpanded) {
      fetchReplies(id).then(setReplies);
    }
  }, [id, isExpanded]);

  const calculateFullHeight = () => {
    return baseHeight + (replies.length * replyHeight) + textInputHeight;
  };

  const animateHeight = (targetHeight) => {
    Animated.timing(height, {
      toValue: targetHeight,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const toggleExpansion = () => {
    let targetHeight = isExpanded ? 100 : calculateFullHeight();
    animateHeight(targetHeight);
    setIsExpanded(!isExpanded);
  };

  // const postReplyAndUpdate = async (newReply) => {
  //   const posted = await postReply(newReply);
  //   if (posted) {
  //     fetchReplies(newReply.comment_id).then(newReplies => {
  //       setReplies(newReplies);
  //     }).catch(error => console.error('Failed to fetch replies:', error));
  //   }
  // };

  // const handleClickComment = async (commentId) => {
  //   // Toggle expansion state for the comment
  //   toggleExpansion()

  //   // Use the correct 'id' to filter and potentially fetch new replies
  //   let repliesForComment = replies.filter(reply => reply.comment_id === commentId);

  //   if (repliesForComment.length === 0) {
  //     console.log("Fetching replies from the backend...");
  //     try {
  //       repliesForComment = await fetchReplies(commentId);
  //       // Update the replies state with these new replies
  //       setReplies(currentReplies => [...currentReplies, ...repliesForComment]);
  //     } catch (error) {
  //       console.error('Error fetching replies:', error);
  //     }
  //   }

  //   console.log(`Replies for comment ID ${commentId}:`, repliesForComment);
  // };

  const handleClickComment = async (commentId) => {
    // Toggle expansion state for the comment
    toggleExpansion();

    console.log("Fetching replies from the backend...");
    try {
      const repliesForComment = await fetchReplies(commentId);
      console.log("fetched replies: ", repliesForComment)
      // Update the replies state with these new replies
      setReplies(currentReplies => {
        // Filter out any previous replies for this commentId to avoid duplicates
        const filteredCurrentReplies = currentReplies.filter(reply => reply.comment_id !== commentId);
        return [...filteredCurrentReplies, ...repliesForComment];
      });
    } catch (error) {
      console.error('Error fetching replies:', error);
    }

    console.log(`Replies fetched for comment ID ${commentId}.`);
  };

  const ReplyInput = ({ setReplies }) => {
    const [replyText, setReplyText] = useState("");
    const submitReply = async () => {
      if (!replyText.trim()) return; // Prevent empty replies

      let trimmedReplyText = replyText.trim().slice(0, 50); //character length 50

      const reply = {
        comment_id: id,
        author: displayName,  // Assuming author name is passed correctly to the component
        content: trimmedReplyText //trimmed version
      };

      const newReply = await postReply(reply);
      toggleExpansion();
    };

    return (
      <View style={styles.replyInputContainer}>
        <TextInput
          style={styles.replyTextInput}
          onChangeText={setReplyText}
          value={replyText}
          placeholder="Type your reply..."
          placeholderTextColor={COLORS.gray}
        />
        <TouchableOpacity
          style={styles.replyButton}
          onPress={submitReply}
        >
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    if (isExpanded) {
      const newHeight = baseHeight + (replies.length * replyHeight) + textInputHeight;
      animateHeight(newHeight);
    }
  }, [replies]);

  // useEffect(() => {
  //   if (isExpanded) {
  //     animateHeight(calculateFullHeight());
  //   }
  // }, [replies]);


  // useEffect(() => {
  //   animateHeight(calculateFullHeight());
  // }, [replies]);

  const renderReplies = () => (
    <View>
      {replies.map((reply) => (
        <View key={reply.id} style={styles.replyContainer}>
          <Text style={styles.replyAuthor}>{reply.author}</Text>
          <Text style={styles.replyContent}>{reply.content}</Text>
        </View>
      ))}
      <ReplyInput setReplies={setReplies} />
    </View>
  );


  const colorVec = [
    "#ff006c", //hotpink
    "#f00f63", //pink
    "#f20d82", //pink/purple
    "#b813ec", //purple/blue
    "#551ee1", //bluer
    "#2052df", //light blue
    "#1cc8e3", //cyan
    "#22dd95", //mint
    "#e5f708", //yellow
    "#ff9200", //orange
    "#f94106", //red/orange
  ];

  useEffect(() => {
    const loadReplies = async () => {
      const fetchedReplies = await fetchReplies(id);
      if (fetchedReplies) {
        setReplies(fetchedReplies);
      }
    };

    loadReplies();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else if (user) {
        console.log(user)
        setUserId(user.id);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      } else {
        console.log("Error fetching user:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUpvoteStatus = async () => {
      if (userId && id) {
        const { data, error } = await supabase
          .from("Upvote")
          .select("state")
          .eq("commentid", id)
          .eq("user", userId)
          .single();

        if (data) {
          if (data.state === 1) {
            setHasUpvoted(true);
            setHasDownvoted(false);
          } else if (data.state === -1) {
            setHasDownvoted(true);
            setHasUpvoted(false);
          } else {
            setHasUpvoted(false);
            setHasDownvoted(false);
          }
        } else if (error && error.details === "The result contains 0 rows") {
          setHasUpvoted(false);
          setHasDownvoted(false);
        } else if (error) {
          console.log("Error fetching upvote status:", error);
        }
      }
    };

    fetchUpvoteStatus();
  }, [id, userId]);

  const pickColor = React.useMemo(() => {
    return colorVec[Math.round(spec)];
  }, [spec, setSpecColor]);

  const handleUpvote = async () => {
    if (!userId || !id) return;

    let newVoteCount = localVoteCount;
    let newState = 0;

    if (!hasUpvoted) {
      setHasUpvoted(true);
      newVoteCount = hasDownvoted ? localVoteCount + 2 : localVoteCount + 1;
      if (hasDownvoted) {
        setHasDownvoted(false);
        onDownvote();
      }
      newState = 1;
    } else {
      setHasUpvoted(false);
      newVoteCount = localVoteCount - 1;
      newState = 0;
    }

    setLocalVoteCount(newVoteCount);
    await supabase
      .from("Upvote")
      .upsert(
        { commentid: id, user: userId, state: newState },
        { onConflict: ["commentid", "user"] }
      );

    if (newState === 1) {
      onUpvote();
    } else {
      onDownvote();
    }
  };

  const handleDownvote = async () => {
    if (!userId || !id) return;

    let newVoteCount = localVoteCount;
    let newState = 0;

    if (!hasDownvoted) {
      setHasDownvoted(true);
      newVoteCount = hasUpvoted ? localVoteCount - 2 : localVoteCount - 1;
      if (hasUpvoted) {
        setHasUpvoted(false);
        onUpvote();
      }
      newState = -1;
    } else {
      setHasDownvoted(false);
      newVoteCount = localVoteCount + 1;
      newState = 0;
    }

    setLocalVoteCount(newVoteCount);
    await supabase
      .from("Upvote")
      .upsert(
        { commentid: id, user: userId, state: newState },
        { onConflict: ["commentid", "user"] }
      );

    if (newState === -1) {
      onDownvote();
    } else {
      onUpvote();
    }
  };

  const handleReport = () => {
    setModalVisible(true);
  };

  const confirmReport = async () => {
    setReported(true);
    onReport();
    setModalVisible(false);
  };

  const cancelReport = () => {
    setModalVisible(false);
  };

  return (
    <Animated.View style={[styles.biggerContainer, { height }]}>
      {/* <TouchableOpacity onPress={toggleExpansion}> */}
      <TouchableOpacity onPress={() => handleClickComment(id)}>
        <View style={styles.bigContainer}>
          <View style={styles.leftSideContainer}>
            {/* <TouchableOpacity onPress={toggleExpansion}> */}
            <TouchableOpacity onPress={() => handleClickComment(id)}>
              <View style={styles.commentContainer}>
                <View style={styles.topPart}>
                  <Text style={[styles.author, { color: pickColor }]}>{author}</Text>
                  <TouchableOpacity
                    style={styles.reporftButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleReport();
                    }}
                  >
                    <MaterialIcons
                      name={hasReported ? "report" : "report-gmailerrorred"}
                      size={20}
                      color={hasReported ? pickColor : COLORS.gray}
                    />
                  </TouchableOpacity>
                  <Text style={styles.replyCount}>
                    {replies.length > 0 && (
                      <>
                        <Text style={styles.emoji}>🗨️</Text> {replies.length}
                      </>
                    )}
                  </Text>
                </View>
                <Text style={styles.content}>{content}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rightSideContainer}>
            <View style={styles.voteCountsContainer}>
              <Text style={[styles.voteCounts, { color: pickColor }]}>
                {localVoteCount}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleUpvote}>
                <AntDesign
                  name="up"
                  size={24}
                  color={hasUpvoted ? pickColor : COLORS.lightaccent}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDownvote}>
                <AntDesign
                  name="down"
                  size={24}
                  color={hasDownvoted ? pickColor : COLORS.lightaccent}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            onRequestClose={cancelReport}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  We take your safety seriously. Pressing accept will report this
                  comment and user to our moderation team.
                </Text>
                <View style={styles.modalButtons}>
                  <Pressable style={styles.confirmButton} onPress={confirmReport}>
                    <Text style={styles.confirmButtonText}>Yes, report</Text>
                  </Pressable>
                  <Pressable style={styles.cancelButton} onPress={cancelReport}>
                    <Text style={styles.cancelButtonText}>No thanks</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
      {isExpanded && renderReplies()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  replyCount: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.lightaccent, // Assuming secondary color for contrast
  },
  emoji: {
    fontSize: 16, // Emoji size
  },
  replyInputContainer: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 5,
  },
  replyTextInput: {
    flex: 1,
    padding: 8,
    borderColor: COLORS.lightaccent,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    color: COLORS.lightaccent,
    backgroundColor: COLORS.lighter, // Assuming a lighter theme color for input
  },
  replyButton: {
    backgroundColor: COLORS.primary, // Primary color for the button
    padding: 10,
    borderRadius: 5,
  },
  replyButtonText: {
    color: COLORS.white, // Text color for button
    fontWeight: 'bold',
  },
  bigContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    // borderWidth: 1,
    // borderColor: COLORS.lightaccent,
    // marginBottom: -10,
    // marginTop: 5,
    // borderRadius: 10,


  },
  biggerContainer: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.lightaccent,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  replyContainer: {
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    marginHorizontal: 15,
  },
  replyAuthor: {
    fontWeight: 'bold',
    color: COLORS.lightaccent,
  },
  replyContent: {
    color: COLORS.lightaccent,
  },
  commentContainer: {
    //
  },
  topPart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  leftSideContainer: {
    padding: 10,
    width: "70%",
  },
  reportButton: {
    marginBottom: 4,
  },
  iconContainer: {
    padding: 10,
  },
  voteCountsContainer: {
    padding: 10,
  },
  rightSideContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginRight: 6,
  },
  content: {
    color: COLORS.lightaccent,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 18,
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: COLORS.dark,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    color: COLORS.lightaccent,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: COLORS.lightaccent,
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  confirmButtonText: {
    color: COLORS.dark,
    textAlign: "center",
  },
  cancelButtonText: {
    color: COLORS.lightaccent,
    textAlign: "center",
  },
});

export default IndividualComment;
