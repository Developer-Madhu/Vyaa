import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseServiceKey || !supabaseAnonKey) {
    console.warn("WARNING: Supabase environment variables are missing! Database operations will fail.");
}
export const supabase = supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })
    : null;
export const supabaseAnon = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
//# sourceMappingURL=supabase.js.map