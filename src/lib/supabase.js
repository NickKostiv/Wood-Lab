import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (typeof window !== "undefined" && (!supabaseUrl || !supabaseKey)) {
  console.warn("Missing Supabase credentials");
}

export const supabase = createClient(
  supabaseUrl || "https://vpgxfvzpjhqkvmyssjgv.supabase.co",
  supabaseKey ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZ3hmdnpwamhxa3ZteXNzamd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNTExNTQsImV4cCI6MjA1NDYyNzE1NH0.sVLEZbcwig2Dj_qr-jyLjQpSL4DwCgcbEKIBsEHPa1Y"
);
