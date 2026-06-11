import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { ReactNode } from "react";

const socials: Array<{ label: string; href: string; icon: ReactNode }> = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/eventaj.si/",
    icon: <InstagramIcon className="h-4 w-4" />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61567672817538",
    icon: <FacebookIcon className="h-4 w-4" />,
  },
];

export function FooterSocials() {
  return (
    <div className="mt-5 flex gap-2.5">
      {socials.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(244,239,230,0.2)] no-underline transition-colors hover:bg-[rgba(244,239,230,0.1)]"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
