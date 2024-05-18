import { Link } from "react-router-dom";
import congdoan from "../../assets/image.png";
const Header = () => {
  return (
    <div className="bg-white flex items-center justify-center uppercase font-bold text-pink-500 text-3xl mb-5 h-20 text-center">
      <Link to={"/"}>
        <div className="flex items-center gap-2">
          <img className="w-[200px]" src={congdoan} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default Header;
