import { useState } from "react";
import SectionTile from "../../Shared/SectionTitle/SectionTile";


// images
const testimonialBg = "https://i.ibb.co/mTYKNmZ/testimonial-Bg.png"
const sectionBg = "https://i.ibb.co/bbTMjjT/section-Bg2.png";
const quoteIcon = "https://i.ibb.co/dpJFQyD/quote.png";
const reviewer1 = "https://i.ibb.co/wNwZyQ6/Bechtel-Profile-Square.jpg";
const reviewer2 = "https://i.ibb.co/9rY0323/profile-pic-1.png";
const reviewer3 = "https://i.ibb.co/3mQZYYw/profile-pic-3.png";


const Testimonials = () => {


    // hooks
    const [testimonial, setTestimonial] = useState("testimonial1")





    return (
        <div className="p-5 py-[70px] lg:py-[120px] font-main"
            style={{
                backgroundImage: `url(${sectionBg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>

            <div className="container mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-10">

                {/* testimonials left (image section) */}
                <div className="w-full lg:w-2/5 flex justify-center items-center">
                    <img src={testimonialBg} alt="" />
                </div>


                {/* testimonials right */}
                <div className="w-full lg:w-3/5 flex flex-col justify-start items-start gap-10 h-full self-stretch">
                    <SectionTile
                        smallTitle="Testimonials"
                        bigTitle="User Stories"
                        spanTitle="Inspire" />


                    {/* testimonial container */}
                    <div className="w-full flex flex-col justify-center items-end mt-[30px] gap-14">

                        {/* testimonials section main div */}
                        <div className="w-full lg:w-4/5 relative">

                            <img src={quoteIcon} alt="" className="absolute top-[-120px] left-[-50px] lg:left-[-120px] opacity-30" />

                            {
                                testimonial === "testimonial1" ?
                                    <>
                                        {/* testimonial 1 */}
                                        <div className="bg-white p-10 rounded-[20px] shadow-[0_0_70px_#cbcbcb] ">
                                            <p className="text-right text-lightblack">As a web developer, precision and organization are key. Task Magnet - has become my go-to task management solution. The seamless integration with my workflow and customizable task views make it an essential tool in my daily routine. {'It\'s'} the perfect companion for staying on top of my coding projects.</p>
                                            <p className="text-right text-[18px] text-black font-medium mt-5">Andrew W., Web Developer</p>
                                        </div>
                                    </>
                                    :
                                    testimonial === "testimonial2" ?
                                        <>
                                            {/* testimonial 2 */}
                                            <div className="bg-white p-10 rounded-[20px] shadow-[0_0_70px_#cbcbcb] ">
                                                <p className="text-right text-lightblack">Design projects often involve numerous tasks and deadlines. Task magnet has simplified the way I manage my design workflow. The intuitive interface and visual organization features help me maintain a clear overview of my tasks, allowing me to focus on creating exceptional user experiences.</p>
                                                <p className="text-right text-[18px] text-black font-medium mt-5">Oliver M., UI/UX Designer</p>
                                            </div>
                                        </>
                                        :
                                        <>
                                            {/* testimonial 3 */}
                                            <div className="bg-white p-10 rounded-[20px] shadow-[0_0_70px_#cbcbcb] ">
                                                <p className="text-right text-lightblack">Balancing coursework and assignments can be overwhelming, but this website has made it much more manageable. The simplicity of task creation and the ability to prioritize assignments have helped me stay organized and focused on my studies. {'It\'s'}an essential tool for any student</p>
                                                <p className="text-right text-[18px] text-black font-medium mt-5">Ryan H., Student</p>
                                            </div>
                                        </>
                            }
                        </div>

                        {/* testimonial images as button */}
                        <div className="flex justify-start items-center gap-5 w-full lg:w-4/5">
                            <button onClick={() => setTestimonial("testimonial1")}><img src={reviewer1} alt="" className={`w-[50px] h-[50px] bg-cover rounded-[50%] hover:scale-110 duration-500 ${testimonial === "testimonial1" ? "scale-125" : "scale-100"}`} /></button>
                            <button onClick={() => setTestimonial("testimonial2")}><img src={reviewer2} alt="" className={`w-[50px] h-[50px] bg-cover rounded-[50%] hover:scale-110 duration-500 ${testimonial === "testimonial2" ? "scale-125" : "scale-100"}`} /></button>
                            <button onClick={() => setTestimonial("testimonial3")}><img src={reviewer3} alt="" className={`w-[50px] h-[50px] bg-cover rounded-[50%] hover:scale-110 duration-500 ${testimonial === "testimonial3" ? "scale-125" : "scale-100"}`} /></button>
                        </div>

                    </div>

                </div>

            </div>



        </div>
    );
};

export default Testimonials;