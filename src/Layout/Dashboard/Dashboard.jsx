import { FaBars } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import { useEffect } from "react";


// website logo
const websiteLogo = "https://i.ibb.co/4mC89p5/favIcon.png";


const Dashboard = () => {


    // hooks and custom hooks
    const { logOut, currentUser, loading } = useAuthProvider();
    const { currentUserDBPending, currentUserDB } = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/dashboard/alltasks")
        }
    }, [currentUser, loading, navigate])



    // webstie navigation links
    const navbarLinks = <>
        <Link to="/" className="link-style flex justify-start items-center gap-2"><MdHome className="text-xl" /> Home</Link>
        <button onClick={() => logOut()} className="link-style flex justify-start items-start gap-2"><BiLogOut className="text-xl" /> Log out</button>
    </>



    // admin dashboard links
    const adminLinks = <>
        {/* statistics */}
        <NavLink to="/dashboard/alltasks"
            className={({ isActive }) => {
                return isActive ? "active-link-style" : "link-style"
            }}>
            All tasks
        </NavLink>
    </>




    return (
        <div className="font-main">

            <div className="drawer lg:drawer-open">

                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center p-5">
                    {/* Page content here */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="drawer-button glass-background p-0 lg:p-3 rounded-full text-third text-2xl lg:hidden absolute top-5 left-10"><FaBars /></label>
                </div>

                {/* drawer sidebar */}
                <div className="drawer-side p-3">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu p-4 w-[235px] min-h-full bg-[#e5e3eb] text-white font-medium flex flex-col justify-start items-start gap-5 rounded-none lg:rounded-[5px]">

                        {/* website logo */}
                        <Link to="/" className="w-full flex justify-center items-center">
                            <img src={websiteLogo} alt="Motor mingle logo" className="w-2/4 hover:scale-110 duration-300" />
                        </Link>

                        {/* current user info */}
                        {
                            currentUserDBPending ?
                                <>
                                    return <span className="loading loading-ball text-third loading-md"></span>
                                </>
                                :
                                <div className="flex justify-start items-center gap-5">
                                    <div tabIndex={0} role="button" className="avatar m-1">
                                        <div className="w-14 rounded-full">
                                            <img src={currentUserDB?.photo} alt="user photo" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-left text-[14px] font-medium text-black font-main">{currentUserDB?.name}</p>
                                        <p className="text-left text-[13px] font-medium text-lightblack font-main mt-1">Since: {currentUserDB?.registeredDate}</p>
                                    </div>

                                </div>

                        }

                        {/* Sidebar links here */}
                        <div className="w-full flex-grow flex flex-col content-between justify-between">
                            {/* user links */}
                            <div className="w-full flex flex-col justify-start items-start gap-2">
                                {adminLinks}
                            </div>

                            {/* navbarLinks links */}
                            <div className="w-full flex flex-col justify-start items-start gap-2">
                                {navbarLinks}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;