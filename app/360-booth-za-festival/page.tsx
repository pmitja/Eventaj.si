import { EventLandingPage } from "@/components/sections/eventaj/event-landing/event-landing-page";
import { buildEventLandingMetadata } from "@/components/sections/eventaj/event-landing/event-landing-metadata";
import { eventLandings } from "@/content/eventaj/event-pages";

const landing = eventLandings["360-booth-za-festival"];

export const metadata = buildEventLandingMetadata(landing);

export default function Page() {
  return <EventLandingPage landing={landing} />;
}

export const dynamic = "force-static";
