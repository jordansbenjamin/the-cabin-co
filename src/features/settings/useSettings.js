import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
	const {
		isLoading,
		error,
		data: settingsData,
	} = useQuery({
		// to uniquely identify query in the cache
		queryKey: ["settings"],
		// func that returns promise (async func)
		queryFn: getSettings,
	});

	return { isLoading, error, settingsData };
}
