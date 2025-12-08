import { supabase } from '../SupabaseClient';

export async function signupUser({ email, password, name, phone, user_ip }) {
  // Step 1: Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) return { error: authError.message };

  // User must confirm email before they can sign in
  const userId = authData.user.id;

  // Step 2: Insert into profile table
  const { error: insertError } = await supabase.from("users").insert({
    id: userId,
    email,
    name,
    phone,
    role: "user",
    tier: "free",
    user_ip,
  });

  if (insertError) return { error: insertError.message };

  return { success: true };
}