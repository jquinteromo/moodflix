import Navbar from "../../Components/Navbar";
import Banner from "./Banner";

export default function Home() {
  return (
    <div className="h-screen w-full bg-[#121212]">
      <Navbar></Navbar>
      <Banner></Banner>
    </div>
  );
}
