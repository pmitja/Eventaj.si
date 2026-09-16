import { BookHeart, Dices, ListOrdered, PackageOpen, Puzzle, Tags } from "lucide-react";
import Image from "next/image";
import { StandingTableIcon } from "./StandingTableIcon";

const generatedIcons: Record<string, string> = {
  "champagne-glasses": "/application/icons/equipment/champagne-glasses.svg",
  fans: "/application/icons/equipment/fans.svg",
  "beer-pong": "/application/icons/equipment/beer-pong.svg",
  sign: "/application/icons/equipment/sign.svg",
};

const equipmentIcons = {
  games: Dices,
  numbers: ListOrdered,
  names: Tags,
  "guest-book": BookHeart,
  puzzle: Puzzle,
} as const;

export function EquipmentIcon({ icon }: { icon: string }) {
  const generatedIcon = generatedIcons[icon];
  if (generatedIcon) {
    return <Image src={generatedIcon} alt="" aria-hidden="true" width={28} height={28} className="h-7 w-7 mix-blend-multiply" unoptimized />;
  }
  if (icon === "standing-table") {
    return <StandingTableIcon className="h-5 w-5" />;
  }
  const Icon = equipmentIcons[icon as keyof typeof equipmentIcons] ?? PackageOpen;
  return <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />;
}
