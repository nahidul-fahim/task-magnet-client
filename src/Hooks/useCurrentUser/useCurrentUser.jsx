import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../useAuthProvider/useAuthProvider";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";


const useCurrentUser = () => {

    const axiosPublic = useAxiosPublic();

    // get the current signed in user
    const { currentUser } = useAuthProvider();
    const currentUserEmail = currentUser?.email;


    // get user from database
    const { isPending: currentUserDBPending, data: currentUserDB } = useQuery({
        queryKey: ["current-user", currentUserEmail],
        queryFn: async () => {
            const res = await axiosPublic.get(`/currentuser?email=${currentUserEmail}`)
            return res.data;
        }
    })

    return { currentUserDBPending, currentUserDB };
};

export default useCurrentUser;