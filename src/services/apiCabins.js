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

export async function createCabin(newCabin) {
	const { data, error } = await supabase
		.from("cabins")
		// inserting this works, because the field names
		// in the form are identical to the table/column names in supabase
		.insert([newCabin])
		.select();

	if (error) {
		console.error(error);
		throw new Error(`Cabin could not be created`);
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
