"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Glow } from "@/components/ui/glow";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react";
import Link from "next/link";

const navigation = {
  main: [
    { href: "/360-photo-booth", name: "360° Photo Booth" },
    { href: "/photo-booth", name: "Photo Booth" },
    { href: "/ozadja", name: "Ozadja" },
    { href: "/rekviziti", name: "Rekviziti" },
    { href: "/reference", name: "Reference" },
    { href: "/blog", name: "Blog" },
  ],
  legal: [
    { name: "Zasebnost", href: "/zasebnost" },
    { name: "Pogoji uporabe", href: "/pogoji" },
    { name: "Piškotki", href: "/piskotki" },
  ],
  social: [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  ],
  contact: {
    address: ["Slomškova ulica 1", "2230 Lenart v Slovenskih goricah"],
    phone: "+386 31 285 143 / +386 31 544 751",
    email: "info@360booth.si",
  },
};

function Footer() {
  return (
    <footer className="relative border-t border-[#2F2F2F] bg-gradient-to-b from-[#1E1E1E] to-[#161616] text-gray-100 transition-colors duration-300 overflow-hidden">
      <Glow variant="center" className="opacity-30" />
      <div className="absolute inset-0 bg-grid-white/[0.03]" />
      <div className="relative container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Ostanite v stiku
            </h2>
            <p className="mb-6 text-muted-foreground">
              Pridružite se našemu newsletterju za najnovejše posodobitve in
              ekskluzivne ponudbe.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Vpišite vaš email"
                className="pr-12 backdrop-blur-sm bg-background/80 border-[#C99566]/20"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-[#C99566] text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#C99566]/20"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Naroči se</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-[#C99566]/20 blur-2xl animate-pulse" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Hitre povezave</h3>
            <nav className="space-y-2 text-sm">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kontakt</h3>
            <address className="space-y-2 text-sm not-italic">
              {navigation.contact.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>Tel: {navigation.contact.phone}</p>
              <p>Email: {navigation.contact.email}</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Sledite nam</h3>
            <div className="mb-6 flex space-x-4">
              {navigation.social.map((item) => (
                <TooltipProvider key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full backdrop-blur-sm bg-background/80 border-[#C99566]/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#C99566]/20 hover:border-[#C99566]/40"
                        asChild
                      >
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="sr-only">{item.name}</span>
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sledite nam na {item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#2F2F2F] pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-400">
            © 2025 MIPA Solutions. Vse pravice pridržane.
          </p>
          <nav className="flex gap-4 text-sm">
            {navigation.legal.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footer, navigation };
