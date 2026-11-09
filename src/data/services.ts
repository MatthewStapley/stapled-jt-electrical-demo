// Work JT Electrical has described in its own public Instagram captions. The
// groups are navigation categories, not extra capabilities.

export interface Service {
  name: string;
  summary: string;
  /** The part of the group's drawing this service lights up. */
  part: string;
}

export interface ServiceGroup {
  id: string;
  title: string;
  /** Short lines lifted from JT Electrical's own captions. */
  voice: string;
  services: Service[];
}

export const groups: ServiceGroup[] = [
  {
    id: "lighting",
    title: "Lighting & finishes",
    voice: "You can never have too many spotlights.",
    services: [
      { name: "Spotlights and interior lighting", part: "spots", summary: "First and second fix, with spotlights placed throughout to bring a whole room to life." },
      { name: "LED strip lighting", part: "led", summary: "Fitted underneath worktops or behind a TV for a clean, modern finish." },
      { name: "Outdoor lighting", part: "outdoor", summary: "Brighter lights at the front or back of the house, with motion sensors so they only come on when needed." },
      { name: "Sockets and switches", part: "sockets", summary: "Matching sockets and switches, including upgrades to finishes like brushed gold." },
      { name: "Cable management", part: "cable", summary: "Trunking and concealed TV cable runs that keep wiring neat, discreet and out of sight." },
    ],
  },
  {
    id: "connectivity",
    title: "Connectivity & audio",
    voice: "The right solution for the location.",
    services: [
      { name: "Starlink installation", part: "starlink", summary: "For homes where broadband isn't delivering, installed with cabling neatly clipped and secured." },
      { name: "Ceiling speakers", part: "speaker", summary: "Ceiling speaker installation alongside your lighting, including Lithe Audio." },
    ],
  },
  {
    id: "commercial",
    title: "Commercial controls",
    voice: "Out with the old, in with the new.",
    services: [
      { name: "BMS and control panels", part: "panel", summary: "Commercial panel replacement, including new power supplies, panel wiring, cable identification and testing." },
    ],
  },
];

/** Every service, in order, for the enquiry form. */
export const services: Service[] = groups.flatMap((g) => g.services);
