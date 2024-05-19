import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { supabase, postComment } from "../Supabase.js";
import { COLORS, FONTS } from "../constants.js";

const Signup = ({ navigation, route }) => {
  const { xemail, xpassword, displayName } = route.params;
  const [finalEmail, setEmail] = useState(xemail);
  const [finalPass, setPassword] = useState(xpassword);
  const [error, setError] = useState(null);

  async function updateUserInfo() {
    try {
      const { data: user } = await supabase.auth.getUser();

      if (user) {
        //does uer exist
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
            //new row in the db
            const { data: newUserRow, error: newUserRowError } = await supabase
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
            //update existing row
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

  async function signUpNewUser() {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: finalEmail,
        password: finalPass,
        options: {
          data: {
            first_name: displayName,
          },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        await updateUserInfo();
        navigation.navigate("FeedScreen", { displayName });
        console.log("Signed up");
      }
    } catch (error) {
      console.error("Sign in error:", error.message);
    }
  }

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.instructionsText}>Nice to meet you, {displayName}! Please finish signing up to continue.</Text>
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
        value={finalEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={finalPass}
        placeholder="Password"
        secureTextEntry
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <TouchableOpacity
        onPress={signUpNewUser}
        style={styles.loginButton}
      >
        <Text style={styles.loginButtonText}>
          Sign Up & Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: COLORS.dark,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: COLORS.lightaccent,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: COLORS.lightaccent,
  },
  loginButton: {
    backgroundColor: COLORS.lightaccent,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  loginButtonText: {
    color: COLORS.dark,
    textAlign: "center",
  },
  suButtonText: {
    color: COLORS.lightaccent,
    fontFamily: FONTS.body,
    textAlign: "center",
  },
  instructionsText: {
    // alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.lightaccent,
    marginTop: 60,
  },
});


export default Signup;
