import { useForm } from "react-hook-form";
import { FaRegSquarePlus } from "react-icons/fa6";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import LoadingAnimation from "../../../Shared/LoadingAnimation/LoadinAnimation";
import useUserTasks from "../../../Hooks/useUserTasks/useUserTasks";
import { useEffect, useRef, useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import useSingleTask from "../../../Hooks/useSingleTask/useSingleTask";



const Alltasks = () => {

    // hooks
    const axiosPublic = useAxiosPublic();
    const { loading, currentUser } = useAuthProvider();
    const updatingForm = useRef(null);

    // get states
    const [toDoTasks, setToDoTasks] = useState('');
    const [inProgressTasks, setInProgressTasks] = useState('');
    const [completedTasks, setCompletedTasks] = useState('');
    const [updateTaskId, seUpdateTaskId] = useState(' ');

    // get task from custom hooks
    const { alltasksPending, allTasks, allTasksRefetch } = useUserTasks();
    const { singleTask, singleTaskRefetch } = useSingleTask(updateTaskId);


    // react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()


    // get the filtered tasks
    useEffect(() => {
        if (allTasks) {
            const toDoTasks = allTasks.filter(singleTask => singleTask.taskStatus === "todo")
            setToDoTasks(toDoTasks);
            const inProgressTasks = allTasks.filter(singleTask => singleTask.taskStatus === "inProgress")
            setInProgressTasks(inProgressTasks);
            const completedTasks = allTasks.filter(singleTask => singleTask.taskStatus === "completed")
            setCompletedTasks(completedTasks);
        }
    }, [allTasks, alltasksPending])



    // conditional loading state
    if (loading || alltasksPending) {
        return <LoadingAnimation />
    }


    // get todays date
    const todayDate = new Date().toISOString().split('T')[0];


    // handle new task adding
    const onSubmit = data => {
        const user = currentUser?.displayName;
        const userEmail = currentUser?.email;
        const title = data.title;
        const description = data.description;
        const taskPriority = data.taskPriority;
        const taskDeadlineDate = data.deadline;
        const taskAddingDate = todayDate;
        const taskStatus = "todo";

        const newTaskInfo = { user, userEmail, title, description, taskPriority, taskDeadlineDate, taskAddingDate, taskStatus }

        axiosPublic.post("/newtask", newTaskInfo)
            .then(res => {
                const data = res.data;
                if (data.insertedId) {
                    allTasksRefetch();
                    reset();
                    successNotify("New task added")
                    const taskAddingModal = document.getElementById("taskAddingModal");
                    taskAddingModal.close();
                }
            })
            .catch(err => {
                failedNotify(err.code + "||" + err.message)
            })
    }



    // get data for the update and open modal
    const getUpdateData = id => {
        seUpdateTaskId(id);
        const taskUpdatingModal = document.getElementById('taskUpdatingModal')
        taskUpdatingModal.showModal();
    }


    // close update modal
    const closeUpdateModal = () => {
        const taskUpdatingModal = document.getElementById('taskUpdatingModal')
        taskUpdatingModal.close();
    }



    // send the update data to databse
    const handleTaskUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const taskPriority = form.taskPriority.value;
        const taskDeadlineDate = form.taskDeadlineDate.value;
        const taskUpdatingDate = todayDate;

        const updatedTaskInfo = { title, description, taskPriority, taskDeadlineDate, taskUpdatingDate }

        // send updated data to the database
        axiosPublic.put(`/updatetask/${updateTaskId}`, updatedTaskInfo)
            .then(res => {
                const data = res.data;
                if (data.modifiedCount > 0) {
                    singleTaskRefetch();
                    allTasksRefetch();
                    updatingForm.current.reset();
                    successNotify("Task updated")
                    // close the modal after task is added successfully
                    const taskUpdatingModal = document.getElementById("taskUpdatingModal");
                    taskUpdatingModal.close();
                }
            })
            .catch(err => {
                failedNotify(err.code + "||" + err.message)
            })
    }


    // handle task deletion
    const handleDelete = id => {
        axiosPublic.delete(`/deletetask/${id}`)
            .then(res => {
                const data = res.data;
                if (data.deletedCount > 0) {
                    successNotify("Task deleted successfully")
                    allTasksRefetch();
                }
            })
            .catch(err => {
                failedNotify(err.code + "||" + err.message)
            })
    }



    // update task  status
    const updateTaskStatus = (id, status) => {
        const taskStatus = status;
        const updatedStatus = { taskStatus };


        // send updated data to the database
        axiosPublic.put(`/updatetaskstatus/${id}`, updatedStatus)
            .then(res => {
                const data = res.data;
                if (data.modifiedCount > 0) {
                    singleTaskRefetch();
                    allTasksRefetch();
                }
            })
            .catch(err => {
                failedNotify(err.code + "||" + err.message)
            })
    }


    // success notify
    const successNotify = (successMessage) => toast.success(`${successMessage}`, {
        position: "top-right",
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
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });



    if (!toDoTasks || !inProgressTasks || !completedTasks) {
        return <p>loading</p>
    }


    return (
        <div className="container mx-auto font-main flex flex-col justify-start items-start lg:min-h-[100vh] py-10">

            <ToastContainer closeButton={false} className="z-[99]" />

            {/* all tasks heading + button */}
            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center w-full gap-5">
                <h2 className="font-semibold text-3xl uppercase text-black">All Tasks</h2>
                <button
                    className="primary-button flex justify-between items-center gap-2"
                    onClick={() => document.getElementById('taskAddingModal').showModal()}
                ><FaRegSquarePlus className="text-xl" /> Add New Task</button>

            </div>


            {/* tasks showing table */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-[50px]">


                {/* to do tasks */}
                <div className="flex flex-col justify-start items-start gap-7 bg-[#ebebeb] py-4 px-3 rounded-[5px]">
                    <h3 className="font-semibold text-lightblack text-xl">To-do</h3>
                    {
                        toDoTasks.map((singleTask, index) =>
                            <div
                                key={index}
                                className="bg-white py-4 px-3 rounded flex flex-col justify-start items-start gap-4 min-w-full z-[99]">

                                <div className="w-full flex justify-between items-center gap-5">
                                    <p className={`capitalize ${singleTask?.taskPriority === "urgent" ? "urgent-priority" : singleTask?.taskPriority === "important" ? "important-priority" : "normal-priority"}`}>{singleTask?.taskPriority}</p>

                                    <div className="flex justify-end items-center gap-2 text-lightwhite">
                                        <button onClick={() => getUpdateData(singleTask?._id)}><MdModeEditOutline /></button>
                                        <button onClick={() => handleDelete(singleTask?._id)}><MdDelete /></button>
                                    </div>
                                </div>

                                <h3 className="text-[16px] font-medium text-black">{singleTask?.title}</h3>

                                <p className="text-[14px] text-lightblack">{singleTask?.description}</p>

                                <p className="text-[14px] text-lightblack">Deadline: {singleTask?.taskDeadlineDate}</p>

                                {
                                    singleTask?.taskDeadlineDate === todayDate ? <p className="deadline-notification">You have a deadline today</p> : ""

                                }

                                <div className="w-full flex justify-start items-center gap-3">
                                    <button className="button-inprogress"
                                        onClick={() => updateTaskStatus(singleTask?._id, "inProgress")}
                                    >
                                        Mark In Progress
                                    </button>

                                    <button className="button-complete"
                                        onClick={() => updateTaskStatus(singleTask?._id, "completed")}
                                    >
                                        Mark Complete
                                    </button>
                                </div>

                            </div>
                        )
                    }
                </div>

                {/* in progress tasks */}
                <div className="flex flex-col justify-start items-start gap-7 bg-[#d8efff] py-4 px-3 rounded-[5px]">
                    <h3 className="font-semibold text-[#4ea0ff] text-xl">In progress</h3>
                    {
                        inProgressTasks.map((singleTask, index) =>
                            <div key={index}
                                className="bg-white py-4 px-3 rounded flex flex-col justify-start items-start gap-4 min-w-full">

                                <div className="w-full flex justify-between items-center gap-5">
                                    <p className={`capitalize ${singleTask?.taskPriority === "urgent" ? "urgent-priority" : singleTask?.taskPriority === "important" ? "important-priority" : "normal-priority"}`}>{singleTask?.taskPriority}</p>

                                    <div className="flex justify-end items-center gap-2 text-lightwhite">
                                        <button onClick={() => getUpdateData(singleTask?._id)}><MdModeEditOutline /></button>
                                        <button onClick={() => handleDelete(singleTask?._id)}><MdDelete /></button>
                                    </div>
                                </div>

                                <h3 className="text-[16px] font-medium text-black">{singleTask?.title}</h3>

                                <p className="text-[14px] text-lightblack">{singleTask?.description}</p>

                                <p className="text-[14px] text-lightblack">Deadline: {singleTask?.taskDeadlineDate}</p>

                                {
                                    singleTask?.taskDeadlineDate === todayDate ? <p className="deadline-notification">You have a deadline today</p> : ""

                                }

                                <div className="w-full flex justify-start items-center gap-3">

                                    <button className="button-complete"
                                        onClick={() => updateTaskStatus(singleTask?._id, "completed")}
                                    >
                                        Mark Complete
                                    </button>
                                </div>

                            </div>
                        )
                    }
                </div>

                {/* completed tasks */}
                <div className="flex flex-col justify-start items-start gap-7 bg-[#e2ffed] py-4 px-3 rounded-[5px]">
                    <h3 className="font-semibold text-[#189418] text-xl">Completed</h3>
                    {
                        completedTasks.map((singleTask, index) =>
                            <div key={index}
                                className="bg-white py-4 px-3 rounded flex flex-col justify-start items-start gap-4 min-w-full">

                                <div className="w-full flex justify-between items-center gap-5">
                                    <p className={`capitalize ${singleTask?.taskPriority === "urgent" ? "urgent-priority" : singleTask?.taskPriority === "important" ? "important-priority" : "normal-priority"}`}>{singleTask?.taskPriority}</p>

                                    <div className="flex justify-end items-center gap-2 text-lightwhite">
                                        <button onClick={() => getUpdateData(singleTask?._id)}><MdModeEditOutline /></button>
                                        <button onClick={() => handleDelete(singleTask?._id)}><MdDelete /></button>
                                    </div>
                                </div>

                                <h3 className="text-[16px] font-medium text-black">{singleTask?.title}</h3>

                                <p className="text-[14px] text-lightblack">{singleTask?.description}</p>

                                <p className="text-[14px] text-lightblack">Deadline: {singleTask?.taskDeadlineDate}</p>

                            </div>
                        )
                    }
                </div>
            </div>




            {/* modal to add tasks */}
            <dialog id="taskAddingModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box w-full flex flex-col justify-center items-center gap-2">
                    <h3 className="font-bold text-2xl">Add new Task!</h3>
                    <div className="modal-action w-full">

                        {/* task adding form */}
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

                        </form>
                    </div>
                </div>
            </dialog>



            {/* modal to update tasks */}
            <dialog id="taskUpdatingModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box w-full flex flex-col justify-center items-center gap-2 relative">
                    <h3 className="font-bold text-2xl">Add new Task!</h3>
                    <div className="modal-action w-full">

                        {/* task updating form */}
                        <form onSubmit={handleTaskUpdate} ref={updatingForm} className="w-full h-auto flex flex-col justify-center items-start gap-5">

                            {/* title input */}
                            <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                                <label className="label">
                                    <span className="label-text font-body text-lightblack font-semibold">Task title<span className="text-[red]">*</span></span>
                                </label>
                                <input required type="text" name="title" id="title"
                                    defaultValue={singleTask?.title}
                                    className="w-full bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-2 rounded-[5px] focus:outline-none focus:border-third font-body text-black focus:bg-white"
                                />
                            </div>


                            {/* description input */}
                            <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                                <label className="label">
                                    <span className="label-text font-body text-lightblack font-semibold">Task description<span className="text-[red]">*</span></span>
                                </label>
                                <textarea required defaultValue={singleTask?.description}
                                    name="description" id="description"
                                    className="w-full bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-2 rounded-[5px] focus:outline-none focus:border-third font-body text-black focus:bg-white" />
                            </div>



                            {/* task priority input */}
                            <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                                <label className="label">
                                    <span className="label-text font-body text-lightblack font-semibold">Task priority<span className="text-[red]">*</span></span>
                                </label>
                                <select required defaultValue={singleTask?.taskPriority} name="taskPriority" id="taskPriority"
                                    className="w-full bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-2 rounded-[5px] focus:outline-none focus:border-third font-body text-lightblack focus:bg-white">
                                    <option disabled value="Select task priority">Select task priority</option>
                                    <option value="normal">Normal</option>
                                    <option value="important">Important</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>


                            {/* deadline field */}
                            <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                                <label className="label">
                                    <span className="label-text font-body text-lightblack font-semibold">Deadline<span className="text-[red]">*</span></span>
                                </label>
                                <input required type="date" min={todayDate} name="taskDeadlineDate" id="taskDeadlineDate"
                                    className="w-full bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-2 rounded-[5px] focus:outline-none focus:border-third font-body text-lightblack focus:bg-white" />
                            </div>


                            {/* submit button */}
                            <div className="w-full flex flex-col justify-center items-center lg:items-start">
                                <input type="submit" value="Update Task" className="primary-button cursor-pointer" />
                            </div>
                        </form>
                    </div>

                    <div className="w-fit flex justify-start items-start absolute top-5 right-7">
                        <button onClick={closeUpdateModal} className="text-2xl"><GrClose /> </button>
                    </div>

                </div>
            </dialog>



        </div>
    );
};

export default Alltasks;