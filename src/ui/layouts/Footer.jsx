import { Link } from "react-router";
import { FaTwitter, FaFacebookF, FaGithub, FaPhone } from "react-icons/fa6";
import { FaMailBulk, FaMapMarker } from "react-icons/fa";

import Logo from "../shared/Logo";

const Footer = () => {
  return (
    <footer className="grid grid-cols-1 gap-4 bg-base-300 text-base-content p-6 rounded-t-box">
      <div className="flex flex-col items-center md:items-end gap-2">
        <div className="flex flex-col items-center md:items-end gap-1">
          <Logo />
          <p className="text-end text-sm">
            Providing reliable foods since 2025
            <br />
            All rights preserved
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link to="#">
            <FaTwitter className="text-xl hover:text-primary transition-colors" />
          </Link>
          <Link to="#">
            <FaFacebookF className="text-xl hover:text-primary transition-colors" />
          </Link>
          <Link to="#">
            <FaGithub className="text-xl hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:flex-start flex-wrap gap-4 md:gap-12">
        <div className="space-y-2">
          <h6 className="font-bold text-lg">Working Hours</h6>
          <div className="flex flex-col gap-1">
            <span>
              <strong>Fri:</strong> Closed
            </span>
            <span>
              <strong>Sat:</strong> 10:00 AM – 8:00 PM
            </span>
            <span>
              <strong>Sun – Thu:</strong> 9:00 AM – 10:00 PM
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h6 className="font-bold text-lg">How to Reach Us</h6>

          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <FaPhone /> +880 1234-567890
            </span>
            <span className="flex items-center gap-2">
              <FaMapMarker /> Tejgaon, Bangladesh
            </span>
            <span className="flex items-center gap-2">
              <FaMailBulk /> support@localchefbazaar.com
            </span>
          </div>
        </div>

        <div className="tooltip tooltip-open" data-tip="Our Location">
          <iframe
            src="https://www.google.com/maps?q=Tejgaon,+Dhaka,+Bangladesh&output=embed"
            className="w-full h-auto md:h-32 rounded-box border-2 border-accent/50 hover:border-accent transition-colors"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
