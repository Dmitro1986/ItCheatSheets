/** @format */
import {Github, Globe, Mail} from "lucide-react"
export function TheFooter() {
  return (
    <footer className="w-full mt-auto bg-gray-950 text-gray-200 text-center py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2 px-4">
        <div className="text-lg font-semibold tracking-wider">
          &copy; {new Date().getFullYear()} WladTer
        </div>
        <div>
          <nav className="flex gap-5 text-sm">
            <a
              href="https://github.com/Dmitro1986/ItCheatSheets"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
              <span>GitHab</span>
            </a>
            <a
              href="https://dog-search-js7h.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors duration-200"
              aria-label="Globe"
            >
              <Globe className="w-5 h-5" /> Web
            </a>
            <a
              href="mailto:wladter@example.com"
              className="hover:text-emerald-400 transition-colors duration-200"
              aria-label="Mail"
            >
              <Mail className="w-5 h-5" /> Написать
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
