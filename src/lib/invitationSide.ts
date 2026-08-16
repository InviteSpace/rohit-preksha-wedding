export type InvitationSide = "groom" | "bride";
export type InvitationLanguage = "en" | "hi";

export interface InvitationSideContent {
  sideLabel: string;
  primaryName: string;
  unionLine: string;
  secondaryName: string;
  partnerConnector?: string;
  /** Inviting-side lineage shown under the couple names */
  familyIntroduction: string;
  parents: string[];
  grandparentsIntroduction: string;
  grandparents: string[];
  weekday: string;
  date: string;
  venue: string;
  closing: string;
  /** Back of the blue card — warm invite to the celebration */
  warmTitle: string;
  warmMessage: string;
  warmReceptionLine: string;
  signature: string;
}

const GROOM_EN: InvitationSideContent = {
  sideLabel: "Groom's Invitation",
  primaryName: "Rohit",
  unionLine: "weds",
  secondaryName: "Preksha",
  familyIntroduction: "Beloved son of",
  parents: ["Shri Jagmohan Maurya", "Smt. Urmila Maurya"],
  grandparentsIntroduction: "Grandson of",
  grandparents: ["Late Shri Indal Prasad Maurya", "Late Smt. Gomti Maurya"],
  weekday: "Saturday",
  date: "21 November 2026",
  venue: "Raj Estate",
  closing:
    "Your gracious presence and blessings will make this occasion truly memorable.",
  warmTitle: "Join us",
  warmMessage:
    "With warm hearts, we invite you to bless us on this auspicious day as we begin our new journey together.",
  warmReceptionLine:
    "It would mean the world to us to have you there — your presence will make our celebration complete.",
  signature: "With love, Rohit & Preksha",
};

const GROOM_HI: InvitationSideContent = {
  sideLabel: "वर पक्ष निमंत्रण",
  primaryName: "रोहित",
  unionLine: "का शुभ विवाह",
  secondaryName: "प्रेक्षा",
  partnerConnector: "के साथ",
  familyIntroduction: "सुपुत्र",
  parents: ["श्री जगमोहन मौर्य", "श्रीमती उर्मिला मौर्य"],
  grandparentsIntroduction: "पौत्र",
  grandparents: ["स्वर्गीय श्री इन्दल प्रसाद मौर्य", "स्वर्गीय श्रीमती गोमती मौर्य"],
  weekday: "शनिवार",
  date: "21 नवम्बर 2026",
  venue: "राज एस्टेट",
  closing: "कृपया पधारकर वर-वधू को अपना शुभाशीष प्रदान करें",
  warmTitle: "आमंत्रण",
  warmMessage:
    "हार्दिक प्रेम से निवेदन है कि आप इस पावन अवसर पर पधारकर हमें अपना आशीर्वाद दें।",
  warmReceptionLine:
    "आपकी उपस्थिति हमारे लिए अत्यंत हर्ष का विषय होगी — आपके आने से हमारा उत्सव पूर्ण होगा।",
  signature: "सप्रेम, रोहित एवं प्रेक्षा",
};

const BRIDE_EN: InvitationSideContent = {
  sideLabel: "Bride's Invitation",
  primaryName: "Preksha",
  unionLine: "weds",
  secondaryName: "Rohit",
  familyIntroduction: "Beloved daughter of",
  parents: ["Late Dr. Sandeep Singh", "Smt. Rekha Singh"],
  grandparentsIntroduction: "Granddaughter of",
  grandparents: ["Dr. Ram Adhar Singh", "Late Smt. Sneh Prabha Singh"],
  weekday: "Saturday",
  date: "21 November 2026",
  venue: "Raj Estate",
  closing:
    "Your gracious presence and blessings will make this occasion truly memorable.",
  warmTitle: "Join us",
  warmMessage:
    "With warm hearts, we invite you to bless us on this auspicious day as we begin our new journey together.",
  warmReceptionLine:
    "It would mean the world to us to have you there — your presence will make our celebration complete.",
  signature: "With love, Preksha & Rohit",
};

const BRIDE_HI: InvitationSideContent = {
  sideLabel: "वधू पक्ष निमंत्रण",
  primaryName: "प्रेक्षा",
  unionLine: "का शुभ विवाह",
  secondaryName: "रोहित",
  partnerConnector: "के साथ",
  familyIntroduction: "सुपुत्री",
  parents: ["स्वर्गीय डॉ. संदीप सिंह", "श्रीमती रेखा सिंह"],
  grandparentsIntroduction: "पौत्री",
  grandparents: ["डॉ. राम आधार सिंह", "स्वर्गीय श्रीमती स्नेह प्रभा सिंह"],
  weekday: "शनिवार",
  date: "21 नवम्बर 2026",
  venue: "राज एस्टेट",
  closing: "कृपया पधारकर वर-वधू को अपना शुभाशीष प्रदान करें",
  warmTitle: "आमंत्रण",
  warmMessage:
    "हार्दिक प्रेम से निवेदन है कि आप इस पावन अवसर पर पधारकर हमें अपना आशीर्वाद दें।",
  warmReceptionLine:
    "आपकी उपस्थिति हमारे लिए अत्यंत हर्ष का विषय होगी — आपके आने से हमारा उत्सव पूर्ण होगा।",
  signature: "सप्रेम, प्रेक्षा एवं रोहित",
};

export const INVITATION_VERSIONS = {
  groom: { en: GROOM_EN, hi: GROOM_HI },
  bride: { en: BRIDE_EN, hi: BRIDE_HI },
} as const;

export function parseInvitationSide(value: string | null | undefined): InvitationSide {
  return value === "bride" ? "bride" : "groom";
}

export function getInvitationContent(
  side: InvitationSide,
  language: InvitationLanguage,
): InvitationSideContent {
  return INVITATION_VERSIONS[side][language];
}
