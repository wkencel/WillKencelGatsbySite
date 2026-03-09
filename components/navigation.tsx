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
        className="text-neutral-900 lg:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
      </button>

      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute right-0 top-full z-50 flex-col border-b border-neutral-200 bg-white px-6 py-4 lg:static lg:flex lg:flex-row lg:gap-6 lg:border-0 lg:p-0`}
      >
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block py-2 text-neutral-500 transition-colors hover:text-neutral-900 lg:py-0"
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
