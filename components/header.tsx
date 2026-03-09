import Navigation from "./navigation"

export default function Header() {
  return (
    <header className="bg-[#5C2941] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold text-white no-underline">
          Will Kencel
        </a>
        <Navigation />
      </div>
    </header>
  )
}
