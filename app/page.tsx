"use client"

import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useMemo, type CSSProperties } from "react"

import ApartmentMoveImage from "@/lib/images/hidaya-academy-hero.png"
import OfficeRelocationImage from "@/lib/images/arabic-institute-hero.png"

import { NavBar } from "@/components/landing-page/navbar"
import { DEFAULT_EASE, DEFAULT_VIEWPORT, createSectionVariants, createStaggerContainer, createStaggerItem } from "@/lib/motion-presets"
import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  BadgeCheck,
  Boxes,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Headset,
  MapPin,
  MessageSquare,
  Package,
  PhoneCall,
  Route,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Truck,
  User,
  XCircle,
  Zap,
} from "lucide-react"
import { CommonFooter } from "@/components/landing-page/common-footer"

type Highlight = {
  title: string
  description: string
  icon: LucideIcon
  stat?: string
  statSource?: string
  contextNote?: string
}

type SolutionPoint = {
  highlight: string
  emphasis: string
  title: string
  description: string
  icon: LucideIcon
  bullets: string[]
}

type ServiceExample = {
  name: string
  category: string
  description: string
  image: StaticImageData
  imageAlt: string
  href: string
  icon: LucideIcon
}

type ProcessStep = {
  phase: number
  title: string
  timeframe: string
  outcome: string
  support: string
  icon: LucideIcon
  highlight?: boolean
}

type TrustSignal = {
  title: string
  description: string
  icon: LucideIcon
  stat?: string
  highlight?: boolean
  contrastOther: string
  contrastUs: string
}

type PricingTier = {
  name: string
  price: string
  period: string
  description: string
  features: {
    text: string
    isNegative?: boolean
  }[]
  highlighted?: boolean
  ribbon?: string
  badge?: string
  extra_badge?: string;
  countdownTarget?: string
  ctaLabel: string
  ctaHref: string
  theme?: "light" | "dark" | "premium"
  privacyNote: string
}

type FloatingIcon = {
  icon: LucideIcon
  className: string
  sizeClass: string
  opacityClass: string
  colorClass: string
  animationClass: string
  style?: CSSProperties
}

type AudienceHighlight = {
  icon: LucideIcon
  title: string
  description: string
}

type AudienceSegment = {
  title: string
  badge: string
  description: string
  highlights: AudienceHighlight[]
  note?: string
  ctaLabel: string
  ctaHref: string
}

type PartnerStep = {
  title: string
  description: string
  icon: LucideIcon
}

type FAQItem = {
  question: string
  answer: string
}

/*
const heroStats = [
  {
    label: "Websites live",
    value: "280+",
    icon: Rocket,
  },
  {
    label: "Average launch time",
    value: "7 days",
    icon: CalendarRange,
  },
  {
    label: "Service providers happy",
    value: "96%",
    icon: Handshake,
  },
] as const
*/

const heroFloatingIcons: FloatingIcon[] = [
  {
    icon: Truck,
    className: "top-20 left-[8%]",
    sizeClass: "h-12 w-12",
    opacityClass: "opacity-20",
    colorClass: "text-blue-500",
    animationClass: "animate-float-soft",
    style: { animationDelay: "0.4s", animationDuration: "18s" },
  },
  {
    icon: Route,
    className: "top-32 right-[12%]",
    sizeClass: "h-14 w-14",
    opacityClass: "opacity-30",
    colorClass: "text-cyan-400",
    animationClass: "animate-float-soft-alt",
    style: { animationDelay: "1.2s", animationDuration: "20s" },
  },
  {
    icon: MapPin,
    className: "bottom-28 left-[18%]",
    sizeClass: "h-11 w-11",
    opacityClass: "opacity-25",
    colorClass: "text-blue-400",
    animationClass: "animate-float-soft-diagonal",
    style: { animationDelay: "0.8s", animationDuration: "22s" },
  },
  {
    icon: ShieldCheck,
    className: "bottom-16 right-[10%]",
    sizeClass: "h-10 w-10",
    opacityClass: "opacity-25",
    colorClass: "text-sky-400",
    animationClass: "animate-float-soft",
    style: { animationDelay: "1.6s", animationDuration: "19s" },
  },
]

const challenges: Highlight[] = [
  {
    title: "Unpredictable delivery windows lose sales",
    description:
      "Vague ETAs leave customers waiting and retailers scrambling to reschedule installs and returns.",
    stat: "61% of shoppers expect same-day updates",
    statSource: "Retail Logistics Report 2025",
    contextNote: "We confirm every booking within 30 minutes and share live SMS updates for each milestone.",
    icon: AlertTriangle,
  },
  {
    title: "Courier surcharges erode your margins",
    description:
      "Fuel add-ons, weekend premiums, and surprise handling fees make planning hard for businesses and households alike.",
    stat: "Flat-rate couriers improve retention by 28%",
    statSource: "Prairies Delivery Study 2024",
    contextNote: "Our $150 flat rate covers pickup, delivery, and tracking—no hidden extras inside Edmonton.",
    icon: Boxes,
  },
  {
    title: "Ad-hoc drivers risk damage and reputations",
    description:
      "Marketplace deliveries often rely on uninsured drivers without accountability or communication.",
    stat: "35% of DIY deliveries lead to complaints",
    statSource: "Alberta Consumer Council 2025",
    contextNote: "Bonded EW drivers send proof-of-delivery instantly so you can close the loop with customers.",
    icon: Clock3,
  },
]

const solutionPoints: SolutionPoint[] = [
  {
    highlight: "Dispatch in minutes",
    emphasis: "Simple job submission",
    title: "Send deliveries without phone tag",
    description:
      "Submit orders through our app or SMS and dispatch confirms availability inside half an hour.",
    icon: ClipboardCheck,
    bullets: [
      "Attach manifests, dimensions, and drop-off instructions in one place",
      "Recurring schedules sync with your retail calendar or POS exports",
    ],
  },
  {
    highlight: "Professional drivers",
    emphasis: "Bonded & insured handling",
    title: "Protect every appliance and parcel",
    description:
      "Our Edmonton-based drivers are bonded, background-checked, and trained on appliance handling.",
    icon: Truck,
    bullets: [
      "Dedicated load equipment keeps fridges, furniture, and parcels secure",
      "Liability coverage and proof-of-delivery photos on every run",
    ],
  },
  {
    highlight: "Live tracking",
    emphasis: "Real-time SMS updates",
    title: "Share status with customers instantly",
    description:
      "Automated texts notify you and your customers from dispatch to delivery confirmation.",
    icon: Route,
    bullets: [
      "Unique tracking links show live GPS and ETA refreshes",
      "Instant delivery receipts with signatures or hand-off notes",
    ],
  },
  {
    highlight: "Responsive dispatch",
    emphasis: "Local logistics team",
    title: "Keep every route on schedule",
    description:
      "Our dispatchers manage exceptions, route optimizations, and customer communication in real time.",
    icon: Headset,
    bullets: [
      "Escalations handled by humans—no bots or outsourced call centres",
      "Updates coordinated across retailers, installers, and end customers",
    ],
  },
]

const processSteps: ProcessStep[] = [
  {
    phase: 1,
    title: "Job submitted & confirmed",
    timeframe: "Step 1 · 30 min confirm",
    outcome: "Dispatch reviews your order and locks in driver availability within 30 minutes.",
    support: "Send pickup, delivery, and access notes via app or SMS—we reply with a confirmation and tracking link.",
    icon: MessageSquare,
  },
  {
    phase: 2,
    title: "Driver on route",
    timeframe: "Step 2 · On the road",
    outcome: "Your driver picks up, secures, and delivers with real-time GPS tracking and SMS alerts.",
    support: "Track progress live, receive ETA nudges, and share status updates with customers at every stop.",
    icon: Truck,
    highlight: true,
  },
  {
    phase: 3,
    title: "Delivery confirmed",
    timeframe: "Step 3 · Completed",
    outcome: "Proof-of-delivery texts, photos, and signatures close the loop for you and your customer.",
    support: "Need a follow-up? Dispatch sends a final status update and handles re-delivery requests.",
    icon: CheckCircle2,
  },
]

const featureHighlights: Highlight[] = [
  {
    title: "Professional handling with tailgate lifts",
    description:
      "Liftgates, dollies, and padding keep bulky furniture and appliances safe from curb to condo.",
    icon: Truck,
  },
  {
    title: "Fast Edmonton-wide transport",
    description:
      "Dedicated crews move homes, offices, and same-day courier deliveries across the city on schedule.",
    icon: Route,
  },
  {
    title: "Real-time tracking & updates",
    description:
      "Live GPS links, ETA alerts, and delivery confirmations give you peace of mind at every step.",
    icon: ClipboardCheck,
  },
]

const serviceExamples: ServiceExample[] = [
  {
    name: "Appliance store to customer",
    category: "Same-day delivery",
    description: "Booked by 10 a.m., delivered before dinner with SMS notifications to sales staff and homeowners.",
    image: ApartmentMoveImage,
    imageAlt: "Driver delivering a new appliance safely into a home",
    href: "#pricing",
    icon: Package,
  },
  {
    name: "Kijiji furniture pickup",
    category: "Consumer delivery",
    description: "Flat-rate $150 door-to-door transport for marketplace buyers without a truck.",
    image: OfficeRelocationImage,
    imageAlt: "Courier loading furniture for a marketplace customer",
    href: "#audiences",
    icon: User,
  },
  {
    name: "Recurring weekly retailer routes",
    category: "Managed contracts",
    description: "Multi-stop appliance deliveries synced to retailer order exports with consolidated invoicing.",
    image: ApartmentMoveImage,
    imageAlt: "Delivery van preparing multiple retail orders for dispatch",
    href: "#partner",
    icon: Route,
  },
]

const trustSignals: TrustSignal[] = [
  {
    title: "Professional, bonded delivery drivers",
    description:
      "Every driver is bonded, background-checked, and trained to move appliances, furniture, and parcels safely.",
    icon: ShieldCheck,
    stat: "Fully bonded",
    highlight: true,
    contrastOther: "Gig platforms rely on unvetted drivers with limited accountability.",
    contrastUs: "EW drivers carry liability coverage, equipment training, and marketplace experience.",
  },
  {
    title: "Real-time GPS tracking & SMS updates",
    description:
      "We text status changes automatically so your team and customers always know the ETA.",
    icon: Smartphone,
    stat: "Live links",
    contrastOther: "Most couriers offer tracking portals without proactive notifications.",
    contrastUs: "Our custom SMS platform shares driver location, delays, and delivery confirmation instantly.",
  },
  {
    title: "Careful handling & liability coverage",
    description:
      "Appliances, furniture, and parcels are strapped, protected, and insured for peace of mind.",
    icon: Package,
    stat: "Coverage included",
    contrastOther: "Cash couriers shift damage costs back to the sender.",
    contrastUs: "We document condition on pickup and provide proof-of-delivery photos and signatures.",
  },
  {
    title: "Responsive dispatch team",
    description:
      "Local dispatch handles schedule changes, special instructions, and rush orders in real time.",
    icon: Headset,
    stat: "Live support",
    contrastOther: "Generic hotlines route you through wait times and scripts.",
    contrastUs: "Direct line to Edmonton dispatch with escalation paths for urgent deliveries.",
  },
]

const pricingTiers: PricingTier[] = [
  {
    name: "Per-Delivery Courier",
    price: "$150",
    period: "flat rate",
    description:
      "Core appliance, furniture, and parcel delivery inside Edmonton with real-time SMS tracking included.",
    features: [
      { text: "Pickup + delivery anywhere within city limits" },
      { text: "Single appliance or multi-parcel capacity up to 1,200 lbs" },
      { text: "Live GPS link, SMS updates, and proof-of-delivery photos" },
      { text: "No hidden fees—fuel and mileage included" },
      { text: "NOT included: after-hours rush outside Edmonton", isNegative: true },
    ],
    highlighted: false, // Set to false if you want the middle one to stand out more
    badge: "$150 flat rate",
    ctaLabel: "Book on Kijiji",
    ctaHref: "https://www.kijiji.ca/your-ad-link", // Updated
    privacyNote: "No hidden fees. Flat rate. SMS tracking included.",
  },
  {
    name: "Bulk / Contract Rates",
    price: "Custom",
    period: "for recurring retailers",
    description:
      "Weekly or multi-stop routes for appliance retailers and eCommerce brands with consolidated invoicing.",
    features: [
      { text: "Dedicated drivers familiar with your pickup process" },
      { text: "Route optimization and load planning included" },
      { text: "Automated SMS status for your team and customers" },
      { text: "API or CSV order imports into dispatch" },
      { text: "NOT included: storage or warehousing", isNegative: true },
    ],
    highlighted: true, // Middle card is now the focus
    ribbon: "Retailer favourite",
    ctaLabel: "Request contract pricing",
    ctaHref: "/request-contract",
    theme: "dark",
    privacyNote: "Custom pricing with dedicated dispatch support and SMS tracking.",
  },
  {
    name: "Premium Same-Day",
    price: "$225",
    period: "priority dispatch",
    description:
      "Rush appliance or courier deliveries with immediate dispatch, priority driver assignment, and white-glove communication.",
    features: [
      { text: "Orders accepted until 2 p.m. for same-day completion" },
      { text: "Priority support line direct to dispatch" },
      { text: "Expanded tracking with customer call-ahead" },
      { text: "Optional two-person carry for tight spaces" },
      { text: "NOT included: cross-province routes", isNegative: true },
    ],
    badge: "Rush option",
    ctaLabel: "View Kijiji Listing",
    ctaHref: "https://www.kijiji.ca/your-ad-link", // Updated
    theme: "premium",
    privacyNote: "Flat rush fee with bonded drivers and SMS tracking every step.",
  },
]

const audienceSegments: AudienceSegment[] = [
  {
    title: "For Appliance Retailers",
    badge: "B2B",
    description:
      "Recurring delivery contracts, POS integrations, and proactive communication keep your customers delighted and your team focused on sales.",
    highlights: [
      {
        icon: ShoppingCart,
        title: "Contract-ready",
        description: "Weekly and same-day routes mapped to your order exports with consolidated invoicing.",
      },
      {
        icon: MessageSquare,
        title: "Workflow integration",
        description: "Submit jobs via API, CSV, or SMS—dispatch confirms within 30 minutes.",
      },
      {
        icon: Smartphone,
        title: "Shared visibility",
        description: "SMS notifications keep store teams and customers aligned on arrival times.",
      },
    ],
    note: "Need installers looped in? We add them to the same SMS thread for seamless handoffs.",
    ctaLabel: "Book a retailer consult",
    ctaHref: "/quote?segment=retailer",
  },
  {
    title: "For Consumers",
    badge: "B2C",
    description:
      "Affordable, professional appliance and furniture delivery when you find the perfect deal on Kijiji, Facebook Marketplace, or at a local shop.",
    highlights: [
      {
        icon: User,
        title: "Flat $150 pricing",
        description: "One upfront rate inside Edmonton—no surprise add-ons at the door.",
      },
      {
        icon: Package,
        title: "Careful handling",
        description: "Drivers protect appliances, furniture, and parcels like they were their own.",
      },
      {
        icon: PhoneCall,
        title: "Quick booking",
        description: "Text us the pickup link or address and we confirm your slot in minutes.",
      },
    ],
    note: "Available evenings and weekends with photo proof sent right to your phone.",
    ctaLabel: "Schedule my delivery",
    ctaHref: "/quote?segment=consumer",
  },
]

const partnerSteps: PartnerStep[] = [
  {
    title: "Share your delivery workflow",
    description: "Send us sample orders, locations, and delivery frequency so we can map routes and timelines.",
    icon: ClipboardCheck,
  },
  {
    title: "Tailor dispatch & notifications",
    description: "We connect via API, CSV, or SMS and set up branded tracking messages for your team and customers.",
    icon: MessageSquare,
  },
  {
    title: "Launch with a pilot week",
    description: "Run a trial batch with live reporting, then scale into recurring contracts with consolidated billing.",
    icon: Zap,
  },
]

const faqItems: FAQItem[] = [
  {
    question: "What's included in the $150 delivery?",
    answer:
      "Pickup and drop-off anywhere within Edmonton city limits, professional drivers, loading support, SMS tracking, and proof-of-delivery photos are all included.",
  },
  {
    question: "How do I track my delivery?",
    answer:
      "Every booking gets a unique tracking link. Dispatch also texts status updates at acceptance, pickup, en-route, and delivery confirmation.",
  },
  {
    question: "Do you offer contracts for retailers?",
    answer:
      "Yes. We provide custom pricing, recurring time slots, and integrations with your ordering systems so your team can dispatch jobs in a few clicks.",
  },
]

export default function Home() {
  const shouldReduceMotion = useReducedMotion()
  const reduceMotion = shouldReduceMotion ?? false

  const sectionVariants = useMemo(
    () => createSectionVariants(reduceMotion),
    [reduceMotion],
  )
  const staggerContainerVariants = useMemo(
    () => createStaggerContainer(reduceMotion),
    [reduceMotion],
  )
  const staggerItemVariants = useMemo(
    () => createStaggerItem(reduceMotion),
    [reduceMotion],
  )
  const motionStyle = useMemo<CSSProperties>(
    () => ({ willChange: "opacity, transform" }),
    [],
  )

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black font-sans text-slate-100">
      <NavBar />

      <AnimatePresence mode="wait">
        <motion.main
          key="landing-home"
          layout
          className="flex flex-col bg-transparent"
          variants={sectionVariants}
          initial={reduceMotion ? undefined : "hidden"}
          animate={reduceMotion ? undefined : "show"}
          exit={reduceMotion ? undefined : "exit"}
          transition={{ duration: 0.4, ease: DEFAULT_EASE }}
          style={motionStyle}
        >
          {/* Hero section animates immediately with gentle rise and CTA sequencing. */}
          <motion.section
            id="hero"
            layout
            variants={sectionVariants}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.5, ease: DEFAULT_EASE }}
            className="relative"
            style={motionStyle}
          >
            <div className="pointer-events-none absolute -left-24 top-[-15rem] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-[-8rem] h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
            <motion.div
              layout
              className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col items-center justify-center gap-12 px-6 py-24 text-center sm:px-8 lg:px-12"
              variants={staggerContainerVariants}
              style={motionStyle}
            >
              {heroFloatingIcons.map((item, index) => {
                const Icon = item.icon
                return (
                  <Icon
                    key={index}
                    aria-hidden="true"
                    className={`pointer-events-none absolute -z-10 hidden sm:block ${item.colorClass} ${item.opacityClass} ${item.sizeClass} ${item.animationClass} ${item.className}`}
                    style={item.style}
                  />
                )
              })}
              <motion.div
                layout
                variants={staggerItemVariants}
                className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-300 shadow-inner"
                style={motionStyle}
              >
                <Package className="h-4 w-4" />
                Flat-rate Edmonton delivery service
              </motion.div>
              <motion.h1
                layout
                variants={staggerItemVariants}
                className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
                style={motionStyle}
              >
                Reliable appliance delivery and courier service for Edmonton businesses and consumers
              </motion.h1>
              <motion.p
                layout
                variants={staggerItemVariants}
                className="max-w-2xl text-lg font-semibold text-blue-300 sm:text-xl"
                style={motionStyle}
              >
                Flat $150 per delivery, same-day or next-day availability, and real-time SMS tracking keep every order simple and predictable.
              </motion.p>
              <motion.p
                layout
                variants={staggerItemVariants}
                className="max-w-2xl text-lg text-slate-300 sm:text-xl"
                style={motionStyle}
              >
                EW Transportation is your nimble logistics partner—bonded drivers, responsive dispatch, and modern tracking built for appliance retailers and marketplace buyers alike.
              </motion.p>
              <motion.div
                layout
                variants={staggerItemVariants}
                className="flex flex-col gap-4 sm:flex-row"
                style={motionStyle}
              >
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 px-7 py-3 text-base font-semibold text-slate-950 shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-400/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
                >
                  <Truck className="h-4 w-4" />
                  Book a delivery
                </Link>
                <Link
                  href="#audiences"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-base font-semibold text-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
                >
                  <ShoppingCart className="h-4 w-4 text-cyan-400" />
                  For retailers & consumers
                </Link>
              </motion.div>
              <motion.div
                layout
                variants={staggerItemVariants}
                className="flex items-center gap-3 text-sm text-slate-400"
                style={motionStyle}
              >
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>Flat rate $150 · Same-day or next-day · SMS tracking included</span>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Problem section waits for scroll and staggers each pain point card. */}
          <motion.section
            id="problem"
            layout
            className="scroll-mt-0 bg-gradient-to-b from-slate-950 via-black to-slate-950 py-20"
            variants={sectionVariants}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.45, ease: DEFAULT_EASE }}
            style={motionStyle}
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <motion.div
                layout
                className="mx-auto max-w-3xl text-center"
                variants={staggerContainerVariants}
                style={motionStyle}
              >
                <motion.h2
                  layout
                  variants={staggerItemVariants}
                  className="text-3xl font-bold sm:text-4xl text-slate-100"
                  style={motionStyle}
                >
                  Delivery delays shouldn't derail your day
                </motion.h2>
                <motion.div
                  layout
                  variants={staggerContainerVariants}
                  className="mt-8 flex flex-col gap-3 text-lg text-slate-300"
                  style={motionStyle}
                >
                  {[
                    "Retail teams waste hours chasing couriers who won't confirm pickup windows.",
                    "Marketplace buyers gamble on cash drivers with no insurance or proof of delivery.",
                    "Hidden surcharges turn a simple drop-off into an expensive surprise.",
                    "Most services still rely on voicemail tag instead of instant SMS tracking.",
                    "A modern city needs a modern delivery partner built for speed and transparency.",
                  ].map((line) => (
                    <motion.p
                      key={line}
                      layout
                      variants={staggerItemVariants}
                      style={motionStyle}
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mt-16 space-y-6"
                style={motionStyle}
              >
                {challenges.map((item) => (
                  <motion.article
                    key={item.title}
                    layout
                    variants={staggerItemVariants}
                    className="flex items-start gap-4"
                    style={motionStyle}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                      <item.icon className="h-6 w-6" />
                    </span>
                    <div className="flex-1 text-left">
                      {item.stat ? (
                        <p className="text-xl font-semibold text-blue-300 sm:text-2xl">
                          {item.stat}
                        </p>
                      ) : null}
                      {item.statSource ? (
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          {item.statSource}
                        </p>
                      ) : null}
                      <h3 className="mt-2 text-lg font-semibold text-slate-100">{item.title}</h3>
                      <p className="mt-1 text-base text-slate-300">{item.description}</p>
                      {item.contextNote ? (
                        <p className="mt-2 text-sm font-medium text-cyan-300/80">{item.contextNote}</p>
                      ) : null}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
              <motion.p
                layout
                variants={staggerItemVariants}
                className="mt-10 text-left text-sm text-slate-500 sm:text-center"
                style={motionStyle}
              >
                Sources: Retail Logistics Report 2025, Prairies Delivery Study 2024, Alberta Consumer Council 2025.
              </motion.p>
            </div>
          </motion.section>

          {/* Solution section uses staggered cards to explain phased support. */}
          <motion.section
            id="solution"
            layout
            className="scroll-mt-32 bg-gradient-to-b from-slate-950 via-black to-slate-950 py-20"
            variants={sectionVariants}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.5, ease: DEFAULT_EASE }}
            style={motionStyle}
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mx-auto max-w-3xl text-center"
                style={motionStyle}
              >
                <motion.h2
                  layout
                  variants={staggerItemVariants}
                  className="text-3xl font-semibold sm:text-4xl text-slate-100"
                  style={motionStyle}
                >
                  Specialized delivery ops without the overhead
                </motion.h2>
                <motion.p
                  layout
                  variants={staggerItemVariants}
                  className="mt-4 text-lg text-slate-300"
                  style={motionStyle}
                >
                  EW Transportation combines bonded drivers, responsive dispatch, and real-time software so every appliance, furniture piece, or parcel arrives on schedule.
                </motion.p>
              </motion.div>
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mt-14 grid gap-10 md:grid-cols-2"
                style={motionStyle}
              >
                {solutionPoints.map((point, index) => {
                  const Icon = point.icon
                  const stepNumber = index + 1
                  const totalSteps = solutionPoints.length
                  return (
                    <motion.article
                      key={point.highlight}
                      layout
                      variants={staggerItemVariants}
                      className="flex h-full flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-lg shadow-blue-500/10 transition-transform duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-blue-500/20"
                      style={motionStyle}
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 text-xl font-bold text-slate-950">
                          {stepNumber}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                          Step {stepNumber} of {totalSteps}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-cyan-300">
                        <Icon className="h-5 w-5" />
                        {point.highlight}
                      </span>
                      <h3 className="text-2xl font-semibold text-slate-100">
                        <span className="inline-block bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text font-bold text-transparent">
                          {point.emphasis}
                        </span>
                        <span className="mt-1 block text-lg font-semibold text-slate-300">
                          {point.title}
                        </span>
                      </h3>
                      <p className="text-base text-slate-300">{point.description}</p>
                      <motion.ul
                        layout
                        variants={staggerContainerVariants}
                        className="mt-4 space-y-3 text-base text-slate-300"
                        style={motionStyle}
                      >
                        {point.bullets.map((bullet) => (
                          <motion.li
                            key={bullet}
                            layout
                            variants={staggerItemVariants}
                            className="flex items-start gap-4"
                            style={motionStyle}
                          >
                            <CheckCircle2 className="mt-1 size-5 flex-shrink-0 text-blue-400" />
                            <span className="font-medium text-slate-100">{bullet}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.article>
                  )
                })}
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            id="audiences"
            layout
            className="scroll-mt-32 bg-gradient-to-b from-black via-slate-950 to-black py-20"
            variants={sectionVariants}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.5, ease: DEFAULT_EASE }}
            style={motionStyle}
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mx-auto max-w-3xl text-center"
                style={motionStyle}
              >
                <motion.span
                  layout
                  variants={staggerItemVariants}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-cyan-300"
                  style={motionStyle}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Two audiences, one delivery partner
                </motion.span>
                <motion.h2
                  layout
                  variants={staggerItemVariants}
                  className="mt-4 text-3xl font-semibold sm:text-4xl text-slate-100"
                  style={motionStyle}
                >
                  Built for appliance retailers and everyday buyers
                </motion.h2>
                <motion.p
                  layout
                  variants={staggerItemVariants}
                  className="mt-4 text-lg text-slate-300"
                  style={motionStyle}
                >
                  Whether you manage weekly delivery runs or just scored the perfect marketplace deal, EW Transportation keeps every drop-off fast, affordable, and transparent.
                </motion.p>
              </motion.div>
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mt-14 grid gap-10 md:grid-cols-2"
                style={motionStyle}
              >
                {audienceSegments.map((segment) => (
                  <motion.article
                    key={segment.title}
                    layout
                    variants={staggerItemVariants}
                    className="flex h-full flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-left shadow-lg shadow-blue-500/10 transition-transform duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-blue-500/20"
                    style={motionStyle}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                        {segment.badge}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Focused support
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-100">{segment.title}</h3>
                    <p className="text-base text-slate-300">{segment.description}</p>
                    <motion.ul
                      layout
                      variants={staggerContainerVariants}
                      className="space-y-4"
                      style={motionStyle}
                    >
                      {segment.highlights.map((item) => {
                        const HighlightIcon = item.icon
                        return (
                          <motion.li
                            key={item.title}
                            layout
                            variants={staggerItemVariants}
                            className="flex items-start gap-3"
                            style={motionStyle}
                          >
                            <span className="mt-0.5 rounded-xl bg-blue-500/10 p-2 text-cyan-300">
                              <HighlightIcon className="h-4 w-4" />
                            </span>
                            <div className="space-y-1">
                              <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                              <p className="text-sm text-slate-300">{item.description}</p>
                            </div>
                          </motion.li>
                        )
                      })}
                    </motion.ul>
                    {segment.note ? (
                      <p className="rounded-2xl border border-blue-500/30 bg-slate-950/80 px-4 py-3 text-sm font-medium text-cyan-200">
                        {segment.note}
                      </p>
                    ) : null}
                    <div className="mt-auto">
                      <Link
                        href={segment.ctaHref}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-blue-400/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
                      >
                        <Route className="h-4 w-4" />
                        {segment.ctaLabel}
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
              <motion.div
                layout
                variants={staggerItemVariants}
                className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-blue-500/30 bg-blue-500/10 px-8 py-10 text-center shadow-lg shadow-blue-500/10 sm:flex-row sm:items-center sm:text-left"
                style={motionStyle}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="h-10 w-10 text-cyan-300" />
                  <span className="text-lg font-semibold text-slate-100">Custom SMS tracking software</span>
                </div>
                <p className="text-sm text-slate-200 sm:flex-1">
                  Keeps customers informed every step of the way with automated pickup, en-route, and delivery confirmations.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/**
        <section id="features" className="scroll-mt-32 bg-black py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-6 text-center">
              <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-cyan-300">
                <ShieldCheck className="h-4 w-4" />
                Platform Features
              </span>
              <h2 className="text-3xl font-semibold sm:text-4xl text-slate-100">Features that boost trust and bookings</h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-300">
                We mix modern logistics, pro handling, and technology so every move arrives on time.
              </p>
            </div>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {featureHighlights.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg shadow-blue-500/15 transition-transform duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-blue-500/20"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-cyan-300">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold text-slate-100">{item.title}</h3>
                  <p className="text-base text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        */}

          {/* Process section uses pinned timeline line and staggered cards triggered on view. */}
          <motion.section
            id="process"
            layout
            className="scroll-mt-32 bg-gradient-to-b from-black via-slate-950 to-black py-20"
            variants={sectionVariants}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.5, ease: DEFAULT_EASE }}
            style={motionStyle}
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mx-auto max-w-3xl text-center"
                style={motionStyle}
              >
                <motion.span
                  layout
                  variants={staggerItemVariants}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-cyan-300"
                  style={motionStyle}
                >
                  <ClipboardCheck className="h-4 w-4" />
                  3-step delivery workflow
                </motion.span>
                <motion.h2
                  layout
                  variants={staggerItemVariants}
                  className="mt-4 text-3xl font-semibold sm:text-4xl text-slate-100"
                  style={motionStyle}
                >
                  From request to confirmation without missed beats
                </motion.h2>
                <motion.p
                  layout
                  variants={staggerItemVariants}
                  className="mt-3 text-lg text-slate-300"
                  style={motionStyle}
                >
                  Submit the job, track the route, receive proof—our dispatch keeps the handoffs tight every step of the way.
                </motion.p>
              </motion.div>
              <motion.div
                layout
                className="relative mt-16"
                variants={staggerContainerVariants}
                style={motionStyle}
              >
                <div className="pointer-events-none absolute left-[34px] top-16 h-[calc(100%-48px)] w-px bg-gradient-to-b from-blue-500/30 via-cyan-400/30 to-blue-500/10 md:hidden" />
                <div className="pointer-events-none absolute top-12 hidden h-px w-full bg-gradient-to-r from-blue-500/30 via-cyan-400/40 to-blue-500/20 md:block" />
                <motion.div
                  layout
                  variants={staggerContainerVariants}
                  className="grid gap-10 md:grid-cols-3"
                  style={motionStyle}
                >
                  {processSteps.map((step) => {
                    const Icon = step.icon
                    const isHighlight = Boolean(step.highlight)
                    return (
                      <motion.article
                        key={step.phase}
                        layout
                        variants={staggerItemVariants}
                        className={`relative flex h-full flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg shadow-blue-500/10 transition-transform duration-300 hover:-translate-y-2 ${isHighlight ? "border-blue-500/60 bg-slate-900/90 shadow-blue-500/20" : ""
                          }`}
                        style={motionStyle}
                      >
                        <span className="pointer-events-none absolute left-[27px] top-14 h-3 w-3 rounded-full bg-cyan-400 md:hidden" />
                        <span className="pointer-events-none absolute left-1/2 top-0 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-blue-500 md:block" />
                        <div className="flex items-start gap-4">
                          <span
                            className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-bold shadow-lg shadow-blue-500/15 ${isHighlight
                              ? "bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 text-slate-950"
                              : "bg-slate-800 text-cyan-300"
                              }`}
                          >
                            {step.phase}
                          </span>
                          <div className="flex flex-col text-left">
                            <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-cyan-300">
                              <Icon className="h-5 w-5" />
                              {step.timeframe}
                            </span>
                            <h3 className="mt-2 text-xl font-semibold text-slate-100">{step.title}</h3>
                            {isHighlight ? (
                              <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-950">
                                Priority phase
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <p className="text-lg font-semibold text-blue-300">{step.outcome}</p>
                        <p className="rounded-2xl bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-300">{step.support}</p>
                        {isHighlight ? (
                          <p className="mt-3 rounded-2xl border border-blue-500/40 bg-slate-950 px-4 py-3 text-sm font-semibold text-cyan-300">
                            Tracking links, dispatch updates, and liftgate handling keep your items secure.
                          </p>
                        ) : null}
                      </motion.article>
                    )
                  })}
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Services gallery cascades cards with whileInView trigger for each row. 
          <motion.section
            id="services"
            layout
            className="scroll-mt-32 bg-gradient-to-b from-slate-950 via-black to-slate-950 py-20"
            variants={sectionVariants}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.5, ease: DEFAULT_EASE }}
            style={motionStyle}
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="max-w-3xl"
                style={motionStyle}
              >
                <motion.h2
                  layout
                  variants={staggerItemVariants}
                  className="text-3xl font-semibold sm:text-4xl text-slate-100"
                  style={motionStyle}
                >
                  Moves, deliveries, and relocations we handle every week
                </motion.h2>
                <motion.p
                  layout
                  variants={staggerItemVariants}
                  className="mt-4 text-lg text-slate-300"
                  style={motionStyle}
                >
                  From downtown offices to suburban homes, our Edmonton crews bring liftgates, protection, and on-time arrivals to every job.
                </motion.p>
              </motion.div>
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mt-14 grid gap-10 lg:grid-cols-3"
                style={motionStyle}
              >
                <AnimatePresence mode="popLayout">
                  {serviceExamples.map((service) => (
                    <motion.article
                      key={service.name}
                      layout
                      variants={staggerItemVariants}
                      initial={reduceMotion ? undefined : "hidden"}
                      animate={reduceMotion ? undefined : "show"}
                      exit={reduceMotion ? undefined : "exit"}
                      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-lg shadow-blue-500/10 transition-transform duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-blue-500/20 md:cursor-pointer"
                      style={motionStyle}
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                          priority={false}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      </div>
                      <div className="flex flex-1 flex-col px-8 pb-8 pt-6">
                        <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                          {service.category}
                        </div>
                        <h3 className="mt-2 text-xl font-semibold text-slate-100">{service.name}</h3>
                        <p className="mt-3 flex-1 text-base text-slate-300">{service.description}</p>
                        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-300">
                          <service.icon className="h-4 w-4" />
                          Powered by EW Transportation
                        </div>
                        <Link
                          href={service.href}
                          target="_blank"
                          rel="noreferrer"
                          prefetch={false}
                          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-blue-500/20 transition hover:-translate-y-1 hover:shadow-blue-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 md:hidden"
                        >
                          Open preview
                        </Link>
                      </div>
                      <Link
                        href={service.href}
                        target="_blank"
                        rel="noreferrer"
                        prefetch={false}
                        aria-label={`Open ${service.name} preview in a new tab`}
                        className="absolute inset-0 hidden md:block"
                      />
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.section>*/}

          {/* Trust section layers badges with stagger to emphasize credibility. */}
          {/* Trust section layers badges with stagger to emphasize credibility. */}

          <motion.section
            id="trust"
            layout
            className="scroll-mt-32 bg-gradient-to-b from-black via-slate-950 to-black py-20"
            variants={sectionVariants}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.5, ease: DEFAULT_EASE }}
            style={motionStyle}
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mx-auto max-w-3xl text-center mb-14"
                style={motionStyle}
              >
                <motion.span
                  layout
                  variants={staggerItemVariants}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-cyan-300"
                  style={motionStyle}
                >
                  <BadgeCheck className="h-4 w-4" />
                  EW vs. the rest
                </motion.span>
                <motion.h2
                  layout
                  variants={staggerItemVariants}
                  className="mt-4 text-3xl font-semibold sm:text-4xl text-slate-100"
                  style={motionStyle}
                >
                  Why generic couriers fall short — and we don't
                </motion.h2>
                <motion.p
                  layout
                  variants={staggerItemVariants}
                  className="mt-3 text-lg text-slate-300"
                  style={motionStyle}
                >
                  Most delivery options leave you guessing — unvetted drivers, surprise
                  fees, and zero communication. See exactly how EW Transportation
                  compares across the things that actually matter.
                </motion.p>
              </motion.div>

              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mt-4 grid gap-8 md:grid-cols-2"
                style={motionStyle}
              >
                <AnimatePresence mode="popLayout">
                  {trustSignals.map((signal, index) => {
                    const Icon = signal.icon
                    const isHighlight = Boolean(signal.highlight)
                    const badgeNumber = index + 1
                    return (
                      <motion.article
                        key={signal.title}
                        layout
                        variants={staggerItemVariants}
                        initial={reduceMotion ? undefined : "hidden"}
                        animate={reduceMotion ? undefined : "show"}
                        exit={reduceMotion ? undefined : "exit"}
                        className={`flex h-full flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-left shadow-lg shadow-blue-500/10 transition-transform duration-300 hover:-translate-y-2 ${isHighlight
                          ? "border-blue-500/50 bg-slate-900/90 shadow-blue-500/20"
                          : "hover:border-blue-500/30 hover:bg-slate-900/80"
                          }`}
                        style={motionStyle}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold ${isHighlight
                              ? "bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 text-slate-950"
                              : "bg-slate-800 text-cyan-300"
                              }`}
                          >
                            {badgeNumber}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                            Ref #{badgeNumber}
                          </span>
                        </div>
                        <span
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${isHighlight
                            ? "bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 text-slate-950"
                            : "bg-slate-800 text-cyan-300"
                            }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        {signal.stat ? (
                          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                            {signal.stat}
                          </span>
                        ) : null}
                        <h3 className="text-lg font-semibold text-slate-100">{signal.title}</h3>
                        <p className="text-sm text-slate-300">{signal.description}</p>
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="flex items-start gap-2 text-slate-400">
                            <XCircle className="mt-0.5 size-4 flex-shrink-0 text-red-400/80" />
                            <span>{signal.contrastOther}</span>
                          </div>
                          <div className="flex items-start gap-2 font-semibold text-slate-100">
                            <CheckCircle2 className="mt-0.5 size-4 flex-shrink-0 text-cyan-300" />
                            <span>{signal.contrastUs}</span>
                          </div>
                        </div>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mt-16 flex flex-col items-center gap-4 text-center"
                style={motionStyle}
              >
                <motion.p
                  layout
                  variants={staggerItemVariants}
                  className="text-sm font-medium uppercase tracking-wide text-cyan-300"
                  style={motionStyle}
                >
                  Ready when you are: book a move, schedule a courier, or plan your next relocation
                </motion.p>
                <motion.div
                  layout
                  variants={staggerItemVariants}
                  style={motionStyle}
                >
                  <Link
                    href="#pricing"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-xl shadow-blue-500/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-blue-400/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
                  >
                    <Truck className="h-4 w-4" />
                    Get a custom quote
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Pricing section staggers cards and respects plan theme styling. */}
          <motion.section
            id="pricing"
            layout
            className="scroll-mt-32 bg-gradient-to-b from-slate-950 via-black to-slate-950 py-20"
            variants={sectionVariants}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.55, ease: DEFAULT_EASE }
            }
            style={motionStyle}
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="flex flex-col gap-6 text-center"
                style={motionStyle}
              >
                <motion.span
                  layout
                  variants={staggerItemVariants}
                  className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-cyan-300"
                  style={motionStyle}
                >
                  <CalendarDays className="h-4 w-4" />
                  Services & Pricing
                </motion.span>
                <motion.h2
                  layout
                  variants={staggerItemVariants}
                  className="text-3xl font-semibold sm:text-4xl text-slate-100"
                  style={motionStyle}
                >
                  Choose the coverage that fits your move or delivery
                </motion.h2>
                <motion.p
                  layout
                  variants={staggerItemVariants}
                  className="mx-auto max-w-2xl text-lg text-slate-300"
                  style={motionStyle}
                >
                  Transparent rates, tailgate service, and insured crews ready for residential, commercial, and courier jobs across Edmonton.
                </motion.p>
                <motion.p
                  layout
                  variants={staggerItemVariants}
                  className="mx-auto max-w-2xl text-base text-slate-400"
                  style={motionStyle}
                >
                  Need something unique? Call dispatch for a custom route or multi-day project.
                </motion.p>
              </motion.div>
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mt-14 grid gap-10 lg:grid-cols-3"
                style={motionStyle}
              >
                <AnimatePresence mode="popLayout">
                  {pricingTiers.map((tier) => {
                    const theme = tier.theme ?? "light"
                    const isDark = theme === "dark"
                    const isPremium = theme === "premium"

                    // Logic to check if it's an external link (like Kijiji)
                    const isExternal = tier.ctaHref.startsWith('http');

                    const daysRemaining = tier.countdownTarget
                      ? Math.max(
                        0,
                        Math.ceil(
                          (new Date(tier.countdownTarget).getTime() - Date.now()) /
                          (1000 * 60 * 60 * 24)
                        )
                      )
                      : null

                    return (
                      <motion.article
                        key={tier.name}
                        layout
                        variants={staggerItemVariants}
                        initial={reduceMotion ? undefined : "hidden"}
                        animate={reduceMotion ? undefined : "show"}
                        exit={reduceMotion ? undefined : "exit"}
                        className={`relative flex h-full flex-col rounded-3xl border border-slate-800 p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2 ${tier.highlighted ? "scale-[1.02] border-blue-500/50" : ""
                          } ${isPremium
                            ? "bg-gradient-to-br from-blue-950 via-black to-blue-900 text-slate-100"
                            : isDark
                              ? "bg-slate-900 text-slate-100"
                              : "bg-slate-900/60 text-slate-100"
                          }`}
                        style={motionStyle}
                      >
                        {/* ... (Ribbon and Badge code remains the same) ... */}

                        <div className="mt-4 text-sm font-semibold uppercase tracking-wide text-cyan-300">
                          {tier.name}
                        </div>

                        <div className="mt-4 flex items-baseline gap-2">
                          <span className="text-4xl font-semibold text-white">{tier.price}</span>
                          <span className="text-sm text-slate-400">{tier.period}</span>
                        </div>

                        <p className="mt-4 text-sm font-medium text-slate-300">
                          {tier.description}
                        </p>

                        {/* ... (Features List code remains the same) ... */}

                        <div className="mt-8">
                          <Link
                            href={tier.ctaHref}
                            target={isExternal ? "_blank" : undefined} // Forces blank page for Kijiji
                            rel={isExternal ? "noopener noreferrer" : undefined} // Security best practice
                            className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 ${isPremium
                                ? "bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-slate-100 hover:from-sky-500"
                                : isDark
                                  ? "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-slate-100 hover:from-blue-500"
                                  : tier.highlighted
                                    ? "bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 text-slate-950"
                                    : "border border-slate-700 text-slate-100 hover:bg-slate-900"
                              }`}
                          >
                            <Truck className="h-4 w-4" />
                            {tier.ctaLabel}
                          </Link>
                        </div>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.section >

        </motion.main >
      </AnimatePresence >

      <CommonFooter />
    </div >
  )
}
