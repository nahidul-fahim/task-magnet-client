import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../useAuthProvider/useAuthProvider";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";


const useUserTasks = () => {

    //hooks
    const axiosPublic = useAxiosPublic();

    // get current user and email
    const { currentUser } = useAuthProvider();
    const email = currentUser?.email;

    const { isPending: alltasksPending, data: allTasks, refetch: allTasksRefetch } = useQuery({
        queryKey: ["all-tasks", email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/alltasks/${email}`)
            return res.data;
        }
    })



    return { alltasksPending, allTasks, allTasksRefetch };
};

export default useUserTasks;