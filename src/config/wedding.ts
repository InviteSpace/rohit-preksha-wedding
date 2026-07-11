export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
  description: string;
  dressCode?: string;
  icon: string;
}

export const WEDDING_CONFIG = {
  couple: {
    illustration: "/images/couple-animated.png",
    groom: {
      name: "Rohit",
      fullName: "Rohit Maurya",
      tagline: "A heart full of love and dreams",
      photo: "/images/groom-placeholder.svg",
    },
    bride: {
      name: "Preksha",
      fullName: "Preksha [Surname]",
      tagline: "Grace, beauty, and endless joy",
      photo: "/images/bride-placeholder.svg",
    },
  },

  weddingDate: new Date("2026-02-14T10:00:00"),

  families: {
    groom: {
      surname: "Maurya Family",
      parents: "Mr. & Mrs. [Groom's Parents Name]",
    },
    bride: {
      surname: "[Bride's Family Name]",
      parents: "Mr. & Mrs. [Bride's Parents Name]",
    },
  },

  blessing: {
    hindi: "शुभ विवाह",
    english: "With the blessings of our families, we invite you to celebrate our union",
  },

  hashtag: "#RohitWedsPreksha",

  hero: {
    background: "/images/Generated_image.png",
    couple: "/images/couple-animated.png",
  },

  music: {
    src: "/music/wedding-music.mp3",
    title: "Wedding Melody",
  },

  photos: [
    "/images/gallery-1.svg",
    "/images/gallery-2.svg",
    "/images/gallery-3.svg",
    "/images/gallery-4.svg",
    "/images/gallery-5.svg",
    "/images/gallery-6.svg",
  ],

  sharedAlbum: {
    title: "Shared Memories",
    url: "https://photos.app.goo.gl/vPQqe1g9Uv35TFE39",
    description:
      "Capture the joy of our celebration — add your favourite photos from Mehndi to Reception.",
  },

  events: [
    {
      id: "mehndi",
      title: "Mehndi Ceremony",
      date: "2026-02-12",
      time: "4:00 PM onwards",
      venue: "[Mehndi Venue Name]",
      address: "[Full Address, City, State]",
      mapUrl: "https://maps.google.com/?q=India",
      description: "An evening of henna, music, and celebration with family and friends.",
      dressCode: "Traditional / Festive wear",
      icon: "🌿",
    },
    {
      id: "haldi",
      title: "Haldi Ceremony",
      date: "2026-02-13",
      time: "10:00 AM onwards",
      venue: "[Haldi Venue Name]",
      address: "[Full Address, City, State]",
      mapUrl: "https://maps.google.com/?q=India",
      description: "A morning of turmeric blessings, laughter, and joyful rituals.",
      dressCode: "Yellow / Light festive colors",
      icon: "☀️",
    },
    {
      id: "cocktail",
      title: "Cocktail Party",
      date: "2026-02-13",
      time: "7:00 PM onwards",
      venue: "[Cocktail Venue Name]",
      address: "[Full Address, City, State]",
      mapUrl: "https://maps.google.com/?q=India",
      description: "An elegant evening of cocktails, music, and merriment.",
      dressCode: "Semi-formal / Cocktail attire",
      icon: "🥂",
    },
    {
      id: "wedding",
      title: "Wedding Ceremony",
      date: "2026-02-14",
      time: "10:00 AM onwards",
      venue: "[Wedding Venue Name]",
      address: "[Full Address, City, State]",
      mapUrl: "https://maps.google.com/?q=India",
      description: "The sacred union of Rohit and Preksha — witness our vows and blessings.",
      dressCode: "Traditional / Formal ethnic wear",
      icon: "💒",
    },
    {
      id: "reception",
      title: "Reception",
      date: "2026-02-14",
      time: "7:00 PM onwards",
      venue: "[Reception Venue Name]",
      address: "[Full Address, City, State]",
      mapUrl: "https://maps.google.com/?q=India",
      description: "Join us for a grand celebration with dinner, dance, and joy.",
      dressCode: "Formal / Evening wear",
      icon: "🎉",
    },
  ] satisfies WeddingEvent[],

  closing: {
    message:
      "Your presence and blessings will make our celebration complete. We look forward to sharing this special journey with you.",
    signature: "With love, Rohit & Preksha",
  },
} as const;

export type WeddingConfig = typeof WEDDING_CONFIG;
