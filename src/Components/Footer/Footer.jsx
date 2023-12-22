import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

// images
const websiteLogo = "https://i.ibb.co/K9ndz8T/website-Logo.png";
const sectionBg = "https://i.ibb.co/bbTMjjT/section-Bg2.png";


const Footer = () => {




    return (
        <div
            style={{
                backgroundImage: `url(${sectionBg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <footer className="container mx-auto footer p-10 text-black">
                <aside>
                    <Link to={"/"}><img src={websiteLogo} alt="" /></Link>
                    <p className="font-main text-2xl font-semibold">Task Magnet Hub</p>
                    <p className="font-main text-[16px]"><small>&copy; All rights reserved.</small></p>
                </aside>
                <nav>
                    <header className="footer-title">Social</header>
                    <div className="grid grid-flow-col gap-4">
                        <Link to="https://www.facebook.com/profile.nahidulfahim"> <FaFacebookSquare className="text-3xl" /></Link>
                        <Link to="https://www.facebook.com/profile.nahidulfahim"> <FaTwitterSquare className="text-3xl" /></Link>
                        <Link to="https://www.facebook.com/profile.nahidulfahim"> <FaInstagramSquare className="text-3xl" /></Link>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;