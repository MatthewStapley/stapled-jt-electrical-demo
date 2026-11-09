// The preview enquiry form. Nothing leaves this page: no request is made and
// nothing is stored.

const form = document.querySelector<HTMLFormElement>("[data-enquiry]");
const done = document.querySelector<HTMLElement>("[data-enquiry-done]");
const service = form?.querySelector<HTMLSelectElement>("#e-service");

type Field = HTMLInputElement | HTMLSelectElement;

const looksLikeContact = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v.replace(/\D/g, "").length >= 10;

function problem(el: Field): string {
  const v = el.value.trim();
  switch (el.name) {
    case "name": return v ? "" : "Enter your name.";
    case "contact":
      if (!v) return "Enter a phone number or email address.";
      return looksLikeContact(v) ? "" : "Check this is a full phone number or email address.";
    case "service": return v ? "" : "Choose what you need, or pick Something else.";
    case "area": return v ? "" : "Enter your town or area.";
    default: return "";
  }
}

function show(el: Field, message: string) {
  const err = document.getElementById(`${el.id}-err`);
  if (!err) return;
  err.textContent = message;
  err.hidden = !message;
  if (message) el.setAttribute("aria-invalid", "true");
  else el.removeAttribute("aria-invalid");
}

if (form && done) {
  const fields = [...form.querySelectorAll<Field>("input[required], select[required]")];

  // Once a field has been flagged, clear the message as soon as it's fixed.
  fields.forEach((el) => {
    const recheck = () => { if (el.getAttribute("aria-invalid")) show(el, problem(el)); };
    el.addEventListener("input", recheck);
    el.addEventListener("change", recheck);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let first: Field | undefined;
    for (const el of fields) {
      const message = problem(el);
      show(el, message);
      if (message && !first) first = el;
    }
    if (first) { first.focus(); return; }
    form.reset();
    form.hidden = true;
    done.hidden = false;
    done.focus({ preventScroll: true });
    done.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });

  done.querySelector("[data-enquiry-reset]")?.addEventListener("click", () => {
    done.hidden = true;
    form.hidden = false;
    fields.forEach((el) => show(el, ""));
    fields[0]?.focus();
  });

  // Choosing a service row starts the enquiry with that service selected, and
  // the row shows it for as long as the form agrees.
  const links = [...document.querySelectorAll<HTMLElement>("[data-service]")];
  const syncSelected = () => {
    links.forEach((l) => {
      if (l.dataset.service === service?.value && service?.value) l.setAttribute("aria-current", "true");
      else l.removeAttribute("aria-current");
    });
    dispatchEvent(new Event("jt:service"));
  };
  service?.addEventListener("change", syncSelected);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (!service || !link.dataset.service) return;
      if (form.hidden) { done.hidden = true; form.hidden = false; }
      service.value = link.dataset.service;
      show(service, "");
      syncSelected();
      service.classList.remove("is-set");
      void service.offsetWidth;
      service.classList.add("is-set");
    });
  });

  form.addEventListener("reset", () => setTimeout(syncSelected));
}
