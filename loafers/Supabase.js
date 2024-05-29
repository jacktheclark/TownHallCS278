import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://xovmexpzicgponxaqajs.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvdm1leHB6aWNncG9ueGFxYWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1OTAwMjcsImV4cCI6MjAzMDE2NjAyN30.4OJF6tuQuKOD799usnyTSWgFvvI2pPeqieUWMLGxS_0";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const postComment = async (comment) => {
  try {
    const { data, error } = await supabase.from('Comments').insert([comment]);
    if (error) {
      console.error('Error posting comment:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error posting comment:', error.message);
    return null;
  }
};

// Function to post a new reply
const postReply = async (reply) => {
  try {
    const { data, error } = await supabase.from('Replies').insert([reply]);
    if (error) {
      console.error('Error posting reply:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error posting reply:', error.message);
    return null;
  }
};

// Function to fetch replies for a specific comment
const fetchReplies = async (commentId) => {
  try {
    const { data, error } = await supabase
      .from('Replies')
      .select('*')
      .eq('comment_id', commentId);

    if (error) {
      console.error('Error fetching replies:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error fetching replies:', error.message);
    return null;
  }
};

export { supabase, postComment, postReply, fetchReplies };