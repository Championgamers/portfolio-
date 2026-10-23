# Arpit's Portfolio

A personal portfolio website for **Arpit Ganeshaanand**, B.Tech student at JECRC University, Jaipur. It shows my profile, my five Code With AI course projects, a project search with filters, a light/dark theme and an AI chatbot that answers questions about me and my work.

Built for the Code With AI internal assessment: *Personal Portfolio Website with API-Based Chatbot Integration*.

**Live website:** [[FILL: your Vercel URL, for example https://your-portfolio.vercel.app]]

## Technologies used

- HTML, CSS and plain JavaScript (no framework)
- Cursor AI for development and debugging
- Groq Cloud API, model `llama-3.1-8b-instant`, for the chatbot
- Git and GitHub for version control
- Vercel for hosting, plus one small serverless function (`api/chat.js`)

## Features

- **Sections:** Home, About Me, Skills, Projects, Journey, Contact Information and AI Chatbot.
- **My Projects:** five cards (title, description, technologies, GitHub link, live link where available):
  1. Python Programs Collection (Factorial, Fibonacci, Struct-to-Dictionary)
  2. Messy Python Code Improvement
  3. Bug Fixing Using Cursor AI
  4. Interactive Quiz Application
  5. Book Reading List Application
- **Open the Reading List App:** a second button in the Projects section opens the live app on Vercel (https://reading-list-app-livid.vercel.app/) in a new tab.
- **Play the quiz:** a button in the Projects section opens the Interactive Quiz page in a new tab (the quiz follows the teacher's Lecture 10 guidelines exactly).
- **Project search and filter:** type a name or technology ("Python", "Quiz", "Book") and the cards filter as you type. Technology buttons filter the same list, and the page shows "Showing X of 5 projects" or a message when nothing matches.
- **Light / dark mode:** a sun/moon button toggles the `dark-mode` class. The page starts in light mode (ivory and gold) and remembers your choice.
- **AI chatbot:** a floating helper opens a chat panel with suggested questions. Replies are under 60 words, say so when a personal detail is unknown, and show a clear message if the request fails (for example HTTP 401 or 429).
- **Design:** an opening welcome screen with a rotating quote, a cut-out photo in front of a large name, rotating taglines, a skills marquee, a "Journey" timeline that fills as you scroll, a scroll progress bar and a custom cursor (mouse only).
- **Accessibility and responsiveness:** works from phone to desktop, keyboard focus styles, a skip link, and reduced-motion settings are respected.
- **One place for content:** all text, skills, links and project data live in `data.js`. The page and the chatbot both read from it.

## Project structure

```
index.html        page structure
style.css         site styling and the light/dark themes
data.js           all personal details and project data (edit this to change content)
script.js         renders the page, search/filter, theme toggle, intro, chatbot panel
chatbot.css       chatbot styling
chatbot.js        chatbot logic (Groq API call and error handling)
config.js         local API key settings (gitignored, never pushed)
api/chat.js       Vercel function that adds the secret key on the live site
images/           profile photo and cut-out photo
projects/         the five course projects, one folder each (see below)
.gitignore        keeps config.js and other private files out of GitHub
```

## Projects in this repository

Each folder has its own README that explains the project and how to run it.

| Folder | What it is |
|---|---|
| `projects/python-programs-collection/` | Factorial, Fibonacci and Structure-to-Dictionary programs |
| `projects/messy-python-code-improvement/` | A script improved with Cursor AI (sum, average and maximum of a list) |
| `projects/bug-fixing-using-cursor-ai/` | A sum program with a logic bug, found and fixed with Cursor AI |
| `projects/interactive-quiz/` | Five-question quiz in HTML, CSS and JavaScript, built to the Lecture 10 guidelines (open from the "Play the Interactive Quiz" button on the site) |
| `projects/book-reading-list/` | Source code of the Book Reading List app (React, TypeScript, Tailwind), deployed on Vercel |

The quiz runs inside this site. The reading list runs as its own Vercel app (linked from the site); its source code is in `projects/book-reading-list/`.

## Setup instructions

1. Clone the repository and open the folder in Cursor or VS Code.
2. Open `index.html` in Chrome (or use the Live Server extension). The site works without installing anything.
3. To change content, edit `data.js` only.
4. To test the chatbot on your own computer, create a key at https://console.groq.com/keys and paste it into `apiKey` in `config.js`. This file is listed in `.gitignore`, so it is not pushed to GitHub.

## How the chatbot works

- The chatbot sends your question, plus a system prompt built from `data.js` (profile, education, skills, journey and all five projects), to the Groq chat completions API.
- The prompt tells the model to use only those facts, keep replies under 60 words and say when it does not know a personal detail.
- **Locally:** if `config.js` contains a key, the browser calls Groq directly (the method taught in class).
- **On the live site:** `config.js` is not deployed because it is gitignored, so the browser calls `/api/chat` instead. That function reads the key from the `GROQ_API_KEY` environment variable on Vercel and forwards the request. The key is never in the public files or on GitHub.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel choose **Add New > Project**, import the repository and click **Deploy**.
3. Open **Settings > Environment Variables**, add `GROQ_API_KEY` with your Groq key, then **redeploy**.
4. Open the live URL and test the links, project search, theme toggle, chatbot and mobile layout.

## Security note

Never commit an API key. `config.js` is gitignored. If a key is ever pushed by mistake, revoke it in the Groq console and create a new one, because removing the file later does not remove it from Git history.

## Author

Arpit Ganeshaanand, B.Tech, JECRC University, Jaipur. GitHub: https://github.com/Championgamers

See [AUDIT.md](AUDIT.md) for a requirement-by-requirement check of this project.
