import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const getUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login/success`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error fetching user data");
    }
    const data = await response.json();
    return data.user;
  };

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 2,
    staleTime: 0,
    gcTime: 0,
  });

  return { user, loading: isLoading, error: isError };
};

export default useUser;
