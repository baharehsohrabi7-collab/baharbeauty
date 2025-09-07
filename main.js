
// Wire up dynamic contact links + year + WhatsApp + map + optional Formspree auto-fill
(function () {
  const cfg = window.BB_CONFIG || {};
  const byId = (id) => document.getElementById(id);

  const phoneAnchors = [byId('contactPhone'), byId('contactPhone2'), byId('phoneBtn')].filter(Boolean);
  phoneAnchors.forEach(a => { if (a) { a.textContent = cfg.phone || 'Phone'; a.href = cfg.phone ? `tel:${cfg.phone}` : '#'; } });

  const emailAnchors = [byId('contactEmail'), byId('contactEmail2'), byId('emailBtn')].filter(Boolean);
  emailAnchors.forEach(a => { if (a) { a.textContent = cfg.email || 'Email'; a.href = cfg.email ? `mailto:${cfg.email}` : '#'; } });

  const instaAnchors = [byId('contactInsta'), byId('contactInsta2')].filter(Boolean);
  instaAnchors.forEach(a => { if (a) a.href = cfg.instagram || '#'; });

  const wa = byId('whatsAppBtn');
  if (wa && cfg.whatsAppNumberIntl) {
    wa.href = `https://wa.me/${cfg.whatsAppNumberIntl}?text=Hi%20Bahar%20Beauty!%20I%27d%20like%20to%20book%20an%20appointment.`;
  }

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Map embed
  const mapDiv = document.getElementById('mapEmbed');
  if (mapDiv && cfg.studioAddress) {
    const src = `https://www.google.com/maps?q=${encodeURIComponent(cfg.studioAddress)}&output=embed`;
    mapDiv.innerHTML = `<iframe width="100%" height="100%" style="border:0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${src}"></iframe>`;
  }

  // Optional: override Formspree action with config
  const forms = document.querySelectorAll('form[action*="formspree.io"]');
  forms.forEach(f => {
    if (cfg.formspreeId && cfg.formspreeId !== "your-form-id") {
      f.action = `https://formspree.io/f/${cfg.formspreeId}`;
    }
  });
})();



// --- i18n (EN/FA) with RTL support ---
(function () {
  const T = {
    en: {
      "nav.home": "Home",
      "nav.services": "Services",
      "nav.pricing": "Pricing",
      "nav.gallery": "Gallery",
      "nav.book": "Book",
      "nav.contact": "Contact",
      "hero.h1": "Glow on a Budget ✨",
      "hero.p": "Facials, makeup, and skincare that are affordable, professional, and totally you.",
      "hero.ctaBook": "Book Now",
      "hero.ctaPrices": "See Prices",
      "footer.hours": "Hours",
      "footer.contact": "Contact",
    },
    fa: {
      "nav.home": "خانه",
      "nav.services": "خدمات",
      "nav.pricing": "قیمت‌ها",
      "nav.gallery": "گالری",
      "nav.book": "رزرو",
      "nav.contact": "تماس",
      "hero.h1": "درخشش اقتصادی ✨",
      "hero.p": "فیشیال، میکاپ و مراقبت پوست با قیمت مناسب و کاملاً حرفه‌ای و مطابق سلیقه شما.",
      "hero.ctaBook": "همین حالا رزرو کن",
      "hero.ctaPrices": "مشاهده قیمت‌ها",
      "footer.hours": "ساعات کاری",
      "footer.contact": "تماس",
    }
  };

  function applyLang(lang) {
    localStorage.setItem('bb_lang', lang);
    const dict = T[lang] || T.en;
    // swap direction
    const rtl = lang === 'fa';
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang === 'fa' ? 'fa' : 'en');
    // translate common nav items
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    // Special hero bits on index page
    const h1 = document.querySelector('.hero h1');
    const p = document.querySelector('.hero p');
    const cta1 = document.querySelector('.hero .btn-primary');
    const cta2 = document.querySelector('.hero .btn-ghost');
    if (h1 && dict["hero.h1"]) h1.textContent = dict["hero.h1"];
    if (p && dict["hero.p"]) p.firstChild && (p.firstChild.nodeValue = dict["hero.p"] + " ");
    if (cta1 && dict["hero.ctaBook"]) cta1.textContent = dict["hero.ctaBook"];
    if (cta2 && dict["hero.ctaPrices"]) cta2.textContent = dict["hero.ctaPrices"];
    // Footer headings
    document.querySelectorAll('.site-footer h4')[1]?.firstChild && (document.querySelectorAll('.site-footer h4')[1].firstChild.nodeValue = dict["footer.hours"] || "Hours");
    document.querySelectorAll('.site-footer h4')[2]?.firstChild && (document.querySelectorAll('.site-footer h4')[2].firstChild.nodeValue = dict["footer.contact"] || "Contact");
  }

  const langEN = document.getElementById('langEN');
  const langFA = document.getElementById('langFA');
  if (langEN) langEN.addEventListener('click', () => applyLang('en'));
  if (langFA) langFA.addEventListener('click', () => applyLang('fa'));
  // init
  applyLang(localStorage.getItem('bb_lang') || 'en');
})();
