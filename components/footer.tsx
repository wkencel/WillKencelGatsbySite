import { FaLinkedin, FaGithub } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export default function Footer() {
  return (
    <footer className="bg-neutral-900 py-8 text-neutral-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Will Kencel
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/will-kencel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-white"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/wkencel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-white"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="mailto:wkencel1@gmail.com"
            aria-label="Email"
            className="transition-colors hover:text-white"
          >
            <MdEmail size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
