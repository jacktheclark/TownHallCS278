import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://xovmexpzicgponxaqajs.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvdm1leHB6aWNncG9ueGFxYWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1OTAwMjcsImV4cCI6MjAzMDE2NjAyN30.4OJF6tuQuKOD799usnyTSWgFvvI2pPeqieUWMLGxS_0";

export default supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
