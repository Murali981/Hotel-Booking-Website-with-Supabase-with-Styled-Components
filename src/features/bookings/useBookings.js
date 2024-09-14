import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const {
    isLoading,
    data: bookings, // We are renaming the data to bookings
    error,
  } = useQuery({
    queryKey: ["bookings"], // It will uniquely identify the data that we want to query here and the queryKey needs to be an array....
    queryFn: getBookings, // This is the actual query function which is resposible for querying (or) fetching  the data
    // through the API given by the react query from the supabase where the bookings data is stored.
  });

  return { isLoading, error, bookings };
}
