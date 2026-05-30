"use client";

import React, { useState, useCallback, useId } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Check, Phone } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export function ContactClient() {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const messageId = useId();

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  }, []);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^[+]?[\d\s\-().]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Message Sent!</h2>
          <p className="text-gray-400 leading-relaxed">
            Thanks for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a192f]">
      <section className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" animate="show" variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-cyan-400 text-xs tracking-widest uppercase mb-3">Get in touch</motion.p>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Together</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Tell us what you&apos;re building. We&apos;ll tell you exactly how we&apos;d deliver it, what it will cost, and when you&apos;ll have it.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Left — info */}
            <motion.div
              initial="hidden" animate="show" variants={stagger}
              className="lg:col-span-2 space-y-6"
            >
              <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-gray-800/60 bg-gray-900/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-white text-sm font-medium">Email us</span>
                </div>
                <a href="mailto:connect@saapify.in" className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">
                  connect@saapify.in
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-gray-800/60 bg-gray-900/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-white text-sm font-medium">Call us</span>
                </div>
                <p className="text-gray-400 text-sm">Available Mon–Fri, 10am–7pm IST</p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-gray-800/60 bg-gray-900/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-white text-sm font-medium">Location</span>
                </div>
                <p className="text-gray-400 text-sm">India — serving clients globally</p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05]">
                <p className="text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">Response time</p>
                <p className="text-white text-sm font-medium">Within 24 hours</p>
                <p className="text-gray-500 text-xs mt-1">We respond to every inquiry the same business day.</p>
              </motion.div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="p-6 sm:p-8 rounded-2xl border border-gray-800/60 bg-gray-900/40">
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={nameId} className="block text-[10px] font-mono text-gray-400 mb-1.5 tracking-widest uppercase">
                        Full Name *
                      </label>
                      <input
                        id={nameId} type="text" name="name" value={form.name}
                        onChange={handleChange} placeholder="Jane Smith"
                        className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all text-sm ${
                          errors.name ? "border-red-500/60" : "border-gray-700"
                        }`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor={emailId} className="block text-[10px] font-mono text-gray-400 mb-1.5 tracking-widest uppercase">
                        Email *
                      </label>
                      <input
                        id={emailId} type="email" name="email" value={form.email}
                        onChange={handleChange} placeholder="jane@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all text-sm ${
                          errors.email ? "border-red-500/60" : "border-gray-700"
                        }`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor={phoneId} className="block text-[10px] font-mono text-gray-400 mb-1.5 tracking-widest uppercase">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                      <input
                        id={phoneId} type="tel" name="phone" value={form.phone}
                        onChange={handleChange} placeholder="Enter your phone number"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all text-sm ${
                          errors.phone ? "border-red-500/60" : "border-gray-700"
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor={messageId} className="block text-[10px] font-mono text-gray-400 mb-1.5 tracking-widest uppercase">
                      Message *
                    </label>
                    <textarea
                      id={messageId} name="message" rows={5} value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project — what you're building, your timeline, and any specific requirements..."
                      className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none text-sm ${
                        errors.message ? "border-red-500/60" : "border-gray-700"
                      }`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit" disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <>Send Message <ArrowUpRight className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-gray-600 text-xs text-center">
                    We&apos;ll never share your information. Privacy guaranteed.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
