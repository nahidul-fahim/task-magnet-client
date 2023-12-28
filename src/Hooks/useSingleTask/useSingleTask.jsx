import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";


const useSingleTask = (id) => {

    //hooks
    const axiosPublic = useAxiosPublic();

    const { isPending: singleTaskPending, data: singleTask, refetch: singleTaskRefetch } = useQuery({
        queryKey: ["all-tasks", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singletask/${id}`)
            return res.data;
        }
    })

    return { singleTaskPending, singleTask, singleTaskRefetch };
};

export default useSingleTask;