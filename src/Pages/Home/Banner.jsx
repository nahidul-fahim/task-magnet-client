import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';



// get the necessary images
const sectionBg = "https://i.ibb.co/MRfmg0x/sectionbg.png";
const bannerBg = "https://i.ibb.co/zH965D1/bannerBG.png";
const bg1 = "https://i.ibb.co/qgrKrwC/1.png";
const bg2 = "https://i.ibb.co/r77QQ9q/2.png";
const bg3 = "https://i.ibb.co/qxJTqBK/3.png";
const aboutImg = "https://i.ibb.co/X46PYc1/task3.png";


const Banner = () => {


    // hooks
    const [textColor, setTextColor] = useState('#864fff');





    return (
        <div className='lg:rounded-bl-[35%] lg:rounded-br-[50%] py-[50px]'
            style={{
                backgroundImage: `url(${sectionBg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }} >

            {/* main div to contain left and right */}
            <div className="container mx-auto p-5 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-10 w-full relative">

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
                    </div>
                </div>

                {/* right container */}
                <div className='w-full lg:w-1/2'>
                    <img src={bannerBg} alt="Banner image" />
                </div>


                <img src={bg1} alt="" className='absolute right-80 top-5 z-[-1]' />
                <img src={bg2} alt="" className='absolute bottom-20 left-20 z-[-1]' />
                <img src={bg3} alt="" className='absolute left-1/2 z-[-1]' />
                <img src={bg2} alt="" className='absolute top-20 left-20 z-[-1]' />

            </div>

        </div >
    );
};

export default Banner;