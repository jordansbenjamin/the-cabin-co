import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

// ABSTRACTED FROM CreateCabinForm.jsx
export function useCreateCabin() {
	const queryClient = useQueryClient();
	// whenever we change data, perform CRUD operations using mutate
	// THIS IS CREATE
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success("New cabin successfully created");
			// Invalidate queries after creation to re-fetch updated data
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			// reset form only when successfuly (thats why not in onSubmit)
			// reset();
		},
		onError: (err) => toast.error(err.message),
	});

    return {isCreating, createCabin}
}
