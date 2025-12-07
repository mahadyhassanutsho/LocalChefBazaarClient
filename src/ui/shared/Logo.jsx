import { Link } from "react-router";

import logo from "../../assets/images/logo.svg";

const Logo = () => {
  return (
    <Link to="/" className="flex items-end group">
      <img src={logo} className="aspect-square w-8 md:w-12 -rotate-12" />
      <div>
        <div className="h-1 w-full bg-primary/20 rounded-full group-hover:bg-primary/80 transition-colors" />
        <h1 className="text-xl md:text-2xl font-bold group-hover:text-base-content/75">
          LocalChefBazaar
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
