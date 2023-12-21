import SectionTile from "../../Shared/SectionTitle/SectionTile";


// images
const testimonialBg = "https://i.ibb.co/FVqKtL1/testimonial-Bg.png"
const sectionBg = "https://i.ibb.co/Xxshm6H/section-Bg2.png";


const Testimonials = () => {
    return (
        <div className="container mx-auto p-5 py-[70px] lg:py-[120px] font-main flex flex-col lg:flex-row justify-center lg:justify-between items-stretch gap-10"
            style={{
                backgroundImage: `url(${sectionBg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>

            {/* testimonials left */}
            <div className="w-2/5 self-stretch">
                <img src={testimonialBg} alt="" />
            </div>


            {/* testimonials right */}
            <div className="w-3/5 flex justify-start items-start gap-5 h-full self-stretch">
                <SectionTile
                    smallTitle="Testimonials"
                    bigTitle="User Stories"
                    spanTitle="Inspire" />
            </div>



        </div>
    );
};

export default Testimonials;