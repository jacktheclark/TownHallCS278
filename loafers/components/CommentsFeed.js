import React from 'react';
import { View, FlatList } from 'react-native';
import Comment from './IndividualComment.js'; // Import the Comment component
import { COLORS, FONTS } from "../constants.js";

const CommentsFeed = ({ comments }) => {

    //will eventually import the comments
    const testComments = [
        { spectrum: 8.3, id: 1, author: 'ZestyPenguin', content: 'my name is jef' },
        { spectrum: 1.2, id: 2, author: 'FerociousCapybara', content: 'my brother in christ u made da sandwich' },
        { spectrum: 4.2, id: 3, author: 'TingusPingus', content: 'yo yo yo its ya boi' },
        { spectrum: 6.5, id: 4, author: 'MalevolentAardvark', content: 'Why cant we talk about the political and economic state of the world rn?' },
      ];


  return (
    <View>
      <FlatList
        data={testComments}
        renderItem={({ item }) => (
          <Comment spec={item.spectrum} author={item.author} content={item.content} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default CommentsFeed;
