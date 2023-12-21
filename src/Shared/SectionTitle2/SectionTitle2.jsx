

const SectionTitle2 = ({ smallTitle, bigTitle }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl lg:text-5xl font-semibold text-second font-second lg:mb-2 text-center">{smallTitle}</h2>
            <h3 className='text-black leading-[45px] lg:leading-[60px] font-main text-[40px] md:text-[50px] lg:text-[60px] uppercase font-extrabold text-center'>{bigTitle}</h3>
        </div>
    );
};

export default SectionTitle2;