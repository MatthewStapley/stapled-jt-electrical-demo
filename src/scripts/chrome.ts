// Shared behaviour: menu, section highlighting and scroll reveals.

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

const menu = document.querySelector<HTMLDialogElement>("[data-menu]");
document.querySelector("[data-menu-open]")?.addEventListener("click", () => menu?.showModal());
document.querySelector("[data-menu-close]")?.addEventListener("click", () => menu?.close());
// Close first: a modal dialog would otherwise stop the page reaching its anchor.
document.querySelectorAll("[data-menu-link]").forEach((a) => a.addEventListener("click", () => menu?.close()));

// Highlight the section being read in the header.
const spyLinks = new Map([...document.querySelectorAll<HTMLElement>("[data-spy]")].map((a) => [a.dataset.spy!, a]));
const spy = new IntersectionObserver((entries) => {
  for (const e of entries) spyLinks.get(e.target.id)?.setAttribute("aria-current", String(e.isIntersecting));
}, { rootMargin: "-45% 0px -50% 0px" });
spyLinks.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

// Reveals. Content is visible until this line runs, and never hidden if reduced.
if (!reduced) {
  document.documentElement.classList.add("reveal-armed");
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll("[data-r], [data-draw]").forEach((el) => io.observe(el));
}
