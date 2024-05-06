import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import supabase from "../Supabase.js";
import { COLORS, FONTS } from "../constants.js";

const Signup = ({ navigation, route }) => {
  const { displayName } = route.params;
  const [xemail, setEmail] = useState("");
  const [xpassword, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function signUpNewUser() {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: xemail,
        password: xpassword,
        options: {
          data: {
            first_name: displayName,
          },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log(user.id);

        if (user) {
          // Insert a new row for the user
          const { data: newUserRow, error: newUserRowError } = await supabase
            .from("UserInfo")
            .insert([{ userid: user.id, pseudo: displayName }]);

          if (newUserRowError) {
            console.error(
              "Error inserting new user row:",
              newUserRowError.message
            );
          } else {
            console.log("New user row inserted successfully:", newUserRow);
          }
        } else {
          console.error("User not found.");
        }

        navigation.navigate("FeedScreen");
        console.log("Signed up");
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
      <TouchableOpacity
        onPress={signUpNewUser}
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
        <Text style={{ color: COLORS.dark, fontSize: 25 }}>
          Sign Up & Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
