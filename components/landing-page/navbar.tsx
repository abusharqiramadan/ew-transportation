"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import {
  Boxes,
  CalendarDays,
  ClipboardCheck,
  ShieldCheck,
  Truck,
  PhoneCall,
} from "lucide-react"

const NAV_LINKS = [
  { label: "Home", href: "#hero", icon: Truck },
  { label: "Services", href: "#services", icon: Boxes },
  { label: "Process", href: "#process", icon: ClipboardCheck },
  { label: "Pricing", href: "#pricing", icon: CalendarDays },
  { label: "Trust", href: "#trust", icon: ShieldCheck },
] as const satisfies ReadonlyArray<{
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}>

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen((open) => !open)
  const closeMenu = () => setIsMenuOpen(false)
  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    options?: { closeMenu?: boolean }
  ) => {
    event.preventDefault()

    if (options?.closeMenu) {
      closeMenu()
    }

    const targetId = href.replace("#", "")

    if (pathname === "/") {
      const targetSection = document.getElementById(targetId)
      targetSection?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(`/#${targetId}`)
    }
  }
  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    handleNavClick(event, "#hero", { closeMenu: true })
  }

  return (
    <nav className="sticky top-4 z-50 rounded-3xl border border-slate-800/60 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 transition-all duration-300 sm:px-8 lg:px-12">
        <Link
          href="#hero"
          className="flex items-center gap-3 text-xl font-semibold text-slate-100 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          onClick={handleBrandClick}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 text-slate-950 shadow-lg shadow-blue-500/30">
            <Truck className="h-6 w-6" />
          </span>
          <span className="flex flex-col leading-tight">
            <span>EW Transportation</span>
            <span className="text-sm font-normal text-slate-400">
              Moving & courier for Edmonton
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8 text-sm font-medium text-slate-300">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative inline-flex items-center gap-2 transition-all duration-300 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  <item.icon className="h-4 w-4 text-blue-400 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 origin-center scale-x-0 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/30 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-blue-400/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
            onClick={(event) => handleNavClick(event, "#pricing")}
          >
            <PhoneCall className="h-4 w-4" />
            Get a free quote
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-800/70 text-slate-100 transition-transform duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 md:hidden"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        >
          <HamburgerIcon isOpen={isMenuOpen} />
        </button>
      </div>

      <div
        className={`md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-slate-800/70 bg-slate-950/95 shadow-sm shadow-blue-500/10 transition-all duration-300 ease-out`}
      >
        <ul className="flex flex-col gap-3 px-6 pb-4 pt-4 text-sm font-medium text-slate-200">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-slate-900 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                onClick={(event) => handleNavClick(event, item.href, { closeMenu: true })}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-blue-400" />
                  {item.label}
                </span>
                <span className="text-xs text-blue-400">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-6">
          <Link
            href="#pricing"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/30 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-blue-400/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
          >
            <PhoneCall className="h-4 w-4" />
            Get a free quote
          </Link>
        </div>
      </div>
    </nav>
  )
}

type HamburgerIconProps = {
  isOpen: boolean
}

function HamburgerIcon({ isOpen }: HamburgerIconProps) {
  return (
    <span className="relative flex h-5 w-6 items-center justify-center">
      <span
        className={`absolute h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
        }`}
      />
      <span
        className={`absolute h-0.5 w-full rounded-full bg-current transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
        }`}
      />
    </span>
  )
}