"use client"

import { useState } from "react"
import Link from "next/link"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav>
      <button
        className="text-white lg:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
      </button>

      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute right-0 top-full flex-col bg-[#5C2941] px-6 py-4 lg:static lg:flex lg:flex-row lg:gap-6 lg:p-0`}
      >
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block py-2 text-white/80 transition-colors hover:text-white lg:py-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
