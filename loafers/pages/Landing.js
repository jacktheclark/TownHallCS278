import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import { ADJECTIVES } from "../assets/adjectives.js";
import { NOUNS } from "../assets/nouns.js";
import { Ionicons } from "@expo/vector-icons";

export default function Landing({ navigation }) {
  const [displayName, setDisplayName] = useState("");

  const generateName = () => {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const generatedDisplayName = `${adj}${noun}`;
    setDisplayName(generatedDisplayName);
  };

  const handlePressLogin = () => {
    navigation.navigate("SignupScreen", { displayName });
    console.log("Pseudo chosen, proceeding to sign up with", displayName);
  };

  return (
    <View style={styles.container}>
      {/*<Text style={styles.instructionsText}>Welcome to TownHall</Text>*/}
      <Text style={styles.subtitleText}>
        Please choose a pseudonym to continue
      </Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.generateButton} onPress={generateName}>
          <Ionicons name="dice" size={32} color={COLORS.lightaccent} />
        </TouchableOpacity>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{displayName}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handlePressLogin}>
        <Text style={styles.loginButtonText}>Continue to Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.dark,
  },
  instructionsText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.lightaccent,
    marginTop: 60,
  },
  subtitleText: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.lightaccent,
    marginTop: 70,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  nameContainer: {
    width: 300,
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 24,
    fontFamily: FONTS.body,
    color: COLORS.lightaccent,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: COLORS.lightaccent,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 100,
  },
  loginButtonText: {
    color: COLORS.dark,
    textAlign: "center",
  },
  generateButton: {
    marginRight: 10,
  },
});
