'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Route } from 'lucide-react';
import { NavBar } from '@/components/landing-page/navbar';
import { motion } from 'framer-motion';
import { Widget } from '@typeform/embed-react';
import { CommonFooter } from '@/components/landing-page/common-footer';

// Replace this with your actual Typeform form ID
const TYPEFORM_FORM_ID = "owkJN2PB";

export default function ContractRequestPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <NavBar />

            {/* Contract Request Section */}
            <section
                className="pt-32 pb-24 px-6 bg-gradient-to-br from-black via-slate-950 to-black"
                id="contract-form"
            >
                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-cyan-300 mb-6">
                            <Route className="h-4 w-4" />
                            Retailer Contract Pricing
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 mt-4">
                            Ready to Lock In{' '}
                            <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Recurring Delivery Rates?
                            </span>
                        </h1>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                            Tell us about your delivery volume and workflow. Our dispatch team will put together a custom contract with dedicated drivers, consolidated invoicing, and real-time SMS tracking built around your schedule.
                        </p>
                    </motion.div>

                    {/* Info Box */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-8 p-4 md:p-6 rounded-xl bg-slate-900 border border-blue-500/40 flex items-start gap-4"
                    >
                        <ShieldCheck className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-xl font-semibold text-white">What happens next?</h2>
                            <p className="text-slate-300 mt-1">
                                Our Edmonton dispatch team reviews every contract request within{' '}
                                <span className="text-cyan-300 font-semibold">one business day</span>. We'll
                                reach out to confirm your route details, delivery frequency, and get your
                                first pilot week on the calendar.
                            </p>
                        </div>
                    </motion.div>

                    {/* Typeform Embed */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full h-[500px] sm:h-[700px] bg-slate-900 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 relative border border-slate-800"
                    >
                        <Widget
                            id={TYPEFORM_FORM_ID}
                            style={{ width: '100%', height: '100%' }}
                            className="my-form"
                        />
                    </motion.div>
                </motion.div>
            </section>

            <CommonFooter />
        </main>
    );
}