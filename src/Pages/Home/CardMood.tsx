import { useState } from "react";

interface HijoProps {
  onCategorySelect: (emolgi: string, categories: number[]) => void;
  
}

const Moods = [
  {
    emolgi: "😂",
    label: "Feliz",
    description: "Aumenta tu animo!",
    categories: [35],
    color: "from-yellow-500 to-orange-600",
  },
  {
    emolgi: "😢",
    label: "Triste",
    description: "Conmueve profundo",
    categories: [18, 10749],
    color: "from-blue-500 to-indigo-600",
  },
  {
    emolgi: "😡",
    label: "Enojado",
    description: "Adrenalina?",
    categories: [80, 53],
    color: "from-red-500 to-red-700",
  },
  {
    emolgi: "😍",
    label: "Enamorado",
    description: "Romance puro",
    categories: [10749, 18],
    color: "from-pink-500 to-rose-600",
  },
  {
    emolgi: "😱",
    label: "Asombrado",
    description: "Quieres tención?",
    categories: [27, 53],
    color: "from-[#3A5F0B] to-[#2C4008]",
  },
];

export default function CardMood({ onCategorySelect }: HijoProps) {
  const [selectMood, setselectMood] = useState<number | null>(null);

  return (
    <div className="w-full flex items-center flex-col mt-6 gap-5 px-5 mb-11">
      <h1 className="text-[#D1A23F] text-center font-bold  text-3xl md:text-4xl">
        ¿Cómo te sientes hoy?
      </h1>
      <h2 className="text-[#D1D5DB] text-center text-sm md:text-base">
        Tu emoción desbloquea una playlist de películas.
        <br></br> Tocá un emoji y descubrí lo que deberías estar viendo.
      </h2>

      <div className="w-full flex justify-center flex-row gap-7 flex-wrap">
        {Moods.map((mod, index) => (
          <div
            onClickCapture={() => onCategorySelect(mod.emolgi, mod.categories)}
            onClick={() => setselectMood(index)}
            key={index}
            className={`cursor-pointer flex flex-col gap-2 items-center md:w-[156px] w-[120px] 
          flex-wrap md:py-8 py-4    border border-white/30 rounded-xl 
          transition-all duration-300 transform hover:scale-105 bg-gradient-to-br ${
            selectMood === index ? mod.color : "bg-[#282828]"
          }`}
          >
            <div className="md:text-5xl text-4xl group-hover:scale-110 transition-transform duration-300">
              {mod.emolgi}
            </div>
            <h1 className="md:text-xl text-lg font-semibold text-[#D1D5DB]">
              {mod.label}
            </h1>
            <h1 className="md:text-sm text-xs text-[#D1D5DB]">
              {mod.description}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
