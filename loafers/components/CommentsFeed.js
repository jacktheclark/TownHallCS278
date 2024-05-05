import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Comment from "./IndividualComment.js"; // Import the Comment component
import { COLORS, FONTS } from "../constants.js";
import supabase from "../Supabase.js";

const CommentsFeed = ({ comments }) => {
  const [fetchError, setFetchError] = useState(null);
  const [testComments, setTestComments] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from("Comments").select();

      if (error) {
        setFetchError("Could not fetch");
        console.log(error);
      }
      if (data) {
        setTestComments(data);
        console.log(data);
        setFetchError(null);
      }
    };
    fetch();
  }, []);

  //will eventually import the comments
  //const testComments = [
  //  { spectrum: 8.3, id: 1, author: 'ZestyPenguin', content: 'my name is jef' },
  //{ spectrum: 1.2, id: 2, author: 'FerociousCapybara', content: 'my brother in christ u made da sandwich' },
  // { spectrum: 4.2, id: 3, author: 'TingusPingus', content: 'yo yo yo its ya boi' },
  // { spectrum: 6.5, id: 4, author: 'MalevolentAardvark', content: 'Why cant we talk about the political and economic state of the world rn?' },
  //];

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={testComments}
        renderItem={({ item }) => (
          <Comment
            spec={item.spectrum}
            author={item.author}
            content={item.content}
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
