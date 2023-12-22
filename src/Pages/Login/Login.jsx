import { useState } from "react";
import SectionTitle2 from "../../Shared/SectionTitle2/SectionTitle2";
import { useForm } from "react-hook-form"
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";

//images
const loginImg = "https://i.ibb.co/KVShmw7/loginImg.png";




const Login = () => {

    // hooks
    const { login, logInByGoogle } = useAuthProvider();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();


    // get todays date
    const todayDate = new Date().toISOString().split('T')[0];


    // react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()


    // handle login form submit
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;


        login(email, password)
            .then(() => {
                successNotify();
                reset();
                // Redirect to path after login
                navigate(location?.state ? location.state : "/")
            })
            .catch(error => {
                const errorMessage = error.message;
                const errorCode = error.code;
                failedNotify(errorCode + "|" + errorMessage);
            })
    }


    // show-hide password functionality
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };






    //log in using Google 
    const handleGoogleSignIn = () => {
        logInByGoogle()
            .then(result => {
                if (result) {

                    const data = result?.user;

                    // get the user info from google login
                    const name = data?.displayName;
                    const email = data?.email;
                    const photo = data?.photoURL;
                    const registeredDate = todayDate;
                    const userType = "other";
                    const newUserInfo = { name, email, photo, userType, registeredDate }


                    // post the new user data to database
                    axiosPublic.post("/newuser", newUserInfo)
                        .then(() => {
                            //
                        })
                        // database post error
                        .catch(err => {
                            const error = err.code + "-" + err.message;
                            failedNotify(error);
                        })
                    successNotify();
                    navigate(location?.state ? location.state : "/")

                    successNotify();
                    // Redirect to path after login
                    navigate(location?.state ? location.state : "/")
                }
            })
            // firebase google-login error
            .catch(error => {
                failedNotify(error.code);
            })
    };



    // success notify
    const successNotify = () => toast.success('Account creation successfull', {
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
        <div className="lg:h-[100vh] flex flex-col justify-center items-center py-[30px]">
            <SectionTitle2
                smallTitle="Log in"
                bigTitle="Access Your Goals"
            />

            {/* login main section */}
            <div className="container mx-auto p-5 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-10 mt-[40px] lg:mt-[80px]">

                {/* login left section */}
                <div className="w-full lg:w-1/2">
                    <img src={loginImg} alt="" />
                </div>

                {/* login right section (form section) */}
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center gap-5">

                    {/* login form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto flex flex-col justify-center items-start gap-5">

                        {/* email input */}
                        <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                            <input type="email" className="w-full md:w-2/3 bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-3 rounded-[5px] focus:outline-none focus:border-third font-body text-black focus:bg-white"
                                placeholder="Your email" {...register("email", { required: true })} />
                            {errors.email && <span className="font-main text-[14px] text-[#a12121] font-medium">This field is required</span>}
                        </div>

                        {/* passowrd input */}
                        <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                            <div className="w-full md:w-2/3 relative">
                                <input type={showPassword ? "text" : "password"} className="w-full bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-3 rounded-[5px] focus:outline-none focus:border-third font-body text-black focus:bg-white relative"
                                    placeholder="Your passowrd" {...register("password", { required: true })} />
                                <span onClick={handleShowPassword} className="absolute right-4 top-4 text-lightblack"> {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} </span>
                            </div>
                            {errors.password && <span className="font-main text-[14px] text-[#a12121] font-medium">This field is required</span>}
                        </div>

                        {/* submit button */}
                        <div className="w-full flex flex-col justify-center items-center lg:items-start">
                            <input type="submit" value="Log In" className="primary-button cursor-pointer" />
                        </div>

                        <ToastContainer closeButton={false} />

                    </form>

                    <p className="text-center lg:text-left w-full font-medium text-lightblack">{'Don\'t'} have an account? <span className="font-semibold text-third hover:text-second duration-500 text-[18px]"><Link to="/register">Register here</Link></span> </p>

                    <div className="w-full flex justify-center lg:justify-start items-start mt-5">
                        <button onClick={handleGoogleSignIn}
                            className="flex justify-center items-center gap-3 font-medium border-[1px] px-5 py-3 rounded-[30px] border-lightblack hover:text-white hover:border-third hover:bg-third duration-500"><FcGoogle className="text-xl" /> Sign in using Google</button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login;