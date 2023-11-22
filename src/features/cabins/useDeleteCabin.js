import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

// This is a custom hook that is abstracted from CabinRow.jsx
// instead of adding this in the hooks folder, its added here instead
// only because its not a hook that is globally used by other features, only cabin
export function useDeleteCabin() {
	const queryClient = useQueryClient();

	// Mutating data with ReactQuery
	// mutate func is used to connect with the button
	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		// mutate will call this function
		// mutationFn: (id) => deleteCabin(id),
		// This is the same as the above because:
		// when mutationFn/mutate is later called with
		// an argument (like mutate(someId)), that argument
		// is passed to the deleteCabin function. This is because
		// mutationFn/mutate is essentially a reference to deleteCabin.
		mutationFn: deleteCabinApi,
		// tell ReactQuery what to do as soon as mutation is successful
		onSuccess: () => {
			toast.success("Cabin successfully deleted");
			// So we want to re-fetch the data, this is done through:
			// invalidating the cache as soon as mutation is done
			queryClient.invalidateQueries({
				// which exact data should be invalidated
				queryKey: ["cabins"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

    return {isDeleting, deleteCabin}
}
