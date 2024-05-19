import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { COLORS, FONTS } from "../constants.js";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const IndividualComment = ({ spec, author, content, specColor, setSpecColor, voteCount, onUpvote, onDownvote, onReport }) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [localVoteCount, setLocalVoteCount] = useState(0);
  const [hasReported, setReported] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const colorVec = [
    '#ff006c', //hotpink
    '#f00f63', //pink
    '#f20d82', //pink/purple
    '#b813ec', //purple/blue
    '#551ee1', //bluer
    '#2052df', //light blue
    '#1cc8e3', //cyan
    '#22dd95', //mint
    '#e5f708', //yellow
    '#ff9200', //orange
    '#f94106', //red/orange
  ];

  useEffect(() => {
    setLocalVoteCount(voteCount);
  }, [voteCount]);

  const pickColor = React.useMemo(() => {
    return colorVec[Math.round(spec)];
  }, [spec, setSpecColor]);

  const handleUpvote = async () => {
    if (!hasUpvoted) {
      setHasUpvoted(true);
      setLocalVoteCount(prevCount => (hasDownvoted ? prevCount + 2 : prevCount + 1));
      if (hasDownvoted) {
        setHasDownvoted(false);
        onDownvote();
      }
      onUpvote();
    } else {
      setHasUpvoted(false);
      setLocalVoteCount(prevCount => prevCount - 1);
      onDownvote();
    }
  };

  const handleDownvote = async () => {
    if (!hasDownvoted) {
      setHasDownvoted(true);
      setLocalVoteCount(prevCount => (hasUpvoted ? prevCount - 2 : prevCount - 1));
      if (hasUpvoted) {
        setHasUpvoted(false);
        onUpvote();
      }
      onDownvote();
    } else {
      setHasDownvoted(false);
      setLocalVoteCount(prevCount => prevCount + 1);
      onUpvote();
    }
  };

  const handleReport = async () => {
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
    <View style={styles.bigContainer}>
      <View style={styles.leftSideContainer}>
        <View style={styles.commentContainer}>
          <View style={styles.topPart}>
            <Text style={[styles.author, { color: pickColor }]}>{author}</Text>
            <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
              <MaterialIcons name={hasReported ? "report" : "report-gmailerrorred"} size={20}
                color={hasReported ? pickColor : COLORS.gray} />
            </TouchableOpacity>
          </View>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
      <View style={styles.rightSideContainer}>
        <View style={styles.voteCountsContainer}>
          <Text style={[styles.voteCounts, { color: pickColor }]}>{localVoteCount}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleUpvote}>
            <AntDesign name="up" size={24} color={hasUpvoted ? pickColor : COLORS.lightaccent} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDownvote}>
            <AntDesign name="down" size={24} color={hasDownvoted ? pickColor : COLORS.lightaccent} />
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
            <Text style={styles.modalText}>We take your safety seriously. Pressing accept will report this comment and user to our moderation team.</Text>
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
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.lightaccent,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  commentContainer: {
    // 
  },
  topPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSideContainer: {
    padding: 10,
    width: '70%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: COLORS.dark,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color: COLORS.lightaccent,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: COLORS.lightaccent,
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
  },
  cancelButton: {
    // backgroundColor: COLORS.gray,
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  confirmButtonText: {
    color: COLORS.dark,
    textAlign: 'center',
  },
  cancelButtonText: {
    color: COLORS.lightaccent,
    textAlign: 'center',
  },
});

export default IndividualComment;
