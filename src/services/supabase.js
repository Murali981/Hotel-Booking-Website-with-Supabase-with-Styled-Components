import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zhpapjrtricjmvfeutri.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGFwanJ0cmljam12ZmV1dHJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4OTM2MzEsImV4cCI6MjAyMDQ2OTYzMX0.St7ieSvLPxpRiDB2CL-sXK9fV5JwjcQ-W3SXQu4Hwmw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
