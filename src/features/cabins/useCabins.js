import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins, // We are renaming the data to cabins
    error,
  } = useQuery({
    queryKey: ["cabins"], // It will uniquely identify the data that we want to query here and the queryKey needs to be an array....
    queryFn: getCabins, // This is the actual query function which is resposible for querying (or) fetching  the data
    // through the API given by the react query from the supabase where the cabin data is stored.
  });

  return { isLoading, error, cabins };
}
