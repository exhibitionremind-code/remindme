import { hasSupabase, supabase } from "./supabase";

export { hasSupabase };

export async function getSession() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function watchSession(callback) {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) =>
    callback(session),
  );
  return () => data.subscription.unsubscribe();
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signInOAuth(provider) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${window.location.origin}/` },
  });
  if (error) throw error;
}

export async function signUp({ email, password, fullName, phone }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, phone } },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email) {
  const redirectTo = `${window.location.origin}/`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });
  if (error) throw error;
}

export async function loadWorkspace(userId) {
  if (!supabase || !userId) return null;
  const [profileResult, taskResult, contactResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("tasks").select("*").order("created_at"),
    supabase.from("emergency_contacts").select("*").order("created_at"),
  ]);
  const error =
    profileResult.error || taskResult.error || contactResult.error || null;
  if (error) throw error;
  return {
    profile: profileResult.data,
    tasks: taskResult.data || [],
    contacts: contactResult.data || [],
  };
}

export async function saveProfile(userId, profile) {
  if (!supabase || !userId) return;
  const age = Number.parseInt(profile.age, 10);
  const { error } = await supabase.from("profiles").upsert({
    id: userId,
    full_name: profile.name,
    age: Number.isFinite(age) ? age : null,
    gender: profile.gender,
    phone: profile.phone,
    about: profile.about,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function replaceTasks(userId, tasks) {
  if (!supabase || !userId) return;
  const { error: deleteError } = await supabase
    .from("tasks")
    .delete()
    .eq("user_id", userId);
  if (deleteError) throw deleteError;
  if (!tasks.length) return;
  const rows = tasks.map((task) => ({
    user_id: userId,
    title: task.title,
    due_date: task.date || null,
    due_time: task.time || null,
    priority: task.priority,
    note: task.note || "",
    completed: Boolean(task.done),
  }));
  const { error } = await supabase.from("tasks").insert(rows);
  if (error) throw error;
}

export async function saveMood(userId, entry) {
  if (!supabase || !userId) return;
  const { error } = await supabase.from("mood_entries").insert({
    user_id: userId,
    mood: entry.mood,
    sleep_hours: Number(entry.sleep),
    stress_level: Number(entry.stress),
    influences: entry.influences || "",
  });
  if (error) throw error;
}

export async function saveScreening(userId, answers) {
  if (!supabase || !userId) return;
  const { error } = await supabase.from("screenings").insert({
    user_id: userId,
    answers,
    phq2_score: answers[0] + answers[1],
    gad2_score: answers[2] + answers[3],
  });
  if (error) throw error;
}

export async function addEmergencyContact(userId, contact) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase
    .from("emergency_contacts")
    .insert({
      user_id: userId,
      name: contact.name,
      relation: contact.relation,
      phone: contact.phone,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}
