import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from "../constants.js";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FilterButtons = ({ specColor, sortOption, setSortOption }) => {

  const handleFilterChange = (newSort) => {
    setSortOption(newSort)
  };

  return (
    <View style={styles.buttonHolder}>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => handleFilterChange('New')}
      >
        <AntDesign name={sortOption === 'New' ? "clockcircle" : "clockcircleo"} size={24} 
            color={sortOption === 'New' ? specColor : COLORS.lightaccent} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => handleFilterChange('Hot')}
      >
        {sortOption === 'Hot' ? (
            <Feather name="trending-up" size={24} color={specColor} />
        ) : (
            <Ionicons name="trending-up" size={24} color={COLORS.lightaccent} />
        )}
        
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => handleFilterChange('Similar')}
      >
        <AntDesign name={sortOption === 'Similar' ? "eye" : "eyeo"} size={24} 
            color={sortOption === 'Similar' ? specColor : COLORS.lightaccent}  />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => handleFilterChange('Dissimilar')}
      >
        <Ionicons name={sortOption === 'Dissimilar' ? "telescope" : "telescope-outline"} size={24} 
            color={sortOption === 'Dissimilar' ? specColor : COLORS.lightaccent}  />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 16,
    paddingBottom: 16,
    borderWidth: 1,
    borderTopColor: COLORS.lightaccent,
    marginTop: 12,
    marginBottom: 12,
  },
  sortButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    borderWidth: 1,
  },
  sortText: {
    color: COLORS.lightaccent,
    fontFamily: FONTS.body,
    fontSize: 14,
  },
});

export default FilterButtons;
