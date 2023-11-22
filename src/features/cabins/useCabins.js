import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
    const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		// queryKey uniquely identifies the data we are going to query
		// has to be an array with a string or other complexities
		queryKey: ["cabins"],
		// queryFn is responsible for querying/fetching data from API
		// specified func needs to return a promise
		// whatever data is returned will be stored in the cache
		queryFn: getCabins,
	});

    return {isLoading, error, cabins}
}