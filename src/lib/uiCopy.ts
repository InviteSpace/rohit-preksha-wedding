import type { InvitationLanguage } from "@/lib/invitationSide";
import type { WeddingEvent } from "@/config/wedding";

const UI = {
  en: {
    navWelcome: "Welcome",
    navCouple: "Couple",
    navEvents: "Events",
    navShare: "Share",
    saveTheDate: "Save the Date",
    gettingMarried: "are getting married",
    scrollToExplore: "Scroll to explore",
    dearGuest: "Dear",
    cordiallyInvited: "you are cordially invited",
    fromFamilyOf: "From the family of",
    andFamilyOf: "& the family of",
    parentsOfGroom: "Parents of the groom",
    parentsOfBride: "Parents of the bride",
    grandparentsOfGroom: "Grandparents of the groom",
    grandparentsOfBride: "Grandparents of the bride",
    honourPresence:
      "request the honour of your presence at the wedding of their children",
    mauryaFamily: "Maurya Family",
    singhFamily: "Singh Family",
    blessingEnglish:
      "With the blessings of our families, we invite you to celebrate our union",
    theCouple: "The Couple",
    twoHearts: "Two Hearts, One Journey",
    watchStory: "Watch their story unfold",
    theGroom: "The Groom",
    theBride: "The Bride",
    groomName: "Rohit",
    brideName: "Preksha",
    groomTagline: "A heart full of love and dreams",
    brideTagline: "Grace, beauty, and endless joy",
    unitedInLove: "united in love",
    coupleJourney:
      "Two souls, one promise — walking together into a lifetime of love, laughter, and shared dreams.",
    countdownTitle: "Counting Down To Our Big Day",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    celebrations: "Celebrations",
    weddingEvents: "Wedding Events",
    pickCardHint: "Pick a celebration card to reveal every detail",
    tapCardHint: "Tap a card to reveal venue, map & directions",
    celebration: "Celebration",
    selected: "Selected",
    pickCard: "Pick card",
    eventDetails: "Event Details",
    dressCode: "Dress Code",
    venueLocation: "Venue & Location",
    getDirections: "Get Directions",
    noEvents: "No events are included in this invitation.",
    scanDirections: "Scan for Directions",
    shareQr: "Share QR",
    downloadQr: "Download QR",
    qrDownloaded: "Downloaded",
    qrShared: "Shared",
    qrLinkCopied: "Link copied",
    qrUnavailable: "Share unavailable",
    albumUploadNote:
      "Uploads go directly to Google Photos — add only, please keep everyone's memories safe.",
    captureMoment: "Capture the Moment",
    sharePhotos: "Share Your Photos",
    albumEyebrow: "Google Photos Album",
    albumTitle: "Shared Memories",
    albumDescription:
      "Capture the joy of our celebration — add your favourite photos from Mehndi to Reception.",
    albumBody:
      "Everyone is welcome to upload photos from our wedding celebrations. Please add your memories — and kindly do not remove photos shared by others.",
    step1Title: "Open the album",
    step1Detail: "Tap the button below or scan the QR code on your phone.",
    step2Title: "Add your photos",
    step2Detail: "Choose photos from your gallery and upload them to Shared Memories.",
    step3Title: "Spread the joy",
    step3Detail: "Your moments become part of our wedding story for everyone to enjoy.",
    addPhotos: "Add Photos to Album",
    viewAlbum: "View Shared Album",
    hashtagHint: "Use {hashtag} when posting on social media so we can find your posts too.",
    scanUpload: "Scan to Upload",
    scanUploadHint: "Opens our shared Google Photos album on your phone",
    closingMessage:
      "Your presence and blessings will make our celebration complete. We look forward to sharing this special journey with you.",
    closingSignature: "With love, Rohit & Preksha",
    tapForMusic: "Tap for music ♪",
    loading: "Loading...",
    timeTba: "Time to be announced",
  },
  hi: {
    navWelcome: "स्वागत",
    navCouple: "दंपति",
    navEvents: "समारोह",
    navShare: "साझा करें",
    saveTheDate: "तिथि सुरक्षित रखें",
    gettingMarried: "का शुभ विवाह हो रहा है",
    scrollToExplore: "नीचे स्क्रॉल करें",
    dearGuest: "प्रिय",
    cordiallyInvited: "आप सादर आमंत्रित हैं",
    fromFamilyOf: "परिवार की ओर से",
    andFamilyOf: "एवं परिवार",
    parentsOfGroom: "वर के माता-पिता",
    parentsOfBride: "वधू के माता-पिता",
    grandparentsOfGroom: "वर के दादा-दादी",
    grandparentsOfBride: "वधू के नाना-नानी",
    honourPresence: "अपने बच्चों के शुभ विवाह में आपकी उपस्थिति का अनुरोध करते हैं",
    mauryaFamily: "मौर्य परिवार",
    singhFamily: "सिंह परिवार",
    blessingEnglish:
      "परिवारों के आशीर्वाद से, हम आपको हमारे मिलन का उत्सव मनाने हेतु आमंत्रित करते हैं",
    theCouple: "नवदंपति",
    twoHearts: "दो हृदय, एक यात्रा",
    watchStory: "उनकी प्रेम कहानी देखें",
    theGroom: "वर",
    theBride: "वधू",
    groomName: "रोहित",
    brideName: "प्रेक्षा",
    groomTagline: "प्रेम और सपनों से भरा हृदय",
    brideTagline: "कृपा, सुंदरता और अनंत आनंद",
    unitedInLove: "प्रेम में जुड़े",
    coupleJourney:
      "दो आत्माएँ, एक वचन — प्रेम, हँसी और साझा सपनों की आजीवन यात्रा में साथ-साथ।",
    countdownTitle: "हमारे शुभ दिन की उलटी गिनती",
    days: "दिन",
    hours: "घंटे",
    minutes: "मिनट",
    seconds: "सेकंड",
    celebrations: "उत्सव",
    weddingEvents: "विवाह समारोह",
    pickCardHint: "विवरण देखने के लिए कोई समारोह कार्ड चुनें",
    tapCardHint: "स्थान, मानचित्र और दिशा के लिए कार्ड पर टैप करें",
    celebration: "समारोह",
    selected: "चयनित",
    pickCard: "चुनें",
    eventDetails: "समारोह विवरण",
    dressCode: "वेशभूषा",
    venueLocation: "स्थान एवं पता",
    getDirections: "दिशा प्राप्त करें",
    noEvents: "इस निमंत्रण में कोई समारोह शामिल नहीं है।",
    scanDirections: "दिशा के लिए स्कैन करें",
    shareQr: "QR साझा करें",
    downloadQr: "QR डाउनलोड करें",
    qrDownloaded: "डाउनलोड हो गया",
    qrShared: "साझा किया गया",
    qrLinkCopied: "लिंक कॉपी हो गया",
    qrUnavailable: "साझा करना उपलब्ध नहीं",
    albumUploadNote:
      "अपलोड सीधे गूगल फ़ोटो में जाता है — केवल जोड़ें, सभी की यादें सुरक्षित रखें।",
    captureMoment: "क्षण संजोएँ",
    sharePhotos: "अपनी तस्वीरें साझा करें",
    albumEyebrow: "गूगल फ़ोटो एल्बम",
    albumTitle: "साझा यादें",
    albumDescription:
      "हमारे उत्सव की खुशियाँ संजोएँ — मेहंदी से प्रीतिभोज तक अपनी प्रिय तस्वीरें जोड़ें।",
    albumBody:
      "आप सभी विवाह समारोह की तस्वीरें अपलोड कर सकते हैं। कृपया अपनी यादें जोड़ें — और दूसरों द्वारा साझा की गई तस्वीरें न हटाएँ।",
    step1Title: "एल्बम खोलें",
    step1Detail: "नीचे दिए बटन पर टैप करें या फ़ोन पर QR कोड स्कैन करें।",
    step2Title: "तस्वीरें जोड़ें",
    step2Detail: "गैलरी से तस्वीरें चुनकर साझा यादों में अपलोड करें।",
    step3Title: "खुशियाँ बाँटें",
    step3Detail: "आपके पल हमारी विवाह कहानी का हिस्सा बनेंगे।",
    addPhotos: "एल्बम में तस्वीरें जोड़ें",
    viewAlbum: "साझा एल्बम देखें",
    hashtagHint:
      "सोशल मीडिया पर पोस्ट करते समय {hashtag} का उपयोग करें ताकि हम आपकी पोस्ट देख सकें।",
    scanUpload: "अपलोड हेतु स्कैन करें",
    scanUploadHint: "फ़ोन पर हमारा साझा गूगल फ़ोटो एल्बम खुलता है",
    closingMessage:
      "आपकी उपस्थिति और आशीर्वाद से हमारा उत्सव पूर्ण होगा। हम इस विशेष यात्रा को आपके साथ बाँटने की प्रतीक्षा में हैं।",
    closingSignature: "सप्रेम, रोहित एवं प्रेक्षा",
    tapForMusic: "संगीत के लिए टैप करें ♪",
    loading: "लोड हो रहा है...",
    timeTba: "समय शीघ्र घोषित होगा",
  },
} as const;

export type UiCopy = { [K in keyof (typeof UI)["en"]]: string };

export function getUiCopy(language: InvitationLanguage): UiCopy {
  return UI[language];
}

export function localizeEvent(
  event: WeddingEvent,
  language: InvitationLanguage,
): WeddingEvent {
  if (language !== "hi") return event;
  const hi = EVENT_HI[event.id];
  if (!hi) return event;
  return {
    ...event,
    title: hi.title,
    time: hi.time ?? event.time,
    venue: hi.venue ?? event.venue,
    description: hi.description ?? event.description,
    dressCode: hi.dressCode ?? event.dressCode,
  };
}

const EVENT_HI: Record<
  string,
  {
    title: string;
    time?: string;
    venue?: string;
    description?: string;
    dressCode?: string;
  }
> = {
  mehndi: {
    title: "मेहंदी समारोह",
    time: "समय शीघ्र घोषित होगा",
    venue: "शिवाजी पुरम",
    description: "मेंहदी, संगीत, रंग और मिलन का आनंदमय उत्सव।",
    dressCode: "पारंपरिक / उत्सवी वस्त्र",
  },
  haldi: {
    title: "हल्दी समारोह",
    time: "समय शीघ्र घोषित होगा",
    venue: "शिवाजी पुरम",
    description: "हल्दी के आशीर्वाद, हँसी और शुभ रीतियों की प्रभात।",
    dressCode: "पीला / हल्के उत्सवी रंग",
  },
  wedding: {
    title: "विवाह समारोह",
    time: "प्रातः 10:00 बजे से",
    venue: "राज एस्टेट",
    description: "रोहित और प्रेक्षा का पावन मिलन — उनके संकल्प और आशीर्वाद के साक्षी बनें।",
    dressCode: "पारंपरिक / औपचारिक जातीय वस्त्र",
  },
  reception: {
    title: "प्रीतिभोज",
    time: "रात्रि भोज : ________",
    venue: "उत्कर्ष लॉन",
    description:
      "रोहित और प्रेक्षा की नई यात्रा के आरंभ पर हमारे साथ उत्सव मनाएँ।",
    dressCode: "औपचारिक / सायंकालीन वस्त्र",
  },
};

export function formatWeddingDate(
  date: Date,
  language: InvitationLanguage,
): string {
  return date.toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatEventDate(
  dateStr: string,
  language: InvitationLanguage,
): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString(
    language === "hi" ? "hi-IN" : "en-IN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
}

export function formatEventShortDate(
  dateStr: string,
  language: InvitationLanguage,
): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString(
    language === "hi" ? "hi-IN" : "en-IN",
    {
      month: "short",
      day: "numeric",
    },
  );
}

/** Small section eyebrows: English uses wide tracking; Hindi is tight, taller, with room for matras. */
export function eyebrowClass(
  language: InvitationLanguage,
  wide: "sm" | "md" | "lg" = "md",
): string {
  if (language === "hi") {
    if (wide === "sm") {
      return "hi-eyebrow tracking-normal normal-case text-[15px] leading-snug sm:text-base";
    }
    if (wide === "lg") {
      return "hi-eyebrow tracking-normal normal-case text-base leading-snug sm:text-lg md:text-xl";
    }
    return "hi-eyebrow tracking-normal normal-case text-base leading-snug sm:text-lg";
  }
  if (wide === "sm") {
    return "text-[10px] leading-none tracking-[0.14em] uppercase sm:tracking-[0.22em]";
  }
  if (wide === "lg") {
    return "text-[10px] leading-none tracking-[0.28em] uppercase sm:text-xs sm:tracking-[0.5em] md:text-sm";
  }
  return "text-[10px] leading-none tracking-[0.28em] uppercase sm:text-xs sm:tracking-[0.4em]";
}


