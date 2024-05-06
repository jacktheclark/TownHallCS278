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
        navigation.navigate("FeedScreen", { displayName });
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
        //onPress={() => navigation.navigate("SignupScreen", { displayName })}
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