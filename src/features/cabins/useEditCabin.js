import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
	const queryClient = useQueryClient();
	// THIS IS UPDATE
	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		// In react query you can only pass one element per function
		// so have to destructure it
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin successfully edited");
			// Invalidate queries after creation to re-fetch updated data
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			// reset form only when successfuly (thats why not in onSubmit)
			// reset();
		},
		onError: (err) => toast.error(err.message),
	});

	return { isEditing, editCabin };
}
