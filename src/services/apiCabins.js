import supabase from "./supabase";

// Make sure to create a new policy for RLS
export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error(`Cabins could not be loaded`);
	}

	return data;
}

// Make sure to create a new policy for RLS
export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
		console.error(error);
		throw new Error(`Cabin could not be deleted`);
	}

    return data;
}
