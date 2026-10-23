# Project Audit

An honest check of this repository against the *Internal Assessment: Personal Portfolio Website with API-Based Chatbot Integration* brief.

- **Student:** Arpit Ganeshaanand, B.Tech, JECRC University, Jaipur
- **Audit date:** 2026-10-23
- **Method:** the site was opened in Chromium (desktop 1366x768 and phone 390x844) and each requirement was tried by hand and by script. Items that need the live site, GitHub or Vercel are marked **Pending** until checked there.

## Summary

| Task | Requirement | Status |
|---|---|---|
| 1 | Personalized portfolio, no placeholders | Pending: fill the remaining items in `data.js` (see checklist) |
| 2 | Five project cards with working links | Cards done; links Pending until the repo URLs are added |
| 3 | Search, filter and light/dark toggle | **Done and verified** |
| 4 | Push to GitHub with README | Pending until pushed |
| 5 | Deploy on Vercel and test | Pending until deployed |
| 6 | API chatbot, safe key handling | Built and verified locally; live check Pending |

## Task 1: Personalize the portfolio

| Item | Where | Status |
|---|---|---|
| Full name and role | `data.js` (`name`, `role`) | Done |
| Personal introduction | `data.js` (`about`) | Pending: first paragraph still to be written |
| Education | `data.js` (`education`) | Partly done: add branch and years |
| Technical skills | `data.js` (`skills`) | Done |
| Profile photo | `images/profile.jpg`, `images/profile-cutout.webp` | Done |
| GitHub link | `data.js` (`contact.github`) | Pending: add username |
| Contact information | `data.js` (`contact`) | Pending: add email (and LinkedIn or leave empty) |
| Design, navigation, responsiveness | `style.css`, `script.js` | Done. No sideways scroll at 390 px wide |

**Required sections** (Home, About Me, Skills, Projects, Contact Information, AI Chatbot) are all present and reachable from the navigation.

Note: the page hides any value that still contains a FILL marker (double square brackets around the word FILL), so unfinished items do not show as ugly text. That also means unfinished links are invisible, so search `data.js` and `README.md` for that marker before submitting. The goal is zero matches.

## Task 2: My Projects (five cards)

Each card shows a title, description, technology tags and its links. Cards are built from the `projects` list in `data.js`.

| # | Project | Technologies shown | Links |
|---|---|---|---|
| 1 | Python Programs Collection | Python, Loops, Classes, Dictionaries, Markdown | Folder `projects/python-programs-collection/` (card link needs the GitHub username and repo name in `data.js`) |
| 2 | Messy Python Code Improvement | Python, Cursor AI, Refactoring | Folder `projects/messy-python-code-improvement/` (same) |
| 3 | Bug Fixing Using Cursor AI | Python, Cursor AI, Debugging | Folder `projects/bug-fixing-using-cursor-ai/` (same) |
| 4 | Interactive Quiz Application | HTML, CSS, JavaScript, Quiz | "Play the quiz" opens `projects/interactive-quiz/index.html` on the site; folder link needs the GitHub username and repo name |
| 5 | Book Reading List Application | Bolt AI, React, TypeScript, Vercel, Book | Live app link set to the Vercel URL; GitHub folder link built from `data.js` |

The three Python projects were run on 2026-10-23 and give these results: Factorial of 5 is 120 (negative numbers are rejected), Fibonacci with 8 terms prints `0 1 1 2 3 5 8 13`, Structure-to-Dictionary prints `{'name': 'Amit', 'roll_no': 101, 'branch': 'CSE'}`, the improved script prints sum 294, average 42.0 and max 90, and the fixed bug program prints `Sum of numbers: 150`.

Before submitting, open every link and confirm it works, and confirm each description matches what that project really does. The reading-list repository's own README must also contain its deployed link.

## Task 3: Search, filter and theme (verified)

| Check | Result |
|---|---|
| Search "Python" | 3 projects (1, 2, 3) |
| Search "Quiz" | 1 project (Interactive Quiz Application) |
| Search "Book" | 1 project (Book Reading List Application) |
| Search "Debugging" | 1 project (Bug Fixing Using Cursor AI) |
| Search "Cursor" | 2 projects (Messy Python Code Improvement, Bug Fixing Using Cursor AI) |
| Search with no match | empty list and a "No projects match" message |
| Technology filter buttons | filter the same list; "All" restores it |
| Search is case-insensitive and updates as you type | yes |
| Light/dark toggle | switches the `dark-mode` class on the page, icon changes, choice is remembered |

How it works: `script.js` joins each project's title, description and technologies into one lowercase string and checks whether it contains the search text and the selected technology.

## Task 4: GitHub

| Item | Status |
|---|---|
| Repository created | Pending |
| Project folders (`projects/...`) and site files committed with clear messages | Pending |
| `README.md` with description, technologies, features, setup and live link | Written; live link Pending |
| `config.js` ignored by Git | Set in `.gitignore`; confirm with `git check-ignore config.js` |

## Task 5: Vercel

| Item | Status |
|---|---|
| Repository connected to Vercel | Pending |
| Site publicly reachable | Pending |
| `GROQ_API_KEY` environment variable added, then redeployed | Pending |
| Links, images, search, chatbot and mobile layout tested on the live URL | Pending |

## Task 6: Chatbot

| Requirement | How it is met | Status |
|---|---|---|
| Visible, usable interface | floating helper button opens a chat panel with suggested questions (`chatbot.css`, `chatbot.js`, panel in `index.html`) | Done |
| Uses the class API | Groq `https://api.groq.com/openai/v1`, model `llama-3.1-8b-instant` | Done |
| Grounded in portfolio information | system prompt is built from `data.js`: profile, education, skills, journey and all five projects | Done once the FILL markers in `data.js` are replaced, because they are included in the prompt |
| Replies under 60 words | stated in the prompt and limited by `max_tokens` | Done; the token limit is a guard, not an exact word count |
| Says when a detail is unknown | stated in the prompt | Done |
| Useful error messages | 401, 429, 404, 5xx and network errors each show a specific message | Done and tested with simulated failures |
| Works on the live Vercel site | uses `/api/chat` with the key stored in Vercel | Pending live test |
| No secret key in public files | `config.js` is gitignored; the live site reads the key from an environment variable | Done; confirm before every push |

### Deviation from the class guide

The Lecture 15 guide keeps the key in `config.js` and says not to create `api/chat.js`. A gitignored file is never uploaded to Vercel, so that method has no key on the live site, and a key placed in browser code is visible to every visitor. To meet both "works on the live Vercel deployment" and "do not expose keys in GitHub", this project adds one small serverless function, `api/chat.js`, which reads the key from the `GROQ_API_KEY` environment variable. Local testing still follows the class method (key in `config.js`).

## Security review

- `config.js` is in `.gitignore`, and its `apiKey` is empty in the repository.
- No key-like strings were found in the reviewed files.
- Do not commit `portfolio-preview.html` or any bundled copy of the site: a bundle can contain the contents of `config.js`.
- If a key was ever committed, revoke it at https://console.groq.com/keys and create a new one. Adding `.gitignore` afterwards does not remove it from Git history.

## Known limitations

- The 60-word limit is requested from the model, so a rare reply may run slightly over.
- On a phone, the chatbot's speech bubble can cover the hero buttons briefly, and the top navigation scrolls sideways.
- The chatbot needs an internet connection and a valid key; the free Groq plan can return 429 when used heavily.

## Before-submission checklist

- [ ] No FILL markers (double square brackets around the word FILL) left in `data.js` or `README.md`
- [ ] All five project links and the live links open correctly
- [ ] `git check-ignore config.js` prints `config.js`
- [ ] Commits have clear messages; `portfolio-preview.html` is not committed
- [ ] Vercel deployment is public and `GROQ_API_KEY` is set
- [ ] On the live site: search "Python", "Quiz" and "Book"; toggle the theme; ask the chatbot "Who are you?", "What projects have you completed?" and "Where is your GitHub?"; check the phone layout
- [ ] Live URL added to `README.md`

## How AI was used

Cursor AI and Claude were used to help write and debug the code, as the course allows. The implementation, including how the search, the theme toggle and the chatbot API call work, is explained in this file and in the code comments.


## Final check before deployment (2026-10-23)

Run in Chromium with a local web server, desktop 1366x800 and phone 390x844, with the chatbot's server call simulated.

| Check | Result |
|---|---|
| Intro: "Are we ready to rock??" then "Let's go" shows a welcome quote, then the site opens | Works; the quote is different on each visit |
| Light and dark themes, theme toggle | Work |
| Search "Python" / "Quiz" / "Book" / "JavaScript" / nonsense | 3 / 1 / 1 / 1 / "no match" message |
| Technology chip filter and "All" | Work |
| Quiz button and the quiz card link open the quiz in a new tab; the quiz runs the 5 teacher questions, then shows "Quiz Complete" and the score | Work |
| Reading List button and card link open the live Vercel app (https://reading-list-app-livid.vercel.app/) in a new tab | Link set. **Pending: open it from the deployed site and confirm it loads** (the test sandbox cannot reach vercel.app) |
| Chatbot panel opens and closes; reply shown; 401, 429 and 500 give clear messages | Work (simulated server). **Real Groq call still Pending until deployed with `GROQ_API_KEY`** |
| Phone layout | No sideways scrolling; chatbot button clear of the hero buttons |
| Key safety | `config.js` has an empty key; no key-like text anywhere in the folder |
| Chatbot prompt | Unfilled FILL markers are replaced by "not provided", so the bot says it does not know |
