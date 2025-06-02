import { Search, Heart } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-24 w-full bg-[#0F0F0F] grid grid-cols-3 place-items-center   ">
      <div className="  inline-flex items-center  md:mr-48 ml-3 md:ml-3">
        <img src="/Icons_Navbar/M F.png" className="h-16 md:h-20 w-16 md:w-20 "></img>
        <h2 className=" md:opacity-100 opacity-0 md:ml-0   text-lg md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
          Moodflix
        </h2>
      </div>
      <div className="  inline-flex gap-4 md:mr-10 mr-12  md:w-32 w-28">
        <h2 className="text-sm md:text-base text-[#D1D5DB] hover:text-white font-bold cursor-pointer">Home</h2>
        <h2 className="text-sm md:text-base text-[#D1D5DB] hover:text-white font-bold cursor-pointer">My List</h2>
      </div>
      <div className=" inline-flex gap-4 md:ml-20">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-12 md:placeholder:opacity-100 placeholder:opacity-0 md:w-56  px-2 md:px-9 py-2  bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
          />
          <Search className="absolute left-4 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        </div>
        <div className="relative">
          <input
            type="button"
            className="w-12 px-4 py-2  bg-white/10 border border-white/20 rounded-lg text-white  focus:outline-none cursor-pointer transition-all"
          />
          <Heart className="cursor-pointer absolute left-[0.872rem] top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
        </div>
      </div>
    </div>
  );
}
