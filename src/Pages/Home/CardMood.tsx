import { useState } from "react";

const Moods = [
  {
    emolgi: "😂",
    label: "Feliz",
    description: "Risa garantizada",
  },
  {
    emolgi: "😢",
    label: "Triste",
    description: "Conmueve profundo",
  },
  {
    emolgi: "😡",
    label: "Enojado",
    description: "Descarga emocional",
  },
  {
    emolgi: "😍",
    label: "Enamorado",
    description: "Romance puro",
  },
  {
    emolgi: "😱",
    label: "Asombrado",
    description: "Sorpresa total",
  },
];

export default function CardMood() {
  const [selectMood, setselectMood] = useState<number|null>(null);


  return (
    <div className="w-full flex items-center flex-col mt-6 gap-5 px-5 mb-11">
      <h1 className="text-[#D1D5DB] text-center font-bold  text-3xl md:text-4xl">
        ¿Cómo te sientes hoy?
      </h1>
      <h2 className="text-[#D1D5DB] text-center text-sm md:text-base">
        Tu emoción desbloquea una playlist de películas.
        <br></br> Tocá un emoji y descubrí lo que deberías estar viendo.
      </h2>

      <div className="w-full flex justify-center flex-row gap-7 ">
        {Moods.map((mod, index) => (
          <div
            onClick={()=>setselectMood(index)}
            key={index}
            className={`cursor-pointer flex flex-col gap-2 items-center w-[156px] 
          flex-wrap py-8  border border-white/30 rounded-xl 
          transition-all duration-300 transform hover:scale-105 ${selectMood === index ?  'bg-[#0F0F0F]':'bg-[#282828]'}`}
          >
            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
              {mod.emolgi}
            </div>
            <h1 className="text-xl font-semibold text-[#D1D5DB]">
              {mod.label}
            </h1>
            <h1 className="text-sm text-[#D1D5DB]">{mod.description}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
