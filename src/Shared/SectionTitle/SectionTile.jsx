

const SectionTile = ({ smallTitle, bigTitle, spanTitle }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl lg:text-5xl font-semibold text-second font-second lg:mb-2 text-center">{smallTitle}</h2>
            <h3 className='text-black leading-[65px] lg:leading-[80px] font-main text-[55px] md:text-[60px] lg:text-[70px] uppercase font-extrabold text-center'>{bigTitle} <span className="text-third">{spanTitle}</span></h3>
        </div>
    );
};

export default SectionTile;