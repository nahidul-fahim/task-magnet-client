import { useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import SectionTile from '../../Shared/SectionTitle/SectionTile';
import { Link } from 'react-router-dom';
import { useInView } from 'framer-motion';



// get the necessary images
const sectionBg = "https://i.ibb.co/MRfmg0x/sectionbg.png";
const bannerBg = "https://i.ibb.co/zH965D1/bannerBG.png";
const bg1 = "https://i.ibb.co/qgrKrwC/1.png";
const bg2 = "https://i.ibb.co/r77QQ9q/2.png";
const bg3 = "https://i.ibb.co/qxJTqBK/3.png";
const featuresImg = "https://i.ibb.co/X46PYc1/task3.png";


const Banner = () => {

    // hooks
    const [textColor, setTextColor] = useState('#864fff');


    // famer motion hook
    const animate1 = useRef(null);
    const isInView1 = useInView(animate1);
    const animate2 = useRef(null);
    const isInView2 = useInView(animate2);
    const animate3 = useRef(null);
    const isInView3 = useInView(animate3);
    const animate4 = useRef(null);
    const isInView4 = useInView(animate4);
    const animate5 = useRef(null);
    const isInView5 = useInView(animate5);
    const animate6 = useRef(null);
    const isInView6 = useInView(animate6);

    

    return (
        <div className='py-[50px] lg:py-[0px] overflow-x-hidden'
            style={{
                backgroundImage: `url(${sectionBg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }} >

            {/* main div to contain left and right */}
            <div id='home' className="container mx-auto p-5 lg:h-[100vh] flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-10 w-full relative">

                {/* left container */}
                <div className='w-full lg:w-1/2'>
                    <div className='flex flex-col justify-center items-start gap-3'
                        style={{
                            color: textColor
                        }}>
                        <h2 className='text-black leading-[50px] font-main text-[65px] md:text-[70px] lg:text-[80px] uppercase font-extrabold'
                            ref={animate1}
                            style={{
                                transform: isInView1 ? "none" : "translateY(-70px)",
                                opacity: isInView1 ? "1" : "0",
                                transition: "all 1.5s",
                            }}
                        >EverPlan</h2>
                        <div className='w-full h-[80px]'
                            ref={animate1}
                            style={{
                                transform: isInView1 ? "none" : "translateX(-70px)",
                                opacity: isInView1 ? "1" : "0",
                                transition: "all 1.5s",
                            }}
                        >
                            <TypeAnimation className='font-main leading-[80px] text-[65px] md:text-[70px] lg:text-[80px] uppercase font-extrabold'
                                sequence={[
                                    'Focus',
                                    1800,
                                    () => setTextColor('#ffa22b'),
                                    'Triumph',
                                    1800,
                                    () => setTextColor('#864fff'),
                                    'Milestones',
                                    1800,
                                    () => setTextColor('#ffa22b'),
                                    'Progress',
                                    1800,
                                    () => setTextColor('#F77D6B'),
                                ]}
                                speed={150}
                                repeat={Infinity}
                                cursor={false}
                                omitDeletionAnimation={false}
                                preRenderFirstString={true}
                                deletionSpeed={150}
                            />
                        </div>
                        <Link to="/dashboard"
                            ref={animate1}
                            style={{
                                transform: isInView1 ? "none" : "translateY(100px)",
                                opacity: isInView1 ? "1" : "0",
                                transition: "all 1.5s",
                            }}
                        ><button className='primary-button mt-5'>{'Let\'s'} Explore</button></Link>
                    </div>
                </div>

                {/* right container */}
                <div className='w-full lg:w-1/2'
                    ref={animate1}
                    style={{
                        transform: isInView1 ? "none" : "scale(0)",
                        opacity: isInView1 ? "1" : "0",
                        transition: "all 1.7s",
                    }}
                >
                    <img src={bannerBg} alt="Banner image" />
                </div>

                {/* background images */}
                <img src={bg1} alt="" className='absolute right-80 top-5 z-[-1]' />
                <img src={bg2} alt="" className='absolute bottom-20 left-[500px] z-[-1]' />
                <img src={bg3} alt="" className='absolute left-1/2 z-[-1]' />
                <img src={bg2} alt="" className='absolute top-20 left-20 z-[-1]' />

            </div>

            {/* features section */}
            <div id='features' className='py-[80px] p-5 flex flex-col justify-center items-center gap-10 container mx-auto'>
                <SectionTile
                    smallTitle="Features"
                    bigTitle="Task Maestry"
                    spanTitle="Unleashed" />

                <div className='w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center'>

                    {/* fetures left */}
                    <div
                        ref={animate2}
                        style={{
                            transform: isInView2 ? "none" : "translateX(-70px)",
                            opacity: isInView2 ? "1" : "0",
                            transition: "all 1.5s",
                        }}
                        className='w-full lg:w-1/2 flex justify-center items-center'>
                        <img src={featuresImg} alt="" />
                    </div>

                    {/* features right*/}
                    <div className='font-main grid grid-cols-1 md:grid-cols-2 gap-[20px] lg:gap-[40px] mt-10 w-full lg:w-1/2'>

                        <div
                            ref={animate3}
                            style={{
                                transform: isInView3 ? "none" : "translateY(-70px)",
                                opacity: isInView3 ? "1" : "0",
                                transition: "all 1.2s",
                            }}
                            className='bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]'>
                            <h3 className='text-3xl font-bold'>Intutive User Interface</h3>
                            <p className='text-center text-lightblack'>Enjoy a user-friendly interface that makes task management easy and accessible for users of all levels.</p>
                        </div>

                        <div
                            ref={animate4}
                            style={{
                                transform: isInView4 ? "none" : "translateY(-70px)",
                                opacity: isInView4 ? "1" : "0",
                                transition: "all 1.4s",
                            }}
                            className='bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]'>
                            <h3 className='text-3xl font-bold'>Effortless Task Creation</h3>
                            <p className='text-center text-lightblack'>Quickly create and organize tasks with a streamlined and efficient task creation process.</p>
                        </div>

                        <div
                            ref={animate5}
                            style={{
                                transform: isInView5 ? "none" : "translateY(-70px)",
                                opacity: isInView5 ? "1" : "0",
                                transition: "all 1.6s",
                            }}
                            className='bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]'>
                            <h3 className='text-3xl font-bold'>Data Security</h3>
                            <p className='text-center text-lightblack'>Rest easy knowing that your task data is secure, with robust security measures in place to protect sensitive information.</p>
                        </div>

                        <div
                            ref={animate6}
                            style={{
                                transform: isInView6 ? "none" : "translateY(-70px)",
                                opacity: isInView6 ? "1" : "0",
                                transition: "all 1.8s",
                            }}
                            className='bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]'>
                            <h3 className='text-3xl font-bold'>Continuous Updates</h3>
                            <p className='text-center text-lightblack'>Stay current with continuous updates for a cutting-edge task management experience.</p>
                        </div>
                    </div>

                </div>

            </div>

        </div >
    );
};

export default Banner;