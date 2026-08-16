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
      fullName: "Preksha Singh",
      tagline: "Grace, beauty, and endless joy",
      photo: "/images/bride-placeholder.svg",
    },
  },

  weddingDate: new Date("2026-11-21T10:00:00"),

  families: {
    groom: {
      surname: "Maurya Family",
      parents: "Shri Jagmohan Maurya & Smt. Urmila Maurya",
    },
    bride: {
      surname: "Singh Family",
      parents: "Late Dr. Sandeep Singh & Smt. Rekha Singh",
    },
  },

  invitation: {
    invocation: "॥ श्री गणेशाय नमः ॥",
    title: "Wedding",
    blessing: "With the blessings of the Almighty and our beloved elders",
    groomElders: ["Late Shri Indal Prasad Maurya", "Late Smt. Gomti Maurya"],
    groomParents: ["Shri Jagmohan Maurya", "Smt. Urmila Maurya"],
    invitationLine:
      "cordially invite you to grace the auspicious wedding ceremony of their beloved son",
    brideIntroduction: "Beloved daughter of",
    brideParents: ["Late Dr. Sandeep Singh", "Smt. Rekha Singh"],
    brideGrandparentsIntroduction: "Granddaughter of",
    brideGrandparents: ["Dr. Ram Adhar Singh", "Late Smt. Sneh Prabha Singh"],
    venue: "Raj Estate",
    closing:
      "Your gracious presence and blessings will make this occasion truly memorable.",
    hindi: {
      invocation: "॥ श्री गणेशाय नमः ॥",
      title: "शुभ विवाह",
      blessing: "ईश्वर की असीम कृपा एवं पूज्यजनों के पावन आशीर्वाद से",
      groomElders: ["स्वर्गीय श्री इन्दल प्रसाद मौर्य", "स्वर्गीय श्रीमती गोमती मौर्य"],
      groomParents: ["श्री जगमोहन मौर्य", "श्रीमती उर्मिला मौर्य"],
      invitationLine: "अपने प्रिय सुपुत्र",
      groomName: "चिरंजीव रोहित मौर्य",
      unionLine: "का शुभ विवाह",
      brideName: "आयुष्मती प्रेक्षा सिंह",
      brideConnector: "के साथ",
      brideIntroduction: "सुपुत्री",
      brideParents: ["स्वर्गीय डॉ. संदीप सिंह", "श्रीमती रेखा सिंह"],
      brideGrandparentsIntroduction: "पौत्री",
      brideGrandparents: ["डॉ. राम आधार सिंह", "स्वर्गीय श्रीमती स्नेह प्रभा सिंह"],
      weekday: "शनिवार",
      date: "21 नवम्बर 2026",
      venue: "राज एस्टेट",
      closing: "कृपया पधारकर वर-वधू को अपना शुभाशीष प्रदान करें",
    },
  },

  receptionInvitation: {
    invocation: "॥ श्री गणेशाय नमः ॥",
    title: "Reception",
    blessing: "With the blessings of the Almighty and our beloved elders",
    groomElders: ["Late Shri Indal Prasad Maurya", "Late Smt. Gomti Maurya"],
    groomParents: ["Shri Jagmohan Maurya", "Smt. Urmila Maurya"],
    invitationLine:
      "cordially invite you to celebrate the Wedding Reception of their beloved son",
    coupleConnector: "and",
    brideIntroduction: "Beloved daughter of",
    brideParents: ["Late Dr. Sandeep Singh", "Smt. Rekha Singh"],
    brideGrandparentsIntroduction: "Granddaughter of",
    brideGrandparents: ["Dr. Ram Adhar Singh", "Late Smt. Sneh Prabha Singh"],
    date: new Date("2026-11-23T19:00:00"),
    venuePrefix: "At",
    venue: "Utkarsh Lawn",
    dinner: "Dinner : ________",
    closing:
      "Your gracious presence and blessings will be our greatest honour as we celebrate the beginning of their new journey together.",
    hindi: {
      invocation: "॥ श्री गणेशाय नमः ॥",
      title: "प्रीतिभोज समारोह",
      blessing: "ईश्वर की असीम कृपा एवं पूज्यजनों के पावन आशीर्वाद से",
      groomElders: ["स्वर्गीय श्री इन्दल प्रसाद मौर्य", "स्वर्गीय श्रीमती गोमती मौर्य"],
      groomParents: ["श्री जगमोहन मौर्य", "श्रीमती उर्मिला मौर्य"],
      invitationLine: "आपको सपरिवार सादर आमंत्रित करते हैं",
      coupleIntroduction: "नवविवाहित युगल",
      groomName: "चिरंजीव रोहित मौर्य",
      coupleConnector: "एवं",
      brideName: "आयुष्मती प्रेक्षा सिंह",
      occasionLine: "के सम्मान में आयोजित प्रीतिभोज समारोह में",
      expectation:
        "आपकी स्नेहमयी उपस्थिति एवं शुभाशीष की हार्दिक अपेक्षा है।",
      weekday: "सोमवार",
      date: "23 नवम्बर 2026",
      venuePrefix: "स्थान",
      venue: "उत्कर्ष लॉन",
      dinner: "रात्रि भोज : ________",
      closing: "आपकी उपस्थिति हमारे लिए अत्यंत हर्ष एवं सौभाग्य का विषय होगी।",
    },
  },

  preWeddingInvitation: {
    invocation: "॥ श्री गणेशाय नमः ॥",
    title: "Pre-Wedding Celebrations",
    blessing: "With the blessings of the Almighty and our beloved elders",
    groomElders: ["Late Shri Indal Prasad Maurya", "Late Smt. Gomti Maurya"],
    groomParents: ["Shri Jagmohan Maurya", "Smt. Urmila Maurya"],
    invitationLine:
      "cordially invite you to celebrate the joyous pre-wedding festivities of",
    coupleConnector: "with",
    ceremonies: ["Haldi Ceremony", "Mehndi Ceremony", "Sangeet Evening"],
    date: new Date("2026-11-20T10:00:00"),
    venuePrefix: "Venue",
    venue: "Our Residence",
    closing: "Come celebrate with music, laughter, colours and togetherness.",
    hindi: {
      invocation: "॥ श्री गणेशाय नमः ॥",
      title: "पूर्व वैवाहिक समारोह",
      blessing: "ईश्वर की कृपा एवं पूज्यजनों के आशीर्वाद से",
      groomElders: ["स्वर्गीय श्री इन्दल प्रसाद मौर्य", "स्वर्गीय श्रीमती गोमती मौर्य"],
      groomParents: ["श्री जगमोहन मौर्य", "श्रीमती उर्मिला मौर्य"],
      invitationLine: "सादर आमंत्रित करते हैं अपने प्रिय सुपुत्र",
      groomName: "चिरंजीव रोहित मौर्य",
      coupleConnector: "एवं",
      brideName: "आयुष्मती प्रेक्षा सिंह",
      occasionLine: "के शुभ विवाह के उपलक्ष्य में आयोजित",
      ceremonies: ["हल्दी समारोह", "मेहंदी समारोह", "संगीत संध्या"],
      datePrefix: "दिनांक",
      date: "20 नवम्बर 2026",
      venuePrefix: "स्थान",
      venue: "निवास स्थान",
      closing: "आपकी उपस्थिति हमारे लिए सौभाग्य एवं प्रसन्नता का विषय होगी।",
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
      date: "2026-11-20",
      time: "Time to be announced",
      venue: "Shivaji Puram",
      address:
        "356/218/271, Shivaji Puram, Habibpur, Rajajipuram, Lucknow, Uttar Pradesh 226017, India",
      mapUrl: "https://maps.app.goo.gl/j5a5qCPN25irAZwy5",
      description: "A joyous celebration of henna, music, colours, and togetherness.",
      dressCode: "Traditional / Festive wear",
    },
    {
      id: "haldi",
      title: "Haldi Ceremony",
      date: "2026-11-20",
      time: "Time to be announced",
      venue: "Shivaji Puram",
      address:
        "356/218/271, Shivaji Puram, Habibpur, Rajajipuram, Lucknow, Uttar Pradesh 226017, India",
      mapUrl: "https://maps.app.goo.gl/j5a5qCPN25irAZwy5",
      description: "A morning of turmeric blessings, laughter, and joyful rituals.",
      dressCode: "Yellow / Light festive colors",
    },
    // {
    //   id: "cocktail",
    //   title: "Sangeet Evening",
    //   date: "2026-11-20",
    //   time: "Time to be announced",
    //   venue: "Our Residence",
    //   address: "Our Residence",
    //   mapUrl: "https://maps.google.com/?q=India",
    //   description: "An evening filled with music, laughter, dance, and celebration.",
    //   dressCode: "Festive / Evening wear",
    // },
    {
      id: "wedding",
      title: "Wedding Ceremony",
      date: "2026-11-21",
      time: "10:00 AM onwards",
      venue: "Raj Estate",
      address:
        "Allambagh Para, Tedhi Pulia Ring Road, Devpur, Rajajipuram, Hardoi, Lucknow, Uttar Pradesh 226017",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Raj+Estate,+Allambagh+Para,+Tedhi+Pulia+Ring+Road,+Devpur,+Rajajipuram,+Hardoi,+Lucknow,+Uttar+Pradesh+226017",
      description: "The sacred union of Rohit and Preksha — witness our vows and blessings.",
      dressCode: "Traditional / Formal ethnic wear",
    },
    {
      id: "reception",
      title: "Reception",
      date: "2026-11-23",
      time: "Dinner : ________",
      venue: "Utkarsh Lawn",
      address:
        "425-Bhaptamau, Ring Rd, near Buddheshwar Temple, Alamnagar, Lucknow, Uttar Pradesh 226017",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Utkarsh+Marriage+Lawn,+425-Bhaptamau,+Ring+Rd,+near+buddheshwar+temple,+Alamnagar,+Lucknow,+Uttar+Pradesh+226017",
      description:
        "Join us as we celebrate the beginning of Rohit and Preksha's new journey together.",
      dressCode: "Formal / Evening wear",
    },
  ] satisfies WeddingEvent[],

  closing: {
    message:
      "Your presence and blessings will make our celebration complete. We look forward to sharing this special journey with you.",
    signature: "With love, Rohit & Preksha",
  },
} as const;

export type WeddingConfig = typeof WEDDING_CONFIG;
