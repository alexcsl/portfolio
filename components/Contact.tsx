"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { SITE } from "@/lib/data";

const LINKS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, icon: Mail },
  { label: "GitHub", value: "@alexcsl", href: SITE.github, icon: Github },
  { label: "LinkedIn", value: "in/alexcsl", href: SITE.linkedin, icon: Linkedin },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Contact"
          title={
            <>
              Let&apos;s build{" "}
              <span className="gradient-text">something&nbsp;good.</span>
            </>
          }
          description="Open to collaborations, hackathon teams, and internship opportunities in blockchain, AI, or fullstack engineering."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card lg:col-span-7 p-7 sm:p-10 flex flex-col gap-6"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--accent))]">
                Get in touch
              </span>
              <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
                The fastest way is email.
              </h3>
              <p className="mt-3 text-[rgb(var(--fg-muted))] leading-relaxed">
                I reply to most messages within a day. For everything else, here&apos;s where
                else you can find me online.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href={`mailto:${SITE.email}`} className="btn-primary">
                <Mail className="h-4 w-4" /> {SITE.email}
              </a>
              <a
                href={SITE.cv}
                download
                className="btn-ghost"
              >
                <Download className="h-4 w-4" /> Download CV
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-3"
          >
            {LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="glass-card flex items-center justify-between gap-4 p-5 hover:border-accent-500/40 group"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent))]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--fg-muted))]">
                        {link.label}
                      </span>
                      <span className="text-sm font-medium text-[rgb(var(--fg))]">
                        {link.value}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[rgb(var(--fg-muted))] group-hover:text-[rgb(var(--accent))] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
