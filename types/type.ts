import { Tables } from './supabase';

export type User = Tables<"users">;

export type Review = Tables<"reviews">;