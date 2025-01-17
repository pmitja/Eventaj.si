import Section from "../ui/section";
import RingWithHeart from "../icons/RingWithHeart";
import CakeWithBalloon from "../icons/CakeWithBalloon";
import BallonsWithCircle from "../icons/BallonsWithCircle";
import OpenSign from "../icons/OpenSign";
import ConfettiWithGlass from "../icons/ConfettiWithGlass";
import PartyTrace from "../icons/PartyTrace";

const occasions = [
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
];

const WhenToChoose = () => {
  return (
    <Section
      heading="KDAJ IZBRATI 360° PHOTO BOOTH?"
      text="360° photo booth je primeren za skoraj vsak dogodek. Najpogosteje ga pripeljemo na poslovne dogodke, plese, praznovanja in poroke."
      className="container-sm"
    >
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {occasions.map((occasion) => (
          <div
            key={occasion.title}
            className="bg-card hover:bg-accent transition-colors backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center border border-border shadow-lg"
          >
            <div className="h-12 w-12 flex items-center justify-center shrink-0 mb-4">
              {occasion.icon ? (
                <occasion.icon />
              ) : (
                <div className="w-full h-full rounded-full bg-[#C89364]/20" />
              )}
            </div>
            <h3 className="text-base md:text-lg font-semibold">
              {occasion.title}
            </h3>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default WhenToChoose;
