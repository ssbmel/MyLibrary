import { Database } from './../../types/supabase';
import {createClient} from "@supabase/supabase-js";

const URL = process.env.REACT_APP_SUPABASE_URL as string;
const KEY = process.env.REACT_APP_SUPABASE_KEY as string;

const supabase = createClient<Database>(URL, KEY);

export default supabase;