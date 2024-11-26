import { Database } from './../../types/supabase';
import {createClient} from "@supabase/supabase-js";

const URL = import.meta.env.VITE_APP_SUPABASE_URL as string;
const KEY = import.meta.env.VITE_APP_SUPABASE_KEY as string;

const supabase = createClient<Database>(URL, KEY);

export default supabase;