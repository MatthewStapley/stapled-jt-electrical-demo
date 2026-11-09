// ---------------------------------------------------------------------------
// Business facts for the JT Electrical concept, taken from the business's public
// Instagram profile. Unverified details stay out of the page.
// ---------------------------------------------------------------------------

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, "/");

/** Prefix a site-root path with the deployment base. */
export const asset = (path: string) => BASE + path.replace(/^\//, "");

export const brand = {
  name: "JT Electrical",
  line: "Precision & Quality. Every Detail Matters.",
  promise: "Quality workmanship, clean finishes",
  area: "West Yorkshire",
  handle: "@_jt_electrical_",
  instagram: "https://www.instagram.com/_jt_electrical_/",
  logo: "/brand/jt-logo-150.jpg",
};

export const stapled = { url: "https://stapled.co.uk" };

export const nav = [
  { label: "Services", id: "services" },
  { label: "Finishes", id: "finishes" },
  { label: "About", id: "about" },
];
