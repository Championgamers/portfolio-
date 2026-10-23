// Portfolio page logic (plain JavaScript). All content comes from data.js (PORTFOLIO).
(function () {
  "use strict";
  const P = PORTFOLIO;
  const byId = (id) => document.getElementById(id);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const isTodo = (s) => typeof s !== "string" || s.trim() === "" || s.indexOf("[[FILL") !== -1;
  const isUrl = (s) => !isTodo(s) && /^https?:\/\//i.test(s);
  const isLink = (s) => isUrl(s) || (!isTodo(s) && /^[\w.\-\/]+$/.test(s)); // web address or a page inside this site
  const get = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = (arr) => arr.slice().sort(function () { return Math.random() - 0.5; });
  function make(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  const name = isTodo(P.name) ? "Your Name" : P.name;
  const parts = name.split(" ");

  /* ---------- intro: a welcome quote and a "Let's go" button, both different on every visit ---------- */
  const QUOTES = [
    { t: "Welcome in. Every project here started as a blank file and a stubborn idea.", a: "" },
    { t: "Talk is cheap. Show me the code.", a: "Linus Torvalds" },
    { t: "The best way to predict the future is to invent it.", a: "Alan Kay" },
    { t: "Make it work, make it right, make it fast.", a: "Kent Beck" },
    { t: "Good things are built one small commit at a time. Make yourself at home.", a: "" },
    { t: "Stay curious, ship small, keep learning. Glad you stopped by.", a: "" },
    { t: "First, solve the problem. Then, write the code.", a: "John Johnson" },
    { t: "Every expert was once a beginner. Welcome to my journey.", a: "" },
    { t: "Not perfect yet, but always improving. Thanks for visiting.", a: "" }
  ];
  const GO_TEXT = [
    "Are we ready to rock??",
    "Say less. Let's go",
    "No cap, let's go",
    "Let's cook",
    "Main character mode: on",
    "Vibe check passed. Enter",
    "It's giving portfolio. Enter",
    "Lowkey excited. Let's go",
    "Bet. Let's go",
    "Time to flex. Let's go",
    "Ready? Meet the real portfolio",
    "Slay the scroll. Let's go"
  ];
  function pickNew(list, key) {
    let i = Math.floor(Math.random() * list.length);
    if (i === parseInt(get(key), 10)) i = (i + 1) % list.length;
    set(key, String(i));
    return list[i];
  }
  const quote = pickNew(QUOTES, "portfolio-last-quote");
  byId("introGoText").textContent = pickNew(GO_TEXT, "portfolio-last-go");
  const quoteWords = quote.t.split(" ");
  const quoteEl = byId("introQuote");
  quoteWords.forEach(function (word, i) {
    const w = make("span", "w", word);
    w.style.setProperty("--i", i);
    quoteEl.appendChild(w);
    quoteEl.appendChild(document.createTextNode(" "));
  });
  byId("introAuthor").textContent = quote.a ? "\u2014 " + quote.a : "";
  const intro = byId("intro");
  const doneAt = 0.9 + quoteWords.length * 0.08 + 1;
  byId("introAuthor").style.setProperty("--fd", doneAt.toFixed(2) + "s");
  byId("introGo").style.setProperty("--fd", (doneAt + 0.5).toFixed(2) + "s");

  function startSite() {
    if (intro.hidden || intro.classList.contains("closing")) return;
    intro.classList.add("closing");
    document.body.classList.remove("locked");
    document.body.classList.add("ready");
    setTimeout(function () { intro.hidden = true; }, reduce ? 0 : 1050);
    setTimeout(startBotCalls, 2600);
  }
  byId("introGo").addEventListener("click", startSite);
  byId("introSkip").addEventListener("click", startSite);
  document.addEventListener("keydown", function (e) {
    if (!intro.hidden && (e.key === "Enter" || e.key === "Escape")) startSite();
  });

  /* ---------- header + hero ---------- */
  document.title = parts[0] + "\u2019s Portfolio";
  byId("brandName").textContent = parts[0] + "\u2019s Portfolio";
  byId("aboutName").textContent = parts[0];
  byId("giantText").textContent = parts[0].toUpperCase();
  byId("heroYear").textContent = "Portfolio \u00B7 " + new Date().getFullYear();
  const h1 = byId("heroName");
  h1.textContent = "";
  parts.forEach(function (part, i) {
    const w = make(i === 0 ? "span" : "em", "w", part);
    w.style.setProperty("--d", (0.35 + i * 0.14) + "s");
    h1.appendChild(w);
    h1.appendChild(document.createTextNode(" "));
  });
  byId("heroRole").textContent = isTodo(P.role) ? "" : P.role;
  byId("footerText").textContent = "\u00A9 " + new Date().getFullYear() + " " + name + ". Designed and built with HTML, CSS and JavaScript.";

  function photoInto(id, src) {
    const img = byId(id);
    img.addEventListener("error", function () { img.hidden = true; });
    img.src = src;
    return img;
  }
  photoInto("brandPhoto", P.photo);
  photoInto("badgePhoto", P.photo).alt = "";
  photoInto("heroCutout", P.photoCutout || P.photo).alt = "Photo of " + name;
  let ring = (name.toUpperCase() + " \u2022 PORTFOLIO \u2022 ");
  while (ring.length < 38) ring += ring;
  byId("ringText").textContent = ring;
  byId("ringText").setAttribute("textLength", "296");
  byId("ringText").setAttribute("lengthAdjust", "spacing");

  function setLink(id, url) {
    const a = byId(id);
    if (isUrl(url)) a.href = url; else { a.removeAttribute("target"); a.title = "Add this link in data.js"; }
  }
  setLink("heroGithub", P.contact.github);
  setLink("heroLinkedin", P.contact.linkedin);

  // rotating sub-line under the name
  const rot = byId("heroRotator");
  const lines = shuffle(P.taglines && P.taglines.length ? P.taglines : [P.tagline]);
  let li = 0;
  rot.textContent = lines[0];
  if (lines.length > 1 && !reduce) {
    setInterval(function () {
      rot.classList.add("out");
      setTimeout(function () { li = (li + 1) % lines.length; rot.textContent = lines[li]; rot.classList.remove("out"); }, 520);
    }, 3800);
  }

  /* ---------- marquee ---------- */
  const allSkills = [].concat.apply([], Object.keys(P.skills).map(function (g) { return P.skills[g]; }));
  const track = byId("marqueeTrack");
  allSkills.concat(allSkills).forEach(function (s) { track.appendChild(make("span", "", s)); });

  /* ---------- about + education ---------- */
  const aboutBox = byId("aboutText");
  P.about.filter(function (t) { return !isTodo(t); }).forEach(function (t) { aboutBox.appendChild(make("p", "reveal", t)); });
  const eduList = byId("educationList");
  P.education.forEach(function (e) {
    const bits = [e.institute, e.period].filter(function (v) { return !isTodo(v); });
    if (isTodo(e.degree) && !bits.length) return;
    const li2 = make("li", "reveal");
    li2.appendChild(make("strong", "", isTodo(e.degree) ? bits.shift() || "" : e.degree));
    if (bits.length) li2.appendChild(make("span", "", bits.join(" \u00B7 ")));
    eduList.appendChild(li2);
  });

  /* ---------- skills ---------- */
  const grid = byId("skillsGrid");
  Object.keys(P.skills).forEach(function (group, i) {
    const card = make("div", "skill-card reveal");
    card.style.setProperty("--rd", i * 0.1 + "s");
    card.appendChild(make("h3", "", group));
    const ul = make("ul", "tag-list");
    P.skills[group].forEach(function (s) { ul.appendChild(make("li", "", s)); });
    card.appendChild(ul);
    grid.appendChild(card);
  });

  /* ---------- projects: line-art covers, search, technology filter ---------- */
  const ART = [
    '<path d="M42 20 20 50 42 80"/><path d="M108 20 130 50 108 80"/><path d="M84 12 66 88"/>',
    '<path d="M8 62C20 20 34 90 48 46S62 70 70 50"/><path d="M80 50h12"/><path d="m88 44 6 6-6 6"/><path d="M102 34h40M102 50h40M102 66h40"/>',
    '<ellipse cx="75" cy="56" rx="22" ry="28"/><circle cx="75" cy="20" r="9"/><path d="M53 44H34M53 58H30M53 72H36M97 44h19M97 58h23M97 72h17M75 28v56"/>',
    '<circle cx="75" cy="50" r="38"/><path d="M60 40a15 15 0 1 1 22 13c-5 3-7 6-7 12"/><circle cx="75" cy="80" r="1.5"/>',
    '<path d="M75 26C56 14 30 14 10 22v62c20-8 46-8 65 4 19-12 45-12 65-4V22c-20-8-46-8-65 4Z"/><path d="M75 26v62"/>'
  ];
  const projectGrid = byId("projectGrid"), search = byId("projectSearch"), chipBox = byId("techFilters");
  let activeTech = "All";
  const techs = ["All"];
  P.projects.forEach(function (p) { p.tech.forEach(function (t) { if (techs.indexOf(t) === -1) techs.push(t); }); });
  techs.forEach(function (t) {
    const b = make("button", "chip", t);
    b.type = "button";
    b.setAttribute("aria-pressed", t === "All" ? "true" : "false");
    b.addEventListener("click", function () {
      activeTech = t;
      chipBox.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c.textContent === t ? "true" : "false"); });
      renderProjects();
    });
    chipBox.appendChild(b);
  });
  function matches(p) {
    const q = search.value.trim().toLowerCase();
    const text = (p.title + " " + p.description + " " + p.tech.join(" ")).toLowerCase();
    return (!q || text.indexOf(q) !== -1) && (activeTech === "All" || p.tech.indexOf(activeTech) !== -1);
  }
  function renderProjects() {
    projectGrid.textContent = "";
    const shown = P.projects.filter(matches);
    shown.forEach(function (p, n) {
      const idx = P.projects.indexOf(p);
      const card = make("article", "project-card");
      card.style.animation = "rise .7s cubic-bezier(.22,1,.36,1) " + (n * 0.07) + "s both";
      const art = make("div", "project-art");
      art.appendChild(make("span", "project-no", String(idx + 1).padStart(2, "0")));
      art.insertAdjacentHTML("beforeend", '<svg viewBox="0 0 150 100" aria-hidden="true">' + ART[idx % ART.length] + "</svg>");
      card.appendChild(art);
      const body = make("div", "project-body");
      body.appendChild(make("h3", "", p.title));
      body.appendChild(make("p", "", p.description));
      const tags = make("ul", "tag-list");
      p.tech.forEach(function (t) { tags.appendChild(make("li", "", t)); });
      body.appendChild(tags);
      const links = make("div", "project-links");
      p.links.filter(function (l) { return isLink(l.url); }).forEach(function (l) {
        const a = make("a", "", l.label + (isUrl(l.url) ? " \u2197" : " \u2192"));
        a.href = l.url;
        if (isUrl(l.url)) { a.target = "_blank"; a.rel = "noopener"; }
        links.appendChild(a);
      });
      if (links.children.length) body.appendChild(links);
      card.appendChild(body);
      projectGrid.appendChild(card);
    });
    byId("projectCount").textContent = "Showing " + shown.length + " of " + P.projects.length + " projects";
    byId("noResults").hidden = shown.length > 0;
  }
  search.addEventListener("input", renderProjects);
  renderProjects();

  /* ---------- journey (vertical rail fills while you scroll) ---------- */
  const journey = byId("journeyList"), rail = byId("railFill");
  P.journey.forEach(function (chapter, i) {
    const row = make("div", "chapter reveal");
    const head = make("div");
    head.appendChild(make("div", "chapter-no", "CHAPTER " + String(i + 1).padStart(2, "0")));
    head.appendChild(make("h3", "", chapter.season));
    row.appendChild(head);
    const ul = make("ul", "steps");
    chapter.episodes.forEach(function (ep) {
      const item = make("li");
      item.appendChild(make("strong", "", ep.title));
      item.appendChild(make("span", "", ep.note));
      ul.appendChild(item);
    });
    row.appendChild(ul);
    journey.appendChild(row);
  });
  function updateRail() {
    const b = journey.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - b.top) / b.height));
    rail.style.height = Math.max(0, p * (b.height - 12)) + "px";
  }

  /* ---------- contact ---------- */
  const rows = [["Email", P.contact.email, "mailto:" + P.contact.email], ["GitHub", P.contact.github, P.contact.github],
                ["LinkedIn", P.contact.linkedin, P.contact.linkedin], ["Phone", P.contact.phone, "tel:" + P.contact.phone]];
  const cl = byId("contactList");
  rows.forEach(function (r) {
    if (isTodo(r[1])) return;
    const item = make("li", "reveal");
    item.appendChild(make("span", "", r[0]));
    const a = make("a", "", r[1].replace(/^https?:\/\//, ""));
    a.href = r[2];
    if (r[0] !== "Email" && r[0] !== "Phone") { a.target = "_blank"; a.rel = "noopener"; }
    item.appendChild(a);
    cl.appendChild(item);
  });
  if (!isTodo(P.contact.email)) {
    const big = byId("contactBig");
    big.hidden = false; big.textContent = P.contact.email; big.href = "mailto:" + P.contact.email;
  }

  /* ---------- theme: sun / moon icon, remembered ---------- */
  const themeBtn = byId("themeToggle");
  function applyTheme(dark) {
    document.body.classList.toggle("dark-mode", dark);
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    set("portfolio-theme2", dark ? "dark" : "light");
  }
  applyTheme(get("portfolio-theme2") === "dark");
  themeBtn.addEventListener("click", function () { applyTheme(!document.body.classList.contains("dark-mode")); });

  /* ---------- AI chatbot helper: calls out to visitors, opens a chat panel ---------- */
  const launcher = byId("botLauncher"), bubble = byId("botBubble"), panel = byId("portfolio-chatbot");
  const BUBBLES = [
    "Psst\u2026 need a hand finding something?",
    "Ask me about " + parts[0] + "\u2019s projects!",
    "Curious about his skills? Just ask.",
    "Hi there! I answer in under 60 words.",
    "Wondering where to start? I can help.",
    "Want a quick tour? Say hello!",
    "I think you need help. I\u2019m right here."
  ];
  const GREETINGS = ["Hello! Ask me something about this portfolio.", "Hi, I\u2019m the portfolio assistant. What would you like to know?", "Welcome! Ask about projects, skills or how to reach " + parts[0] + "."];
  const SUBS = ["Short answers about " + parts[0] + "\u2019s skills, projects and GitHub.", "Quick answers, never more than 60 words.", "Ask me anything about this portfolio."];
  const SUGGEST = ["What projects has " + parts[0] + " built?", "Which technologies does he know?", "Where does he study?", "How can I contact him?", "Tell me about the quiz app", "What is the bug fixing project?"];
  byId("chatGreeting").textContent = rand(GREETINGS);
  byId("chatSub").textContent = rand(SUBS);
  const sug = byId("chatSuggest");
  shuffle(SUGGEST).slice(0, 3).forEach(function (q) {
    const b = make("button", "", q);
    b.type = "button";
    b.addEventListener("click", function () {
      byId("chatInput").value = q;
      byId("chatForm").requestSubmit ? byId("chatForm").requestSubmit() : byId("chatForm").dispatchEvent(new Event("submit", { cancelable: true }));
      sug.hidden = true;
    });
    sug.appendChild(b);
  });
  let bubbleTimer = null, bubbleIdx = Math.floor(Math.random() * BUBBLES.length), calling = false;
  function nextBubble() {
    if (panel.classList.contains("open")) return;
    bubble.textContent = BUBBLES[bubbleIdx % BUBBLES.length];
    bubbleIdx++;
    bubble.classList.add("show");
    launcher.classList.remove("calling"); void launcher.offsetWidth; launcher.classList.add("calling");
    bubbleTimer = setTimeout(function () {
      bubble.classList.remove("show");
      launcher.classList.remove("calling");
      bubbleTimer = setTimeout(nextBubble, 3800);
    }, 4600);
  }
  function startBotCalls() { if (!calling) { calling = true; nextBubble(); } }
  function setPanel(open) {
    if (open) {
      panel.hidden = false;
      void panel.offsetWidth;
      panel.classList.add("open");
      launcher.setAttribute("aria-expanded", "true");
      clearTimeout(bubbleTimer); bubble.classList.remove("show"); launcher.classList.remove("calling");
      setTimeout(function () { byId("chatInput").focus(); }, 250);
    } else {
      panel.classList.remove("open");
      panel.hidden = true;
      launcher.setAttribute("aria-expanded", "false");
      if (calling) bubbleTimer = setTimeout(nextBubble, 6000);
    }
  }
  launcher.addEventListener("click", function () { setPanel(panel.hidden); });
  byId("chatClose").addEventListener("click", function () { setPanel(false); launcher.focus(); });
  byId("navChat").addEventListener("click", function (e) { e.preventDefault(); setPanel(true); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) setPanel(false); });

  /* ---------- scroll reveal, nav highlight, progress ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(function (r) { io.observe(r); });
  } else { reveals.forEach(function (r) { r.classList.add("in"); }); }

  const navLinks = document.querySelectorAll(".site-nav a");
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + en.target.id)); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main > section").forEach(function (s) { so.observe(s); });
  }

  const bar = byId("scrollBar"), cring = byId("cursorRing"), pct = byId("cursorPct"), hero = byId("home");
  let idle;
  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    bar.style.transform = "scaleX(" + p + ")";
    pct.textContent = Math.round(p * 100) + "%";
    cring.classList.add("scrolling");
    clearTimeout(idle);
    idle = setTimeout(function () { cring.classList.remove("scrolling"); pct.textContent = ""; }, 700);
    if (window.scrollY < window.innerHeight * 1.2) hero.style.setProperty("--sy", window.scrollY);
    updateRail();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  updateRail();

  /* ---------- cursor, soft light and hero depth (mouse only) ---------- */
  if (fine && !reduce) {
    document.body.classList.add("has-cursor");
    const dot = byId("cursorDot");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, gx = mx, gy = my, px = 0, py = 0, tx = 0, ty = 0;
    document.addEventListener("pointermove", function (e) {
      mx = e.clientX; my = e.clientY;
      tx = (e.clientX / innerWidth - 0.5) * 2; ty = (e.clientY / innerHeight - 0.5) * 2;
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
      const t = e.target;
      cring.classList.toggle("hover", !!(t.closest && t.closest("a,button,input,.chip,.project-card")));
      const card = t.closest && t.closest(".project-card");
      if (card) {
        const b = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - b.left) + "px");
        card.style.setProperty("--my", (e.clientY - b.top) + "px");
      }
    });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      gx += (mx - gx) * 0.06; gy += (my - gy) * 0.06;
      px += (tx - px) * 0.06; py += (ty - py) * 0.06;
      cring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      const root = document.documentElement.style;
      root.setProperty("--gx", gx + "px"); root.setProperty("--gy", gy + "px");
      hero.style.setProperty("--px", px.toFixed(4)); hero.style.setProperty("--py", py.toFixed(4));
      requestAnimationFrame(loop);
    })();
  }
})();
