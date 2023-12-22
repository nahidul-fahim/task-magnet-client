import { useForm } from "react-hook-form";
import { FaRegSquarePlus } from "react-icons/fa6";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import LoadingAnimation from "../../../Shared/LoadingAnimation/LoadinAnimation";



const Alltasks = () => {


    // hooks
    const axiosPublic = useAxiosPublic();
    const { loading, currentUser } = useAuthProvider();

    // react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    if (loading) {
        return <LoadingAnimation />
    }


    // get todays date
    const todayDate = new Date().toISOString().split('T')[0];



    // handle login form submit
    const onSubmit = data => {

        const user = currentUser?.displayName;
        const userEmail = currentUser?.email;
        const title = data.title;
        const description = data.description;
        const taskPriority = data.taskPriority;
        const taskDeadlineDate = data.deadline;
        const taskAddingDate = todayDate;

        const newTaskInfo = { user, userEmail, title, description, taskPriority, taskDeadlineDate, taskAddingDate }


        axiosPublic.post("/newtask", newTaskInfo)
            .then(res => {
                const data = res.data;
                console.log(data)
                if (data.insertedId) {
                    successNotify("New task added")
                    // close the modal after task is added successfully
                    const taskAddingModal = document.getElementById("taskAddingModal");
                    taskAddingModal.close();
                }
            })
            .catch(err => {
                failedNotify(err.code + "||" + err.message)
            })
    }



    // success notify
    const successNotify = (successMessage) => toast.success(`${successMessage}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });

    // failed notify
    const failedNotify = (errorMessage) => toast.error(`${errorMessage}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });





    return (
        <div className="container mx-auto p-5 font-main flex flex-col justify-start items-start lg:min-h-[100vh] py-10">

            {/* all tasks heading + button */}
            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center w-full gap-5">
                <h2 className="font-semibold text-3xl uppercase text-black">All Tasks</h2>
                <button
                    className="primary-button flex justify-between items-center gap-2"
                    onClick={() => document.getElementById('taskAddingModal').showModal()}
                ><FaRegSquarePlus className="text-xl" /> Add New Task</button>
            </div>



            {/* modal to add tasks */}
            <dialog id="taskAddingModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box w-full flex flex-col justify-center items-center gap-2">
                    <h3 className="font-bold text-2xl">Add new Task!</h3>
                    <div className="modal-action w-full">

                        {/* login form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto flex flex-col justify-center items-start gap-5">


                            {/* title input */}
                            <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                                <label className="label">
                                    <span className="label-text font-body text-lightblack font-semibold">Enter task title<span className="text-[red]">*</span></span>
                                </label>
                                <input type="text" className="w-full bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-2 rounded-[5px] focus:outline-none focus:border-third font-body text-black focus:bg-white"
                                    placeholder="Task title" {...register("title", { required: true })} />
                                {errors.title && <span className="font-main text-[14px] text-[#a12121] font-medium">This field is required</span>}
                            </div>


                            {/* description input */}
                            <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                                <label className="label">
                                    <span className="label-text font-body text-lightblack font-semibold">Enter task description<span className="text-[red]">*</span></span>
                                </label>
                                <textarea className="w-full bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-2 rounded-[5px] focus:outline-none focus:border-third font-body text-black focus:bg-white"
                                    placeholder="Task description" {...register("description", { required: true })} />
                                {errors.description && <span className="font-main text-[14px] text-[#a12121] font-medium">This field is required</span>}
                            </div>



                            {/* task priority input */}
                            <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                                <label className="label">
                                    <span className="label-text font-body text-lightblack font-semibold">Select task priority<span className="text-[red]">*</span></span>
                                </label>
                                <select className="w-full bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-2 rounded-[5px] focus:outline-none focus:border-third font-body text-lightblack focus:bg-white"
                                    defaultValue="Select task priority"
                                    {...register("taskPriority", { required: true })}>
                                    <option disabled value="Select task priority">Select task priority</option>
                                    <option value="normal">Normal</option>
                                    <option value="important">Important</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                                {errors.taskPriority && <span className="font-main text-[14px] text-[#a12121] font-medium">This field is required</span>}
                            </div>


                            {/* deadline field */}
                            <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                                <label className="label">
                                    <span className="label-text font-body text-lightblack font-semibold">Select deadline<span className="text-[red]">*</span></span>
                                </label>
                                <input type="date" min={todayDate} {...register("deadline", { required: true })}
                                    className="w-full bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-2 rounded-[5px] focus:outline-none focus:border-third font-body text-lightblack focus:bg-white" />
                                {errors.deadline && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                            </div>


                            {/* submit button */}
                            <div className="w-full flex flex-col justify-center items-center lg:items-start">
                                <input type="submit" value="Add Task" className="primary-button cursor-pointer" />
                            </div>

                            <ToastContainer closeButton={false} className="z-[99]"/>

                        </form>













                    </div>
                </div>
            </dialog>




        </div>
    );
};

export default Alltasks;