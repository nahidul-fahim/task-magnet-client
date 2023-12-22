import { FaRegSquarePlus } from "react-icons/fa6";



const Alltasks = () => {
    return (
        <div className="container mx-auto p-5 font-main flex flex-col justify-start items-start lg:min-h-[100vh] py-10">
            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center w-full gap-5">
                <h2 className="font-semibold text-3xl uppercase text-black">All Tasks</h2>
                <button className="primary-button flex justify-between items-center gap-2"><FaRegSquarePlus className="text-xl"/> Add New Task</button>
            </div>
        </div>
    );
};

export default Alltasks;