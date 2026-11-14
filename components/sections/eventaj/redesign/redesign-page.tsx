import { ClientMarquee } from "./client-marquee";
import { PartyYear } from "./party-year";
import { PriceBoard } from "./price-board";
import { PriceSpotlight } from "./price-spotlight";
import { PrintWall } from "./print-wall";
import { RedesignEquipment, RedesignQrGallery } from "./redesign-extras";
import { RedesignFaq } from "./redesign-faq";
import { RedesignClosing } from "./redesign-footer";
import { RedesignGallery } from "./redesign-gallery";
import { RedesignHero } from "./redesign-hero";
import { RedesignProcess } from "./redesign-process";
import { RedesignReviews } from "./redesign-reviews";
import { RedesignServices } from "./redesign-services";

/** Home page sections; header, footer and <main> come from RedesignChrome in the site shell. */
export function RedesignPage() {
  return (
    <>
      <RedesignHero />
      <ClientMarquee />
      <PriceSpotlight />
      <RedesignServices />
      <PrintWall />
      <RedesignQrGallery />
      <RedesignEquipment />
      <PartyYear />
      <RedesignProcess />
      <RedesignGallery />
      <RedesignReviews />
      <PriceBoard />
      <RedesignFaq />
      <RedesignClosing />
    </>
  );
}
