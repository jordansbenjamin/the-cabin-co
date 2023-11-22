import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
	const queryClient = useQueryClient();
	// THIS IS UPDATE
	const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
		// In react query you can only pass one element per function
		// so have to destructure it
		mutationFn: updateSettingApi,
		onSuccess: () => {
			toast.success("Setting successfully edited");
			// Invalidate queries after creation to re-fetch updated data
			queryClient.invalidateQueries({ queryKey: ["settings"] });
			// reset form only when successfuly (thats why not in onSubmit)
			// reset();
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateSetting };
}
