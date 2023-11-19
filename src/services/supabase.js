import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ukdgkdugghmhfkvbfdsd.supabase.co";
// API key is protected by Supabase RLS security policy
// in this case can only read data, that is why its safe
// to expose this API key to the client
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrZGdrZHVnZ2htaGZrdmJmZHNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAzNjI1NDIsImV4cCI6MjAxNTkzODU0Mn0.zF7xbe1Ik5p1x5Ia-VT45QeKVy5DSraky19QJcXz7ok';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;