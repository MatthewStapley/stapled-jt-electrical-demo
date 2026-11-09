import { asset } from "./site";

// Sample imagery kept from the Stapled electrician concept until JT Electrical
// supplies its own. None of it shows JT Electrical's work, and the page says so.

export interface SiteImage {
  /** File stem in public/images */
  file: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
  creditUrl: string;
  focus?: string;
}

const WIDTHS = [640, 1024, 1600];

export const images = {
  stair: { file: "lit-stair", alt: "A timber staircase with a warm wall light and a concealed strip beneath the handrail.", width: 1600, height: 2844, credit: "Filipp Romanovski", creditUrl: "https://unsplash.com/photos/modern-wooden-staircase-illuminated-by-warm-lighting-M4dpV6STEDM", focus: "50% 55%" },
  pendantKitchen: { file: "pendant-kitchen", alt: "A pale kitchen with a line of slim pendants above a central island.", width: 1600, height: 1792, credit: "Michael Alake", creditUrl: "https://unsplash.com/photos/a-kitchen-with-a-center-island-surrounded-by-wooden-chairs-6s2cHhuy6lY", focus: "50% 30%" },
  ceiling: { file: "workspace-ceiling", alt: "Linear lights and steel cable tray running in straight lines beneath a concrete soffit.", width: 1600, height: 1083, credit: "Declan Sun", creditUrl: "https://unsplash.com/photos/iK1WfxsJgLc", focus: "30% 15%" },
} satisfies Record<string, SiteImage>;

export const imageUrl = (img: SiteImage, width = 1024) => asset(`/images/${img.file}-${width}.webp`);
export const imageSrcset = (img: SiteImage) => WIDTHS.map((w) => `${asset(`/images/${img.file}-${w}.webp`)} ${w}w`).join(", ");
