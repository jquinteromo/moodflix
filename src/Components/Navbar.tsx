import { Search, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  variant?: "Playmovie";
};

export default function Navbar({ variant }: NavbarProps) {
  const navigate = useNavigate();

  const background =
    variant === "Playmovie"
      ? "bg-black/50"
      : "bg-gradient-to-b from-[#0F0F0F] via-[#0F0F0F] to-transparent via-80% to-100%";

  const goToMyList = () => {
    navigate("/Mylist");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className={` fixed top-0 left-0 w-full z-50 h-24 ${background} grid grid-cols-3 place-items-center`}>
      <div className="   inline-flex items-center  md:mr-48 ml-3 md:ml-3">
        <img
          src="/Icons_Navbar/M F.png"
          className="h-16 md:h-16 w-16 md:w-16 "
        ></img>
        <h2 className=" md:opacity-100 opacity-0 md:ml-0   text-lg md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
          Moodflix
        </h2>
      </div>
      <div className="  inline-flex gap-4 md:mr-10 mr-12  md:w-32 w-28">
        <a onClick={goToHome}>
          {" "}
          <h2 className="text-sm md:text-base text-[#D1D5DB] hover:text-white font-bold cursor-pointer">
            Home
          </h2>{" "}
        </a>
        <h2
          onClick={goToMyList}
          className=" text-sm md:text-base text-[#D1D5DB] hover:text-white font-bold cursor-pointer"
        >
          My List
        </h2>
      </div>
      <div className=" inline-flex gap-4 md:ml-20">
        <div className="relative">
          <input
            type="search"
            placeholder="Search movies..."
            className="w-12 md:placeholder:opacity-100 placeholder:opacity-0 md:w-56  px-2 md:px-9 py-2  bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
          />
          <Search className="absolute left-4 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        </div>
        <div className="relative">
          <input
            onClick={goToMyList}
            type="button"
            className="bg-[#D1A23F] w-12 px-4 py-2  bg-white/10 border border-white/20 rounded-lg text-white  focus:outline-none cursor-pointer transition-all"
          />
          <Heart
            onClick={goToMyList}
            className=" cursor-pointer absolute left-[0.872rem] top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50"
          />
        </div>
      </div>
    </div>
  );
}
