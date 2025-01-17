import Section from "../ui/section";
import PersonWithHeart from "../icons/PersonWithHeart";
import CarWithRoad from "../icons/CarWithRoad";
import SocialIcons from "../icons/SocialIcons";
import PaintWithLamp from "../icons/PaintWithLamp";
import Image from "next/image";
import HqVideo from "../icons/HqVideo";
import GlassesWithMustache from "../icons/GlassesWithMustache";

const features = [
  {
    title: "Odlična storitev",
    description:
      "Naše prijazno in strokovno osebje poskrbi, da 360° photo booth na vašem dogodku deluje brezhibno.",
    icon: PersonWithHeart,
  },
  {
    title: "Prevoz kamorkoli",
    description:
      "Naša ekipa dostavi photo booth na katerokoli lokacijo. Prihranite pri prevozu in naročite še klasični photo booth za popolno kombinacijo.",
    icon: CarWithRoad,
  },
  {
    title: "Deljenje na spletu",
    description:
      "Delite svoje videe takoj s prijatelji. Pokončni videi so idealni za objavo na družbenih omrežjih, kot sta Instagram in TikTok.",
    icon: SocialIcons,
  },
  {
    title: "Prilagojeno po vaših željah",
    description:
      "Končni videz vaših videov je povsem v vaših rokah. Izberite glasbo in dovršeno grafiko po vaših željah.",
    icon: PaintWithLamp,
  },
  {
    title: "Kakovostni videi",
    description:
      "Zaradi profesionalne zasnove 360° photo bootha boste prejeli kratke videe vrhunske kakovosti.",
    icon: HqVideo,
  },
  {
    title: "Različni rekviziti",
    description:
      "Skupaj z 360° photo boothom prinesemo bogat paket rekvizitov, ki bodo poskrbeli za vašo zabavo. Veselite se lasulj, očal, napisnih tabel in celo naprave za pihanje mehurčkov!",
    icon: GlassesWithMustache,
  },
];

const Features = () => {
  return (
    <Section
      heading="ODLIČNA IZBIRA ZA VAŠ DOGODEK"
      text={
        <>
          Naš 360° Photo Booth je prava atrakcija vsakega dogodka! Ustvarite
          edinstvene posnetke, ki ujamejo vsak kot, vsak nasmeh in vsako potezo
          – kot pravi filmski trenutek. Gostje lahko stopijo na 100 cm veliko
          platformo, kamera pa jih v krogu snema iz nizkega kota v visoki
          ločljivosti, kar ustvari neverjetne slow-motion videe, pripravljene za
          deljenje na družbenih omrežjih.
          <br />
          <br />
          360° Photo Booth je popolna izbira za poroke, rojstne dneve, poslovne
          dogodke, festivale in zasebne zabave, kjer iščete nekaj posebnega.
          Dodajte rekvizite, učinke ali napise in zagotovite, da bo vaš dogodek
          ostal v spominu za vedno!
        </>
      }
      className="container-lg"
      headingClassName="text-[#94A3B8]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="grid grid-cols-1 gap-6 h-fit">
          {features.slice(0, 3).map((feature) => (
            <div
              key={feature.title}
              className="flex gap-6 items-start p-6 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm 
                border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl
                transition-all duration-300 transform hover:-translate-y-1 h-full"
            >
              <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                <feature.icon />
              </div>
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-[300px] md:h-[400px] lg:h-full">
          <Image
            src="/application/360-center-image.webp"
            alt="360 Photo Booth"
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 h-fit">
          {features.slice(3, 6).map((feature) => (
            <div
              key={feature.title}
              className="flex gap-6 items-start p-6 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm 
                border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl
                transition-all duration-300 transform hover:-translate-y-1 h-full"
            >
              <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                <feature.icon />
              </div>
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Features;
