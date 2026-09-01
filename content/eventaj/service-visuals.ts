export type ServiceType = "photo" | "360";

export const serviceVisualStories = {
  photo: {
    eyebrow: "Izkušnja na dogodku",
    title: "Gostje ne čakajo samo na sliko. Ustvarijo si svoj mali prizor.",
    description:
      "Rekviziti, ozadje, tisk in digitalna galerija delujejo kot ena celovita izkušnja. Gost stopi pred booth, ujame trenutek in ga v nekaj sekundah odnese s seboj.",
    images: [
      {
        src: "/application/photo-booth-device.webp",
        alt: "Photo Booth naprava pripravljena za uporabo na dogodku",
        label: "Profesionalna oprema",
      },
      {
        src: "/application/wedding-photos/20260606_181829838.webp",
        alt: "Družina v foto boxu na poroki s personaliziranim cvetličnim okvirjem tiska z imeni",
        label: "Personaliziran okvir",
      },
      {
        src: "/application/birthday-parties/20260801_204550714.webp",
        alt: "Družba z lesenimi napisi in očali med fotografiranjem v foto boxu na 50. rojstnem dnevu",
        label: "Gostje v akciji",
      },
    ],
  },
  "360": {
    eyebrow: "360° Booth v akciji",
    title:
      "Namesto statične fotografije nastane kratek video, pripravljen za deljenje.",
    description:
      "Gost stopi na platformo, kamera ujame trenutek iz vseh kotov, rezultat pa je kratek videoposnetek, pripravljen za takojšnje deljenje.",
    images: [
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-3.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-3.webp",
        alt: "360° Booth video z gostmi med snemanjem na dogodku",
        label: "Glavni trenutek",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-6.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-6.webp",
        alt: "Dinamičen 360° Booth video z efekti in gibanjem",
        label: "Gibanje in efekti",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-8.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-8.webp",
        alt: "Kratek 360° Booth video posnetek s platforme",
        label: "Platforma",
      },
    ],
  },
} as const;

export const serviceHeroProof = {
  stats: [
    { value: "50+", label: "izvedenih dogodkov" },
    { value: "4.9/5", label: "ocena strank" },
  ],
  logos: [
    {
      src: "/application/sksg.webp",
      alt: "ŠKSG",
    },
    {
      src: "/application/autodelta.webp",
      alt: "AutoDelta",
    },
    {
      src: "/application/forvis-marzars.webp",
      alt: "Forvis Mazars",
    },
    {
      src: "/application/LOGO_MSI_POZ.webp",
      alt: "Mlada Slovenija",
    },
  ],
} as const;

export const serviceHeroVisuals = {
  photo: {
    aspectClass: "aspect-[3/2]",
    cardClass: "w-[300px] sm:w-[390px] lg:w-[500px]",
    railDuration:
      "motion-safe:animate-[eventaj-service-rail_128s_linear_infinite]",
    images: [
      {
        src: "/application/photo-booth-hero/jozek-50.webp",
        alt: "Gostje s Photo Booth rekviziti na praznovanju Jožek 50",
        label: "Jožek 50",
      },
      {
        src: "/application/wedding-photos/20260619_234714086.webp",
        alt: "Mladoporočenca z lesenim napisom Ljubezen je v zraku v foto boxu na poroki",
        label: "Elisa in Arpi",
      },
      {
        src: "/application/photo-booth-hero/alja-anze.webp",
        alt: "Poročni gostje s Photo Booth tablicami na dogodku Alja in Anže",
        label: "Poroka",
      },
      {
        src: "/application/birthday-parties/20260807_230302676.webp",
        alt: "Oče in hčerka z rekviziti pred zlato bleščečo steno v foto boxu na 70. rojstnem dnevu",
        label: "Janez 70",
      },
      {
        src: "/application/photo-booth-hero/srecko-50.webp",
        alt: "Par z zabavnimi Photo Booth očali na praznovanju Srečko 50 let",
        label: "Srečko 50",
      },
      {
        src: "/application/wedding-photos/20260620_233009774.webp",
        alt: "Svatje z rekviziti pred neonskim napisom Better Together v foto boxu na poroki",
        label: "Vesna in Antonijo",
      },
      {
        src: "/application/photo-booth-hero/robis-tomorrowland.webp",
        alt: "Skupina gostov pred bleščečim ozadjem v okvirju Robi's Tomorrowland",
        label: "Tematska zabava",
      },
      {
        src: "/application/birthday-parties/20260801_204550714.webp",
        alt: "Družba z lesenimi napisi in očali v foto boxu na 50. rojstnem dnevu na vrtu",
        label: "Polonca 50",
      },
      {
        src: "/application/photo-booth-hero/lets-party-jasna.webp",
        alt: "Skupina gostov v retro kostumih na Photo Booth fotografiji Let's party z Jasno",
        label: "Let's party",
      },
      {
        src: "/application/wedding-photos/20260606_181829838.webp",
        alt: "Družina s smešnimi očali v fotoboxu na poroki s cvetličnim okvirjem tiska",
        label: "Mišela in Dragan",
      },
      {
        src: "/application/photo-booth-hero/doris-40.webp",
        alt: "Velika skupinska Photo Booth fotografija s praznovanja Doris 40 let",
        label: "Doris 40",
      },
      {
        src: "/application/birthday-parties/20260829_212140291.webp",
        alt: "Par z lesenimi napisi in personaliziranim tiskom v fotoboxu za 40. rojstni dan",
        label: "Suzana in Tomaž",
      },
      {
        src: "/application/photo-booth-hero/halcom-2025.webp",
        alt: "Novoletna Photo Booth fotografija za Halcom s štirimi gosti",
        label: "Halcom",
      },
      {
        src: "/application/wedding-photos/20260530_171815397.webp",
        alt: "Par s srčkastimi očali in lesenimi napisi v foto boxu na poroki na prostem",
        label: "Nastja in Klemen",
      },
      {
        src: "/application/photo-booth-hero/kelag-2026.webp",
        alt: "Skupina gostij z novoletnimi očali na Photo Booth fotografiji Kelag International",
        label: "Kelag",
      },
      {
        src: "/application/birthday-parties/20260609_172305184.webp",
        alt: "Par s srčkastimi očali pred rožnato bleščečo steno v foto boxu na rojstnodnevni zabavi",
        label: "Franja",
      },
      {
        src: "/application/photo-booth-hero/disco-night.webp",
        alt: "Gostja pred bleščečim Photo Booth ozadjem v okvirju Disco Night",
        label: "Disco night",
      },
      {
        src: "/application/wedding-photos/20260627_214331003.webp",
        alt: "Svata s srčkastimi očali in lesenim napisom v foto boxu na poročni zabavi",
        label: "Vesna in Matija",
      },
      {
        src: "/application/photo-booth-hero/tamara-40.webp",
        alt: "Trije gostje na Photo Booth fotografiji s praznovanja Tamara 40",
        label: "Tamara 40",
      },
      {
        src: "/application/wedding-photos/20260822_194321096.webp",
        alt: "Svata z rekviziti in personaliziranim poročnim tiskom iz foto boxa",
        label: "Nataša in Borut",
      },
    ],
  },
  "360": {
    aspectClass: "aspect-[9/16]",
    cardClass: "w-[180px] sm:w-[220px] lg:w-[280px]",
    railDuration:
      "motion-safe:animate-[eventaj-service-rail_58s_linear_infinite]",
    images: [
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-1.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-1.webp",
        alt: "360° Booth video z dogodka",
        label: "360° trenutek",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-2.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-2.webp",
        alt: "Gostje na 360° Booth platformi v gibanju",
        label: "Gibanje",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-3.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-3.webp",
        alt: "Slow-motion 360° Booth posnetek z dogodka",
        label: "Slow-motion",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-4.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-4.webp",
        alt: "360° Booth video za deljenje na družbenih omrežjih",
        label: "Za deljenje",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-5.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-5.webp",
        alt: "Zabaven 360° Booth posnetek gostov",
        label: "Zabava",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-6.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-6.webp",
        alt: "Dinamičen 360° Booth video z dogodka",
        label: "Efekt",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-7.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-7.webp",
        alt: "Gostje pozirajo na 360° Booth platformi",
        label: "Poziranje",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-8.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-8.webp",
        alt: "Kratek 360° Booth video posnetek",
        label: "Video",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-9.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-9.webp",
        alt: "360° Booth video spomin z dogodka",
        label: "Spomin",
      },
    ],
  },
} as const;
