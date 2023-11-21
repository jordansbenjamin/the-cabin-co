import supabase, { supabaseUrl } from "./supabase";

// Make sure to create a new policy for RLS
export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error(`Cabins could not be loaded`);
	}

	return data;
}

export async function createEditCabin(newCabin, id) {
	// URL format: https://ukdgkdugghmhfkvbfdsd.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
	const hasImagePath = newCabin.image?.startWith?.(supabaseUrl);

	// Supabase automatically creates folders with forward slashes
	// thats why we replace it
	// imageName has to be unique
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
	const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1) Create/edit cabin
	let query = supabase.from("cabins");

	// A) Create
	if (!id) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}

	// B) Edit
	if (id) {
		query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
	}

	const { data, error } = await query.select().single();

	// ABSTRACTED TO THE ABOVE TO REUSE WITH CREATING AND UPDATING
	// const { data, error } = await supabase
	// 	.from("cabins")
	// 	// inserting this works, because the field names
	// 	// in the form are identical to the table/column names in supabase
	// 	// when we create a new row in the table with this insert func
	// 	// will not immediately return that row
	// 	// adding .select and .single will return that newly created obj
	// 	.insert([{ ...newCabin, image: imagePath }])
	// 	.select()
	// 	.single();

	if (error) {
		console.error(error);
		throw new Error(`Cabin could not be created`);
	}

	// 2) Upload image
	const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);

	// 3) Delete the cabin if there was an error uploading image
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error(`Cabin image could not be uploaded and the cabin was not created`);
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
