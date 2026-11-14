"use client";

import { openInquiryDialog } from "@/components/inquiry/inquiry-trigger";
import { EquipmentIcon } from "@/components/icons/EquipmentIcon";
import { equipmentNavGroups, eventajInfoNav, eventajNav } from "@/content/eventaj/data";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent } from "react";

type NavItem = (typeof eventajNav)[number];
type MenuId = "equipment" | "info";

function hasChildren(
  item: NavItem,
): item is Extract<NavItem, { children: ReadonlyArray<unknown> }> {
  return "children" in item;
}

type EquipmentChild = Extract<NavItem, { children: ReadonlyArray<unknown> }>["children"][number];

// Weddings fill the right column; the two short groups stack on the left.
const desktopColumns = [
  equipmentNavGroups.filter((group) => group.id !== "poroka"),
  equipmentNavGroups.filter((group) => group.id === "poroka"),
];

// Porcelain chip so the dark line icons (some multiply-blended) read on the night panel.
function EquipmentChip({ icon }: { icon: string }) {
  return (
    <span className="isolate flex h-8 w-8 shrink-0 overflow-hidden items-center justify-center rounded-full bg-[var(--ev-porcelain)] text-[var(--ev-night)] [&_img]:h-6 [&_img]:w-6 [&_svg]:h-[18px] [&_svg]:w-[18px]">
      <EquipmentIcon icon={icon} />
    </span>
  );
}

function EquipmentGroup({
  label,
  items,
  startIndex,
  onNavigate,
}: {
  label: string;
  items: ReadonlyArray<EquipmentChild>;
  startIndex: number;
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--ev-champagne)]">
        {label}
      </p>
      <ul>
        {items.map((child, index) => (
          <li key={child.href} className="ev-menu-item" style={{ "--i": startIndex + index } as CSSProperties}>
            <Link href={child.href} onClick={onNavigate} className="ev-menu-link">
              <EquipmentChip icon={child.icon} />
              <span className="ev-menu-label text-[15px] leading-tight">{child.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RedesignHeader() {
  const scrolled = useScrolled(40);
  const pathname = usePathname();
  // Transparent only over a dark opening section; light openings get the solid bar from the start.
  const [overDark, setOverDark] = useState(true);
  useEffect(() => {
    const first = document.querySelector("#ev-main section");
    setOverDark(Boolean(first?.classList.contains("ev-dark")));
  }, [pathname]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const equipmentOpen = openMenu === "equipment";
  const infoOpen = openMenu === "info";
  const setEquipmentOpen = (open: boolean) => setOpenMenu(open ? "equipment" : null);
  const equipmentRef = useRef<HTMLLIElement>(null);
  const infoRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const infoActive = eventajInfoNav.children.some(
    (child) => pathname === child.href || pathname.startsWith(`${child.href}/`),
  );

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  // Hover opens a menu for mouse users only; touch keeps the tap toggle.
  const openOnHover = (menu: MenuId) => (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    cancelClose();
    setOpenMenu(menu);
  };

  const closeOnLeave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  // A mouse click lands after hover already opened the menu, so it must not toggle it shut again.
  const toggleMenu = (menu: MenuId) => (event: MouseEvent<HTMLButtonElement>) => {
    if ((event.nativeEvent as globalThis.PointerEvent).pointerType === "mouse") {
      cancelClose();
      setOpenMenu(menu);
      return;
    }
    setOpenMenu((value) => (value === menu ? null : menu));
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!openMenu) return;
    const ref = openMenu === "equipment" ? equipmentRef : infoRef;
    const close = (event: globalThis.MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") setOpenMenu(null);
        return;
      }
      if (!ref.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [openMenu]);

  const solid = scrolled || menuOpen || !overDark;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-[var(--ev-porcelain)] transition-[background-color,border-color,padding] duration-500",
        solid
          ? "border-b border-[var(--ev-rule-dark)] bg-[var(--ev-night)] py-3"
          : "border-b border-transparent bg-transparent py-5 md:py-6",
      )}
    >
      <div className="ev-wrap flex items-center gap-3 md:gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Eventaj.si, domov">
          <Image src="/application/logo.svg" alt="" width={44} height={44} priority className="h-10 w-10 md:h-11 md:w-11" />
          <span className="ev-display text-[23px] leading-none">Eventaj</span>
        </Link>

        <nav aria-label="Glavna navigacija" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-5 whitespace-nowrap 2xl:gap-7">
            {eventajNav.map((item) =>
              hasChildren(item) ? (
                <li
                  key={item.href}
                  ref={equipmentRef}
                  className="relative"
                  onPointerEnter={openOnHover("equipment")}
                  onPointerLeave={closeOnLeave}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setOpenMenu((value) => (value === "equipment" ? null : value));
                    }
                  }}
                >
                  <div className="flex items-center">
                    <Link href={item.href} data-active={equipmentOpen} className="ev-nav-link py-2 text-[15px]">
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={equipmentOpen}
                      aria-controls="ev-equipment-menu"
                      aria-label={equipmentOpen ? "Zapri meni opreme" : "Odpri meni opreme"}
                      onClick={toggleMenu("equipment")}
                      className="-mr-2 flex h-10 w-8 items-center justify-center"
                    >
                      <ChevronDown
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className={cn(
                          "h-4 w-4 transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          equipmentOpen && "rotate-180 text-[var(--ev-champagne)]",
                        )}
                      />
                    </button>
                  </div>
                  {/* Padding (not margin) above the panel keeps the pointer inside while it travels down. */}
                  <div
                    id="ev-equipment-menu"
                    data-open={equipmentOpen}
                    className="ev-menu absolute -right-6 top-full pt-4"
                  >
                    <div className="w-[540px] border border-[var(--ev-rule-dark)] border-t-[color:var(--ev-champagne)] bg-[var(--ev-night)] text-[var(--ev-porcelain)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                      <div className="grid grid-cols-2 gap-x-2 p-3">
                        {desktopColumns.map((column, columnIndex) => (
                          <div key={columnIndex} className="grid content-start gap-4">
                            {column.map((group) => (
                              <EquipmentGroup
                                key={group.id}
                                label={group.label}
                                items={item.children.filter((child) => child.group === group.id)}
                                startIndex={item.children.findIndex((child) => child.group === group.id)}
                                onNavigate={() => setEquipmentOpen(false)}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                      <Link
                        href={item.href}
                        onClick={() => setEquipmentOpen(false)}
                        className="group/all flex items-center justify-between border-t border-[var(--ev-rule-dark)] px-6 py-3.5 text-[14px] text-[var(--ev-mist)] transition-colors hover:text-[var(--ev-champagne-hi)]"
                      >
                        Vsa oprema za dogodke
                        <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 transition-transform group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center gap-2.5 py-2 text-[15px]">
                    <span className="ev-nav-link py-1">{item.label}</span>
                    {"isNew" in item && item.isNew && (
                      <span className="ev-new">
                        <span aria-hidden="true" className="ev-new-dot" />
                        Novo
                      </span>
                    )}
                  </Link>
                </li>
              ),
            )}
            <li
              ref={infoRef}
              className="relative"
              onPointerEnter={openOnHover("info")}
              onPointerLeave={closeOnLeave}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setOpenMenu((value) => (value === "info" ? null : value));
                }
              }}
            >
              <button
                type="button"
                aria-expanded={infoOpen}
                aria-controls="ev-info-menu"
                onClick={toggleMenu("info")}
                className="flex items-center gap-1 py-2 text-[15px]"
              >
                <span data-active={infoOpen || infoActive} className="ev-nav-link py-1">
                  {eventajInfoNav.label}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={cn(
                    "h-4 w-4 transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    infoOpen && "rotate-180 text-[var(--ev-champagne)]",
                  )}
                />
              </button>
              <div id="ev-info-menu" data-open={infoOpen} className="ev-menu absolute -right-6 top-full pt-4">
                <ul className="w-[300px] border border-[var(--ev-rule-dark)] border-t-[color:var(--ev-champagne)] bg-[var(--ev-night)] p-3 text-[var(--ev-porcelain)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                  {eventajInfoNav.children.map((child, index) => (
                    <li key={child.href} className="ev-menu-item" style={{ "--i": index } as CSSProperties}>
                      <Link
                        href={child.href}
                        onClick={() => setOpenMenu(null)}
                        className="ev-menu-link"
                        aria-current={pathname === child.href ? "page" : undefined}
                      >
                        <span className="grid gap-0.5">
                          <span className="ev-menu-label text-[15px] leading-tight">{child.label}</span>
                          <span className="text-[13px] leading-snug text-[var(--ev-mist)]">{child.description}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        <a
          href="tel:+38631285143"
          aria-label="Pokliči 031 285 143"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ev-champagne)] !text-[var(--ev-night)] md:hidden"
        >
          <Phone aria-hidden="true" strokeWidth={1.75} className="h-5 w-5" />
        </a>
        <a href="tel:+38631285143" className="ml-auto hidden items-center gap-2 whitespace-nowrap text-[15px] md:flex xl:ml-4 xl:hidden 2xl:flex">
          <Phone aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          031 285 143
        </a>
        <span className="hidden sm:block">
          <button
            type="button"
            onClick={() => openInquiryDialog()}
            className="ev-btn ev-btn-primary min-h-[44px] whitespace-nowrap px-5"
          >
            Pošlji povpraševanje
          </button>
        </span>
        <button
          type="button"
          aria-label={menuOpen ? "Zapri meni" : "Odpri meni"}
          aria-expanded={menuOpen}
          aria-controls="ev-mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center border border-[var(--ev-rule-dark)] xl:hidden"
        >
          {menuOpen ? (
            <X aria-hidden="true" strokeWidth={1.5} className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" strokeWidth={1.5} className="h-5 w-5" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div id="ev-mobile-menu" className="fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-[var(--ev-night)] pb-10 xl:hidden">
          <nav aria-label="Mobilna navigacija" className="ev-wrap pt-6">
            <ul className="grid">
              {eventajNav.map((item) => (
                <li key={item.href} className="border-b border-[var(--ev-rule-dark)]">
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="ev-display flex items-center gap-3 py-4 text-[28px] leading-tight"
                  >
                    {item.label}
                    {"isNew" in item && item.isNew && (
                      <span className="ev-new font-[family-name:var(--ev-sans)]">
                        <span aria-hidden="true" className="ev-new-dot" />
                        Novo
                      </span>
                    )}
                  </Link>
                  {hasChildren(item) && (
                    <div className="mb-5 grid gap-5 sm:grid-cols-3">
                      {equipmentNavGroups.map((group) => (
                        <div key={group.id}>
                          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--ev-champagne)]">
                            {group.label}
                          </p>
                          <ul>
                            {item.children
                              .filter((child) => child.group === group.id)
                              .map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 py-1.5 text-[16px] text-[var(--ev-mist)]"
                                  >
                                    <EquipmentChip icon={child.icon} />
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--ev-champagne)]">
                {eventajInfoNav.label}
              </p>
              <ul className="grid gap-x-6 sm:flex">
                {eventajInfoNav.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 text-[18px] text-[var(--ev-mist)]"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 grid gap-3 sm:flex">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openInquiryDialog();
                }}
                className="ev-btn ev-btn-primary"
              >
                Pošlji povpraševanje
              </button>
              <a href="tel:+38631285143" className="ev-btn ev-btn-ghost">
                <Phone aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                031 285 143
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
