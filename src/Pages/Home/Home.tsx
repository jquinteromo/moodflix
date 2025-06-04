import Navbar from "../../Components/Navbar";
import Banner from "./Banner";
import CardMood from "./CardMood"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#121212]">
      <Navbar></Navbar>
      <Banner></Banner>
      <CardMood></CardMood>
    </div>
  );
}
