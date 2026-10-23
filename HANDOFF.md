# Handoff: Arpit's Portfolio (Code With AI internal assessment)

Updated: 2026-10-24 (gold palette, light default, new fonts). How to use: start a new chat in another account, attach `ARPITS PORTFOLIO.zip` (and the assignment PDFs if you have them), then paste everything between the two lines.

---------- PASTE FROM HERE ----------

I'm Arpit Ganeshaanand, a B.Tech student at JECRC University, Jaipur, and a beginner. Explain steps simply, one at a time. The attached zip is the finished master folder **ARPITS PORTFOLIO**. Unzip it and work from it. Do not rebuild anything that is already done.

## The assignment (Code With AI internal assessment)
Portfolio website (plain HTML/CSS/JS), six tasks:
1. Personalize it, no placeholders. Sections: Home, About Me, Skills, Projects, Contact Information, AI Chatbot.
2. Five project cards (title, description, technologies, GitHub link, live link where available): Python Programs Collection, Messy Python Code Improvement, Bug Fixing Using Cursor AI, Interactive Quiz Application (Lecture 10), Book Reading List Application (Lecture 11, on Vercel).
3. Project search and filter plus a light/dark toggle (class `dark-mode`).
4. Push to GitHub with clean commits ("type: short imperative summary") and a README (description, technologies, features, setup, live link).
5. Deploy on Vercel and test.
6. Groq chatbot (https://api.groq.com/openai/v1, model llama-3.1-8b-instant) in `chatbot.css`, `chatbot.js`, `config.js`; replies under 60 words; says when a detail is unknown; clear 401/429 messages; works live; `config.js` gitignored; no secret key on GitHub.

## What is in the master folder
```
ARPITS PORTFOLIO/
  index.html, style.css, script.js, data.js   website (data.js = single source of truth)
  chatbot.css, chatbot.js, config.js          chatbot (config.js has an empty apiKey, gitignored)
  api/chat.js                                 Vercel function that reads GROQ_API_KEY
  images/                                     profile.jpg, profile-cutout.webp
  README.md, AUDIT.md, HANDOFF.md, .gitignore
  projects/
    python-programs-collection/    factorial.py, fibonacci.py, structure_to_dictionary.py + README
    messy-python-code-improvement/ messy_code.py + README
    bug-fixing-using-cursor-ai/    buggy_program.py + README
    interactive-quiz/              index.html, script.js, style.css, README (teacher's exact Lecture 10 quiz)
    book-reading-list/             Bolt app source (React, TypeScript, Tailwind, Vite) + README; live at https://reading-list-app-livid.vercel.app/
```

## Final design (done)
- LIGHT mode is the default (ivory + rich gold). Dark mode is warm black + gold. The gold palette was chosen over sapphire/oxblood. Theme choice is remembered (localStorage key `portfolio-theme2`). Both replaced gold.
- Fonts: Playfair Display (headings, name) and DM Sans (body text, labels, About text) from Google Fonts. About text was made smaller (about 1rem to 1.15rem) and clearer. The intro screen keeps its original fonts (Cormorant Garamond, Manrope, JetBrains Mono). Do not change those.
- Intro: ONE screen with one quote and the button together. The quote (9) AND the button text (12 gen-z lines such as "Are we ready to rock??", "No cap, let's go", "Let's cook") change on each visit and avoid repeating the last one. No second quote after clicking. Skip button, Enter and Esc work.
- Header with round photo, no hamburger, sun/moon toggle (remembered). Hero with giant "ARPIT" behind the cut-out photo. Project search, chips, five cards, journey timeline, floating chatbot robot.
- Quiz button "Play the Interactive Quiz" opens the quiz in a new tab (the teacher's page has no back link).

## Quiz (fixed in this update)
Earlier the quiz was my own design (progress bar, feedback, dark mode), which did not follow the teacher. It is now the teacher's exact Lecture 10 code: title "Quiz App", heading "Code With AI Quiz", `questions` array of objects, option buttons made in JS, score counter, then "Quiz Complete" and "Your score is X out of 5". Card text, README, AUDIT and journey note were updated to match. If the teacher's wording differs from the PDFs I used, compare `projects/interactive-quiz/script.js` against the lecture.

## Decisions to keep
- `api/chat.js` exists because a gitignored `config.js` is never deployed to Vercel. The class guide says not to create it. If my instructor objects, explain this reason.
- Card text matches the REAL code in my folders (no false claims about unit tests).
- Unfilled FILL markers are sent to the chatbot as "not provided".
- The reading list opens from the live Vercel link; no local copy is embedded (module scripts do not run on file://).

## My details (filled in `data.js`)
Email arpitganeshaanand@gmail.com, GitHub https://github.com/Championgamers, LinkedIn https://www.linkedin.com/in/arpit-ganeshaanand-029182380. Confirm two assumptions: "video coding" was read as **vibe coding**; `PORTFOLIO_REPO` = `arpits-portfolio` (my GitHub repo must have exactly that name, or change it in `data.js`).

## Tested (Chromium, local server, 2026-10-24)
Desktop 1366 and phone 390: no sideways scroll, no script errors. Intro fonts stay Cormorant/Manrope; site fonts are Playfair Display/DM Sans. Button text varied across fresh visits (5 different in 6 tries). Dark and light themes work. Five project cards show. Quiz: answered all 5, ends with "Quiz Complete" and "Your score is 5 out of 5". Earlier: search counts (Python 3, Quiz 1, Book 1), chatbot 401/429/500 messages simulated.
**NOT tested:** the chatbot with a real Groq key, the real Vercel deployment, the reading-list Vercel link (sandbox cannot reach vercel.app). The test sandbox could not load Google Fonts, so Playfair Display/DM Sans were checked in code only. Look at the real fonts in your browser.

## Still to do
1. In `README.md` fill the one remaining marker: the live site URL. Search the folder for `[[FILL` to confirm nothing else is left.
2. Confirm skills and about text read true.
3. Push to GitHub: create an empty repo `arpits-portfolio`; `git init`; `git branch -M main`; check `git check-ignore config.js` prints `config.js`; one commit per part (docs, website, chatbot, three Python projects, quiz, reading list); never `git add .`; `git remote add origin https://github.com/Championgamers/arpits-portfolio.git`; `git push -u origin main`. Confirm the Python folders open on GitHub.
4. Vercel (after pushing; then send me the links so I can add them to the Projects cards in `data.js`): import the repo, deploy, add `GROQ_API_KEY` under Settings > Environment Variables, redeploy. Test links, quiz button, reading-list button, search, both themes, chatbot (ask an unknown detail), phone layout. Put the live URL in `README.md`.
5. Never paste a real Groq key into chat or GitHub. If committed, revoke at https://console.groq.com/keys.

---------- END ----------
