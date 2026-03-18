import Link from "next/link"

export function CommonFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/90 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 text-sm text-slate-400 sm:flex-row sm:px-8 lg:px-12">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <p className="text-slate-100">EW Transportation</p>
          <p className="max-w-md text-xs sm:text-sm">
            Reliable, affordable moving and courier services with tailgate-equipped trucks, insured crews, and 24/7 dispatch across Edmonton.
          </p>
          <p className="text-xs text-slate-500">&copy; {currentYear} EW Transportation. All rights reserved.</p>
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-right">
          <nav className="flex gap-6">
            <Link href="#services" className="transition-colors duration-200 hover:text-cyan-300">
              Services
            </Link>
            <Link href="#pricing" className="transition-colors duration-200 hover:text-cyan-300">
              Pricing
            </Link>
            <Link href="#trust" className="transition-colors duration-200 hover:text-cyan-300">
              Trust & Coverage
            </Link>
          </nav>
          <div className="flex flex-col gap-1 text-xs text-slate-500">
            <Link href="tel:+17805551234" className="transition-colors duration-200 hover:text-cyan-300">
              Dispatch: (780) 555-1234
            </Link>
            <Link href="mailto:dispatch@ew-transportation.ca" className="transition-colors duration-200 hover:text-cyan-300">
              dispatch@ew-transportation.ca
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}