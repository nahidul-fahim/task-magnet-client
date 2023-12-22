import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import SectionTile from '../../Shared/SectionTitle/SectionTile';
import { Link } from 'react-router-dom';



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
                        <h2 className='text-black leading-[50px] font-main text-[65px] md:text-[70px] lg:text-[80px] uppercase font-extrabold'>EverPlan</h2>
                        <div className='w-full h-[80px]'>
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
                        <Link to="/dashboard"><button className='primary-button mt-5'>{'Let\'s'} Explore</button></Link>
                    </div>
                </div>

                {/* right container */}
                <div className='w-full lg:w-1/2'>
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
                    <div className='w-full lg:w-1/2 flex justify-center items-center'>
                        <img src={featuresImg} alt="" />
                    </div>

                    {/* features right*/}
                    <div className='font-main grid grid-cols-1 md:grid-cols-2 gap-[20px] lg:gap-[40px] mt-10 w-full lg:w-1/2'>

                        <div className='bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]'>
                            <h3 className='text-3xl font-bold'>Intutive User Interface</h3>
                            <p className='text-center text-lightblack'>Enjoy a user-friendly interface that makes task management easy and accessible for users of all levels.</p>
                        </div>

                        <div className='bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]'>
                            <h3 className='text-3xl font-bold'>Effortless Task Creation</h3>
                            <p className='text-center text-lightblack'>Quickly create and organize tasks with a streamlined and efficient task creation process.</p>
                        </div>

                        <div className='bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]'>
                            <h3 className='text-3xl font-bold'>Data Security</h3>
                            <p className='text-center text-lightblack'>Rest easy knowing that your task data is secure, with robust security measures in place to protect sensitive information.</p>
                        </div>

                        <div className='bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]'>
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