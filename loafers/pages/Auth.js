import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
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
    <View style={styles.container}>
      <View
        style={{
          height: 50,
        }}
      ></View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={xemail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={xpassword}
        placeholder="Password"
        secureTextEntry
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Pressable onPress={signInWithEmail} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </Pressable>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignupScreen", { displayName })}
        style={styles.suButton}
      >
        <Text style={styles.suButtonText}>Sign Up</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});

export default Auth;
