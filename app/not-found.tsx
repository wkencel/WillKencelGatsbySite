import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-6xl font-bold text-neutral-900">404</h1>
      <p className="mt-4 text-xl text-neutral-600">Page not found</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-[#5C2941] px-6 py-3 text-white no-underline transition-colors hover:bg-[#7a3558]"
      >
        Go home
      </Link>
    </div>
  )
}
