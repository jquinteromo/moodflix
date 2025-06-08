import { Mail, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full mt-20 bg-[#111] text-gray-400 px-6 py-10  border-gray-800">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p className="text-center md:text-left">
          Datos proporcionados por{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            TMDb
          </a>
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://www.youtube.com/@Teromo11"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Youtube size={16} /> YouTube
          </a>

          <a
            href="mailto:qjaider11@gmail.com"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Mail size={16} /> Contacto
          </a>
        </div>
      </div>

      <div className="mt-6 text-xs text-center text-gray-600">
        © {new Date().getFullYear()} Moodflix. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
