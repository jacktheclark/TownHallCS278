import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS } from "../constants.js";
import CommentsFeed from "../components/CommentsFeed.js";
import DiscussionTopic from "../components/DiscussionTopic.js";
import SliderComponent from "../components/SliderComponent.js";
import WriteComment from "../components/WriteComment.js";
import supabase from "../Supabase.js";

export default function Feed({ navigation, route }) {
  const [hasCommented, showComments] = useState(false);
  const { displayName } = route.params;
  console.log("Display Name (feed):", displayName);
  useEffect(() => {
    async function updateUserInfo() {
      try {
        const { data: user } = await supabase.auth.getUser();

        if (user) {
          // Check if the user exists in the "UserInfo" table
          const { data: existingUserInfo, error: existingUserInfoError } =
            await supabase
              .from("UserInfo")
              .select("*")
              .eq("userid", user.user.id);

          if (existingUserInfoError) {
            console.error(
              "Error fetching UserInfo:",
              existingUserInfoError.message
            );
          } else {
            if (existingUserInfo.length === 0) {
              // If the user doesn't exist, insert a new row for the user
              const { data: newUserRow, error: newUserRowError } =
                await supabase
                  .from("UserInfo")
                  .insert({ userid: user.user.id, pseudo: displayName });

              if (newUserRowError) {
                console.error(
                  "Error inserting new user row:",
                  newUserRowError.message
                );
              } else {
                console.log("New user row inserted successfully:", newUserRow);
              }
            } else {
              // If the user already exists, update the existing row
              const { data: updatedUserInfo, error: updateUserInfoError } =
                await supabase
                  .from("UserInfo")
                  .update({ pseudo: displayName })
                  .eq("userid", user.user.id);

              if (updateUserInfoError) {
                console.error(
                  "Error updating UserInfo:",
                  updateUserInfoError.message
                );
              } else {
                console.log("UserInfo updated successfully:", updatedUserInfo);
              }
            }
          }
        } else {
          console.error("User not found.");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    // Call the function when the component mounts
    updateUserInfo();
  }, [displayName]);
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.testText}>feed screen</Text> */}
      <DiscussionTopic question={"insert controversial question here"}/>
      <SliderComponent />
      {hasCommented ? (
        <CommentsFeed/>
        
      ) : (
        <WriteComment 
        hasCommented={hasCommented} 
        showComments={showComments}/>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background_dark,
    borderRadius: 20,
    //borderColor: "red",
    //borderWidth: 5,
  },
  testText: {
    marginTop: 100,
    marginBottom: 50,
    color: "white",
    fontSize: 24,
    fontFamily: FONTS.body,
    color: COLORS.lightaccent,
  },
});
