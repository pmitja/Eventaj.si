"use client";

import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { StandingTableIcon } from "@/components/icons/StandingTableIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { eventajNav } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown, PackageOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function DesktopNav({ pathname }: { pathname: string }) {
  const [equipmentMenuOpen, setEquipmentMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const keepEquipmentMenuOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setEquipmentMenuOpen(true);
  };

  const scheduleEquipmentMenuClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setEquipmentMenuOpen(false), 160);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  return (
    <>
      <div className="hidden items-center gap-4 text-sm lg:flex xl:gap-7">
        {eventajNav.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          if ("children" in item) {
            return (
              <div
                key={item.href}
                className="flex items-center"
                onMouseEnter={keepEquipmentMenuOpen}
                onMouseLeave={scheduleEquipmentMenuClose}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "font-medium text-[var(--eventaj-ink)] opacity-85 transition-opacity hover:opacity-100",
                    active && "opacity-100",
                  )}
                >
                  {item.label}
                </Link>
                <DropdownMenu
                  open={equipmentMenuOpen}
                  onOpenChange={setEquipmentMenuOpen}
                  modal={false}
                >
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-label="Odpri meni opreme"
                      className="group ml-1 flex h-8 w-8 items-center justify-center rounded-full text-[var(--eventaj-ink)] opacity-65 transition-colors hover:bg-[rgba(20,17,15,0.06)] hover:opacity-100"
                    >
                      <ChevronDown
                        className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                        aria-hidden="true"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={12}
                    className="w-[310px] rounded-[4px] border-[rgba(20,17,15,0.12)] bg-[#FBF8F2] p-2 text-[#14110F] shadow-[0_24px_70px_-28px_rgba(20,17,15,0.55)]"
                    onMouseEnter={keepEquipmentMenuOpen}
                    onMouseLeave={scheduleEquipmentMenuClose}
                    onCloseAutoFocus={(event) => event.preventDefault()}
                  >
                    <DropdownMenuLabel className="flex items-center gap-2.5 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#6B6157]">
                      <PackageOpen className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                      Izdelki za najem
                    </DropdownMenuLabel>
                    {item.children.map((child) => (
                      <DropdownMenuItem
                        key={child.href}
                        asChild
                        className="rounded-[3px] p-0 focus:bg-[#EFE9DD] focus:text-[#14110F]"
                      >
                        <Link
                          href={child.href}
                          className="group/item flex w-full cursor-pointer items-center gap-4 px-3 py-3.5 no-underline outline-none"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(20,17,15,0.14)] bg-[#FBF8F2]">
                            <StandingTableIcon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-serif-display text-lg leading-tight">
                              {child.label}
                            </span>
                            <span className="mt-1 block text-xs text-[#6B6157]">
                              {child.description}
                            </span>
                          </span>
                          <ArrowUpRight
                            className="h-4 w-4 shrink-0 text-[#6B6157] transition-transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          }

          if ("external" in item && item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                className="group inline-flex items-center gap-1.5 font-medium text-[var(--eventaj-ink)] no-underline opacity-85 transition-opacity hover:opacity-100 focus-visible:opacity-100"
              >
                {item.label}
                {"isNew" in item && item.isNew && (
                  <span className="hidden rounded-full bg-[var(--eventaj-accent)] px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[var(--eventaj-paper)] xl:inline">
                    Novo
                  </span>
                )}
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-medium text-[var(--eventaj-ink)] opacity-85 transition-opacity hover:opacity-100",
                active && "opacity-100",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <a
          href="tel:+38631285143"
          className="hidden text-[13px] tracking-[0.02em] text-[var(--eventaj-ink)] tabular-nums no-underline 2xl:block"
        >
          031 285 143
        </a>
        <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-5 py-3 text-[13px] font-medium tracking-[0.02em] text-[var(--eventaj-paper)] transition-colors hover:bg-[var(--eventaj-accent)]">
          Pridobi ponudbo →
        </InquiryTrigger>
      </div>
    </>
  );
}
