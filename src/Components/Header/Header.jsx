import { Link, NavLink } from "react-router-dom";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import LoadingAnimation from "../../Shared/LoadingAnimation/LoadinAnimation";


// images
const websiteLogo = "https://i.ibb.co/K9ndz8T/website-Logo.png";


const Header = () => {

    // hooks
    const { currentUserDBPending, currentUserDB } = useCurrentUser();
    const { currentUser, logOut } = useAuthProvider();


    if (currentUserDBPending) {
        return <LoadingAnimation />
    }



    // handle logout
    const handleLogOut = () => {
        logOut()
            .then(() => {
                //
            })
            .catch(() => {
                //
            })
    }


    // navigation bar links
    const links = <>
        <NavLink to="/" className="hover:text-sub duration-200">Home</NavLink>
        <NavLink to="/myCart" className="hover:text-sub duration-200">My Cart</NavLink>
    </>


    // links for users who are signed in
    const registeredUserLinks = <>
        {
            currentUser ?
                <>
                    {/* dropdown */}
                    <div className="dropdown dropdown-bottom dropdown-end">
                        {/* avatar */}
                        <div tabIndex={0} role="button" className="avatar m-1">
                            <div className="w-10 rounded-full">
                                <img src={currentUserDB?.photo} alt="user photo" />
                            </div>
                        </div>
                        {/* dropdown links */}
                        <div tabIndex={0} className="dropdown-content z-[1] menu py-5 px-2 shadow rounded-box w-52 flex flex-col justify-start items-center gap-4 bg-white">
                            <p className="text-center text-[14px] font-medium text-lightblack font-main">{currentUserDB?.name}</p>
                            <Link to="/dashboard" className="hover:text-sub hover:translate-x-2  duration-300">Dashboard</Link>
                            <button onClick={handleLogOut} className="bg-second text-white px-4 py-2 rounded-md hover:bg-third duration-300 hover:translate-x-2 font-medium">Log out</button>
                        </div>
                    </div>
                </>
                :
                <Link to="/login" className="primary-button">Login</Link>
        }
    </>




    return (
        <div className="mx-auto z-50 absolute w-full">

            <div className="navbar bg-[#ffffff00]">
                <div className="navbar-start">

                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow bg-base-100 rounded-box w-52  text-base font-semibold space-y-4">
                            {links}
                        </ul>
                    </div>
                    <Link to="/">
                        <img src={websiteLogo} alt="Website Logo" className="w-2/4 hover:scale-110  duration-500" />
                    </Link>
                </div>


                <div className="navbar-end flex justify-end items-center gap-4">

                    <div className="navbar-center lg:flex justify-end items-center">

                        {/* Links for desktop version */}
                        <div className="menu menu-horizontal px-1 text-base font-bold space-x-10">
                            <div className="hidden lg:flex justify-center items-center gap-7">
                                {links}
                            </div>
                            <div className="flex">
                                {registeredUserLinks}
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Header;