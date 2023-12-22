import SectionTile from "../../Shared/SectionTitle/SectionTile";
import CountUp from 'react-countup';


const Statistics = () => {
    return (
        <div id="statistics" className="container mx-auto p-5 py-[70px] lg:py-[120px] font-main">

            <SectionTile
                smallTitle="Statistics"
                bigTitle="Diversity in"
                spanTitle="Users" />

            {/* statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 lg:gap-10 mt-[80px]">

                {/* developer statistics */}
                <div className="bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]">
                    <CountUp className='text-6xl text-main lg:text-8xl font-bold text-center'
                        start={0}
                        end={70}
                        duration={4}
                        startOnMount='false'
                        enableScrollSpy='true'
                    />
                    <p className="text-4xl font-bold text=center">Developers</p>
                </div>

                {/* designer statistics */}
                <div className="bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]">
                    <CountUp className='text-6xl text-third lg:text-8xl font-bold text-center'
                        start={0}
                        end={50}
                        duration={4}
                        startOnMount='false'
                        enableScrollSpy='true'
                    />
                    <p className="text-4xl font-bold text=center">Designers</p>
                </div>

                {/* student statistics */}
                <div className="bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]">
                    <CountUp className='text-6xl text-second lg:text-8xl font-bold text-center'
                        start={0}
                        end={30}
                        duration={4}
                        startOnMount='false'
                        enableScrollSpy='true'
                    />
                    <p className="text-4xl font-bold text=center">Students</p>
                </div>

                {/* other statistics */}
                <div className="bg-white p-10 rounded-[20px] text-center flex flex-col justify-center items-center gap-3 shadow-[0_0_70px_#cbcbcb]">
                    <CountUp className='text-6xl text-[#4b6cff] lg:text-8xl font-bold text-center'
                        start={0}
                        end={40}
                        duration={4}
                        startOnMount='false'
                        enableScrollSpy='true'
                    />
                    <p className="text-4xl font-bold text=center">Others</p>
                </div>
            </div>

        </div>
    );
};

export default Statistics;