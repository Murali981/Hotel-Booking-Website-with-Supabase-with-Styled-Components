import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*"); // This line means that we will get all the cabins that we have stored
  // in the cabins table which is stored in the supabase and "*" says that we want all of them.

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id); // This code you can get from supabase API Docs

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
} // By default row-level security will be availed on all the tables that we have created in the supabase . So we have go to the supabase
// Website and then go to to security policies and disable the row-level security. If you forgot to disable the row-level security then
// if you call the function here then no cabin will get deleted.
