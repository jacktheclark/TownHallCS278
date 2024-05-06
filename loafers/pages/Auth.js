import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import supabase from "../Supabase.js";
import { COLORS, FONTS } from "../constants.js";
import { colorsDark } from "react-native-elements/dist/config/index.js";

const Auth = ({ navigation, route }) => {
  const { displayName } = route.params;
  const [xemail, setEmail] = useState("");
  const [xpassword, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function signInWithEmail() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: xemail,
        password: xpassword,
      });
      if (error) {
        setError(error.message);
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log(user.id);

        if (user) {
          // Check if the user exists in the "UserInfo" table
          const { data: existingUserInfo, error: existingUserInfoError } =
            await supabase.from("UserInfo").select("*").eq("userid", user.id);

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
                  .insert({ userid: user.id, pseudo: displayName });

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
                  .eq("userid", user.id);

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

        navigation.navigate("FeedScreen");
        console.log("Logged in");
      }
    } catch (error) {
      console.error("Sign in error:", error.message);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: COLORS.dark,
      }}
    >
      <View
        style={{
          height: 50,
        }}
      ></View>
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: COLORS.lightaccent,
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
          borderRadius: 10,
          color: COLORS.lightaccent,
        }}
        onChangeText={(text) => setEmail(text)}
        value={xemail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: COLORS.lightaccent,
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
          borderRadius: 10,
          color: COLORS.lightaccent,
        }}
        onChangeText={(text) => setPassword(text)}
        value={xpassword}
        placeholder="Password"
        secureTextEntry
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Pressable
        onPress={signInWithEmail}
        style={{
          width: 300,
          height: 40,
          backgroundColor: COLORS.lightaccent,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: COLORS.dark, fontSize: 25 }}>Log In</Text>
      </Pressable>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignupScreen", { displayName })}
        style={{
          width: 300,
          height: 50,
          backgroundColor: COLORS.dark,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "gray",
            fontSize: 18,
            textDecorationLine: "underline",
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
      {/*  
      <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
        <Text
          style={{ textDecorationLine: "underline", marginTop: 10 }}
          onPress={navigation.navigate("SignupScreen")}
        >
          Sign Up
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Auth;
