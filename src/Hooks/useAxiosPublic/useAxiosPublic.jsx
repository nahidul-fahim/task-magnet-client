import axios from "axios";

// create axios instance
const axiosPublic = axios.create({
    baseURL: "https://task-magnet-server-beta.vercel.app"
})


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;