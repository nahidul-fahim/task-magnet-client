import { useState } from "react";
import SectionTitle2 from "../../Shared/SectionTitle2/SectionTitle2";
import { useForm } from "react-hook-form"
import { FaUpload } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";

//images
const registerImg = "https://i.ibb.co/txRYXn7/sign-Upimg.png";

// image hosting key and url
const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`




const Register = () => {

    // hooks
    const axiosPublic = useAxiosPublic();
    const [selectedImageName, setSelectedImageName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null)
    const { createNewUser, updateProfileInfo } = useAuthProvider();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();


    // react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()


    // image input and get the file name
    const handleImageInput = e => {
        e.preventDefault();
        const fileInput = e.target;
        if (fileInput.files.length > 0) {
            const file = { image: fileInput.files[0] }
            const fileName = fileInput.files[0].name;
            setSelectedImageName(fileName);
            setSelectedImage(file)
        }
        else {
            setSelectedImageName('')
        }
    }


    // get today's date and validate for min date in the form's date picker
    const todayDate = new Date().toISOString().split('T')[0];


    // handle form onsubmit
    const onSubmit = data => {

        // if a selectedimage is available upload it to the hosting
        if (selectedImage) {
            axiosPublic.post(imgUploadUrl, selectedImage, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then(res => {
                    if (res.data) {
                        const name = data.name;
                        const email = data.email;
                        const userType = data.userType;
                        const password = data.password;
                        const registeredDate = todayDate;
                        const photo = res.data.data.display_url;

                        // form data in an object
                        const newUserInfo = { name, email, photo, userType, registeredDate };


                        // regular expression for password
                        const regExPattern = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
                        setPasswordErrorMessage();


                        // password vaidation
                        if (!regExPattern.test(password)) {
                            setPasswordErrorMessage("Password should be minimum 6 characters, contain at least 1 capital letter & 1 special character");
                            return;
                        }

                        // call crete new user function
                        createNewUser(email, password)
                            .then(result => {
                                // if new user is created send the data to database
                                if (result.user) {
                                    const currentUsersInfo = result.user;
                                    // post the new user data to database
                                    axiosPublic.post("/newuser", newUserInfo)
                                        .then(res => {
                                            const data = res.data;
                                            if (data.insertedId) {
                                                successNotify();
                                                updateProfileInfo(currentUsersInfo, name, photo)
                                                reset();
                                                navigate(location?.state ? location?.state : "/")
                                            }
                                        })
                                        // database post error
                                        .catch(err => {
                                            const error = "Database:" + err.code + "-" + err.message;
                                            failedNotify(error);
                                        })
                                }
                            })
                            // firebase account creation error
                            .catch(error => {
                                failedNotify("Firebase:" + error.code + "-" + error.message);
                            });
                    }
                })
                // image upload to img host error
                .catch(err => {
                    failedNotify(err.code + "|" + err.message)
                })
        }


    }



    // show-hide password functionality
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
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
                smallTitle="Register"
                bigTitle="Tasks Begin here"
            />

            {/* register main section */}
            <div className="container mx-auto p-5 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-10 mt-[40px] lg:mt-[80px]">

                {/* register left section */}
                <div className="w-full lg:w-1/2">
                    <img src={registerImg} alt="" />
                </div>

                {/* register right section (form section) */}
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-start items-center gap-5">

                    {/* registration form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto flex flex-col justify-center items-center lg:items-start gap-5">

                        {/* name input */}
                        <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                            <input type="text" className="w-full md:w-2/3 bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-3 rounded-[5px] focus:outline-none focus:border-third font-body text-black focus:bg-white"
                                placeholder="Your name" {...register("name", { required: true })} />
                            {errors.name && <span className="font-main text-[14px] text-[#a12121] font-medium">This field is required</span>}
                        </div>

                        {/* email input */}
                        <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                            <input type="email" className="w-full md:w-2/3 bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-3 rounded-[5px] focus:outline-none focus:border-third font-body text-black focus:bg-white"
                                placeholder="Your email" {...register("email", { required: true })} />
                            {errors.email && <span className="font-main text-[14px] text-[#a12121] font-medium">This field is required</span>}
                        </div>

                        {/* userType input */}
                        <div className="w-full flex flex-col justify-center items-start md:items-center lg:items-start">
                            <select className="w-full md:w-2/3 bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-3 rounded-[5px] focus:outline-none focus:border-third font-body text-lightblack focus:bg-white"
                                defaultValue="Select your profession"
                                {...register("userType", { required: true })}>
                                <option disabled value="Select your profession">Select your profession</option>
                                <option value="Developer">Developer</option>
                                <option value="Desginer">Desginer</option>
                                <option value="Student">Student</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.userType && <span className="font-main text-[14px] text-[#a12121] font-medium">This field is required</span>}
                        </div>


                        {/* image file input */}
                        <label
                            htmlFor="image"
                            className="cursor-pointer relative focus:outline-none border-[1px] py-3 px-5 rounded-[5px] border-lightwhite focus:border-third transition-all duration-500 w-full md:w-2/3 text-lightblack flex justify-start items-center gap-2"
                        >
                            <FaUpload /> {selectedImageName.length > 25 ? selectedImageName.slice(0, 25) + "...." : selectedImageName || "Choose your profile picture"}
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={handleImageInput}
                                required
                                className="cursor-pointer opacity-0 absolute top-0 left-0 w-full" />
                        </label>


                        {/* passowrd input */}
                        <div className="w-full flex justify-center items-center lg:justify-start">
                            <div className="w-full md:w-2/3 relative">
                                <input type={showPassword ? "text" : "password"} className="w-full bg-[#ffffff00] border-lightwhite border-[1px] px-5 py-3 rounded-[5px] focus:outline-none focus:border-third font-body text-black focus:bg-white relative"
                                    placeholder="Choose a passowrd" {...register("password", { required: true })} />
                                <span onClick={handleShowPassword} className="absolute right-4 top-4 text-lightblack"> {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} </span>
                            </div>
                            {
                                passwordErrorMessage ? <p className="text-[14px] font-regular text-[#c73c3c]">{passwordErrorMessage}</p> : ''
                            }
                            {errors.password && <span className="font-main text-[14px] text-[#a12121] font-medium">This field is required</span>}
                        </div>

                        {/* submit button */}
                        <input type="submit" value="Register" className="primary-button cursor-pointer" />

                        <ToastContainer closeButton={false} />

                    </form>

                    <p className="text-center lg:text-left w-full font-medium text-lightblack">Already have an account? <span className="font-semibold text-third hover:text-second duration-500 text-[18px]"><Link to="/login">Login here</Link></span> </p>
                </div>
            </div>


        </div>
    );
};

export default Register;