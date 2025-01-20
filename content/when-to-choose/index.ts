import BallonsWithCircle from "@/components/icons/BallonsWithCircle";
import CakeWithBalloon from "@/components/icons/CakeWithBalloon";
import ConfettiWithGlass from "@/components/icons/ConfettiWithGlass";
import OpenSign from "@/components/icons/OpenSign";
import PartyTrace from "@/components/icons/PartyTrace";
import RingWithHeart from "@/components/icons/RingWithHeart";

export interface Occasion {
  title: string;
  icon: React.ComponentType;
}

export interface WhenToChooseContent {
  heading: string;
  text: string;
  occasions: Occasion[];
}

export const threeSixtyWhenToChoose: WhenToChooseContent = {
  heading: "KDAJ IZBRATI 360° PHOTO BOOTH?",
  text: "360° photo booth je primeren za skoraj vsak dogodek. Najpogosteje ga pripeljemo na poslovne dogodke, plese, praznovanja in poroke.",
  occasions: [
    {
      title: "Poroke",
      icon: RingWithHeart,
    },
    {
      title: "Rojstni dnevi",
      icon: CakeWithBalloon,
    },
    {
      title: "Zaključki ali Team buildingi",
      icon: BallonsWithCircle,
    },
    {
      title: "Otvoritev dejavnosti",
      icon: OpenSign,
    },
    {
      title: "Individualne zabave",
      icon: ConfettiWithGlass,
    },
    {
      title: "Sejmi in festivali",
      icon: PartyTrace,
    },
  ],
};

export const photoBoothWhenToChoose: WhenToChooseContent = {
  heading: "KDAJ IZBRATI PHOTO BOOTH?",
  text: "Photo booth je primeren za vsak dogodek. Najpogosteje ga pripeljemo na poroke, rojstne dneve, zaključke in poslovna srečanja.",
  occasions: [
    {
      title: "Poroke",
      icon: RingWithHeart,
    },
    {
      title: "Rojstni dnevi",
      icon: CakeWithBalloon,
    },
    {
      title: "Zaključki ali Team buildingi",
      icon: BallonsWithCircle,
    },
    {
      title: "Otvoritev dejavnosti",
      icon: OpenSign,
    },
    {
      title: "Individualne zabave",
      icon: ConfettiWithGlass,
    },
    {
      title: "Sejmi in festivali",
      icon: PartyTrace,
    },
  ],
};

export const duetWhenToChoose: WhenToChooseContent = {
  heading: "KDAJ IZBRATI DUET PHOTO BOOTH?",
  text: "Duet photo booth je popolna izbira, ko želite svojim gostom ponuditi najboljše iz obeh svetov - klasično fotografiranje in 360° snemanje.",
  occasions: [
    {
      title: "Poroke",
      icon: RingWithHeart,
    },
    {
      title: "Rojstni dnevi",
      icon: CakeWithBalloon,
    },
    {
      title: "Zaključki ali Team buildingi",
      icon: BallonsWithCircle,
    },
    {
      title: "Otvoritev dejavnosti",
      icon: OpenSign,
    },
    {
      title: "Individualne zabave",
      icon: ConfettiWithGlass,
    },
    {
      title: "Sejmi in festivali",
      icon: PartyTrace,
    },
  ],
}; 