import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://osbgpiylpllbrnhzmmno.supabase.co";
const supabaseKey = "sb_publishable_geuCaLRp1BHckFlD1LFfMw_Yrdue8I3";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
